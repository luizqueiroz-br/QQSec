import asyncio
import subprocess
import json

class NmapScanner:
    def __init__(self, ip, arguments):
        self.ip = ip
        self.arguments = arguments

    async def is_host_up(self):
        try:
            print(f"[INFO] Verificando se o host {self.ip} está ativo...")
            process = await asyncio.create_subprocess_exec(
                'sudo', 'nmap', '-sn', self.ip,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            stdout, _ = await process.communicate()
            if "Host is up" in stdout.decode():
                print("[INFO] Host está ativo.")
                return True
            else:
                print("[INFO] Host não está ativo.")
                return False
        except Exception as e:
            print(f"[ERROR] Erro ao verificar o status do host: {e}")
            return False

    async def run_scan(self):
        try:
            if not await self.is_host_up():
                return json.dumps({"error": f"Host {self.ip} não está ativo."}, indent=4)

            print(f"[INFO] Executando Nmap no IP: {self.ip} com os argumentos: {self.arguments}")
            
            sanitized_arguments = self.sanitize_arguments(self.arguments)
            
            process = await asyncio.create_subprocess_exec(
                'sudo', 'nmap', *sanitized_arguments.split(), self.ip,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            stdout, stderr = await process.communicate()
            
            if process.returncode != 0:
                print("[ERROR] Erro ao executar o Nmap.")
                raise Exception(f"Erro ao executar o Nmap: {stderr.decode()}")
            
            output_lines = stdout.decode().splitlines()
            parsed_result = self.parse_nmap_output(output_lines)
            
            print("[INFO] Resultados processados com sucesso.")
            return json.dumps(parsed_result, indent=4)
        except Exception as e:
            print(f"[ERROR] Ocorreu um erro durante a execução: {e}")
            return json.dumps({"error": str(e)}, indent=4)

    def sanitize_arguments(self, arguments):
        allowed_arguments = {'-sS', '-sV', '-O', '-Pn', '-p'}
        sanitized = []
        for arg in arguments.split():
            if arg in allowed_arguments or arg.startswith('-p'):
                sanitized.append(arg)
            else:
                print(f"[WARNING] Argumento não permitido: {arg}")
        return ' '.join(sanitized)

    def parse_nmap_output(self, output_lines):
        print("[INFO] Iniciando o parsing da saída do Nmap...")
        parsed_data = {"hosts": []}
        current_host = None

        for line in output_lines:
            line = line.strip()
            if line.startswith("Nmap scan report for"):
                if current_host:
                    parsed_data["hosts"].append(current_host)
                current_host = {"host": line.split("for")[-1].strip(), "ports": []}
            elif line.startswith("PORT"):
                continue
            elif current_host and line:
                parts = line.split()
                if len(parts) >= 3:
                    port_info = {
                        "port": parts[0],
                        "state": parts[1],
                        "service": " ".join(parts[2:])
                    }
                    current_host["ports"].append(port_info)
        
        if current_host:
            parsed_data["hosts"].append(current_host)
        
        print("[INFO] Parsing concluído.")
        return parsed_data


async def worker(queue):
    while True:
        ip, arguments = await queue.get()
        print(f"[INFO] Processando IP: {ip} com argumentos: {arguments}")
        scanner = NmapScanner(ip, arguments)
        result_json = await scanner.run_scan()
        print(f"[INFO] Resultado para {ip}:")
        print(result_json)
        queue.task_done()


async def main():
    queue = asyncio.Queue()

    # Adiciona tarefas à fila
    tasks = [
        ("196.0.42.110", "-sS -sV -O"),
        ("192.168.1.1", "-Pn -p 80,443"),
        ("10.0.0.1", "-sS -p 22")
    ]
    for task in tasks:
        await queue.put(task)

    # Cria trabalhadores
    workers = [asyncio.create_task(worker(queue)) for _ in range(3)]

    # Aguarda a conclusão de todas as tarefas
    await queue.join()

    # Cancela os trabalhadores
    for w in workers:
        w.cancel()

if __name__ == "__main__":
    asyncio.run(main())

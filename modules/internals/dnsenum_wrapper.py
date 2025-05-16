import subprocess
import os
from datetime import datetime

def run_dnsenum(domain, options=None, output_dir="/tmp/dnsenum"):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = os.path.join(output_dir, f"{domain}_{timestamp}.xml")

    # Montagem do comando base
    command = [
        "dnsenum",
        "--enum",
        "--threads", "5",
        "--timeout", "10",
        "--nocolor",
        "-o", output_file,
        domain
    ]

    # Adiciona opções adicionais se houver
    if options:
        command.extend(options)

    try:
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=300  # timeout geral de segurança
        )

        return {
            "success": result.returncode == 0,
            "stdout": result.stdout,
            "stderr": result.stderr,
            "output_file": output_file
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "error": "Execution timed out"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }



# if __name__ == "__main__":
#     domain = "exemplo.com"
#     resultado = run_dnsenum(domain, options=["--dnsserver", "8.8.8.8", "--private"])

#     if resultado["success"]:
#         print("[+] DNSENUM Finalizado com sucesso.")
#         print("[+] Output salvo em:", resultado["output_file"])
#     else:
#         print("[-] Erro:", resultado.get("error", resultado.get("stderr")))
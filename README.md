# Sistema de Autenticação e Gerenciamento Flask

Este é um sistema web desenvolvido com Flask que oferece funcionalidades de autenticação, gerenciamento de usuários e recursos de escaneamento de rede usando NMAP.

## Funcionalidades

- Sistema de autenticação completo (login/registro)
- Controle de acesso baseado em roles (admin/comum)
- Interface web responsiva com templates HTML
- Painel administrativo para gerenciamento de usuários
- Funcionalidades de escaneamento NMAP
  - Realização de novos scans
  - Visualização detalhada de resultados
  - Histórico de scans recentes
- Validação de dados do usuário
- Banco de dados SQLite para armazenamento
- Proteção de senhas com hash
- Gerenciamento de sessões de usuário

## Requisitos

```
flask
flask_sqlalchemy
flask_login
werkzeug
flask-wtf
python-dotenv
python-nmap
```

## Instalação

1. Clone o repositório
2. Crie um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Configure o arquivo .env:
```
SECRET_KEY=sua-chave-secreta-aqui
```

5. Inicialize o banco de dados:
```bash
python app.py
```

> **Nota**: Ao inicializar o banco de dados, um usuário admin será automaticamente criado com as seguintes credenciais:
> - Username: admin
> - Email: admin@admin.com
> - Password: admin
> 
> Recomenda-se alterar a senha do admin após o primeiro login.

## Uso

1. Inicie o servidor:
```bash
python app.py
```

2. Acesse http://localhost:5000/register para criar uma nova conta
3. Faça login em http://localhost:5000/login
4. Acesse o dashboard em http://localhost:5000/dashboard

## Estrutura do Projeto

```
├── app.py              # Arquivo principal da aplicação
├── auth.py            # Rotas de autenticação
├── database.py        # Configuração do banco de dados
├── extensions.py      # Extensões Flask
├── models.py          # Modelos do banco de dados
├── views.py           # Rotas da aplicação
├── admin/            # Módulo administrativo
│   └── views.py      # Rotas administrativas
├── nmap/             # Módulo de escaneamento
├── requirements.txt   # Dependências do projeto
├── static/           # Arquivos estáticos
├── templates/        # Templates HTML
│   ├── admin/       # Templates administrativos
│   │   ├── main.html
│   │   ├── registro.html
│   │   └── usuarios.html
│   ├── includes/    # Componentes reutilizáveis
│   │   ├── header.html
│   │   └── sidebar.html
│   ├── partials/    # Componentes parciais
│   │   ├── dashboard_main.html
│   │   └── nmap/    # Templates NMAP
│   │       ├── detalhe_scan.html
│   │       ├── new_scan.html
│   │       └── recente_scans.html
│   ├── base.html
│   ├── login.html
│   ├── dashboard.html
│   ├── erro.html
│   └── acesso_negado.html
└── instance/         # Banco de dados SQLite
    └── db_local.db
```

## Rotas Principais

- `/login` - Página de login
- `/register` - Página de registro
- `/dashboard` - Página principal (requer autenticação)
- `/admin` - Área administrativa (requer role admin)
  - `/admin/usuarios` - Gerenciamento de usuários
  - `/admin/registro` - Registro de novos usuários pelo admin
- `/nmap` - Funcionalidades de scan
  - `/nmap/new` - Novo escaneamento
  - `/nmap/detalhe/<id>` - Detalhes do scan
  - `/nmap/recentes` - Histórico de scans
- `/logout` - Rota para sair do sistema

## Segurança

- Senhas são armazenadas com hash usando Werkzeug
- Proteção contra ataques de força bruta
- Validação de dados do usuário
- Controle de acesso baseado em roles
- Sessões seguras com Flask-Login
- Validação de permissões para operações NMAP

## Desenvolvimento

O projeto usa SQLite como banco de dados para desenvolvimento. Para ambiente de produção, recomenda-se migrar para um banco de dados mais robusto como PostgreSQL.

## Requisitos do Sistema

- Python 3.8+
- NMAP instalado no sistema
- Permissões adequadas para execução de scans NMAP


## MVP da versão 1.0
- Gerenciamento de usuário, cadastro e sessão.
- Scan do nmap usando interface, (novo scan, listar scans, detalhe de um scan)

# Sistema de Autenticação Flask

Este é um sistema de autenticação web desenvolvido com Flask, oferecendo funcionalidades de registro de usuários, login e controle de acesso baseado em roles.

## Funcionalidades

- Sistema de autenticação completo (login/registro)
- Controle de acesso baseado em roles (admin/comum)
- Interface web com templates HTML
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
├── requirements.txt   # Dependências do projeto
├── templates/         # Templates HTML
│   ├── login.html
│   ├── registro.html
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
- `/logout` - Rota para sair do sistema

## Segurança

- Senhas são armazenadas com hash usando Werkzeug
- Proteção contra ataques de força bruta
- Validação de dados do usuário
- Controle de acesso baseado em roles
- Sessões seguras com Flask-Login

## Desenvolvimento

O projeto usa SQLite como banco de dados para desenvolvimento. Para ambiente de produção, recomenda-se migrar para um banco de dados mais robusto como PostgreSQL.

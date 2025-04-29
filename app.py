from flask import Flask
import os
from dotenv import load_dotenv
from flask_cors import CORS
from database import db
from models import User
from extensions import login_manager

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'chave-desenvolvimento-temporaria')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db_local.db'

# Enable CORS
CORS(app, origins=['http://localhost:5173'], supports_credentials=True)
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False
# Inicializa as extensões
db.init_app(app)
login_manager.init_app(app)

from auth import auth_bp
from views import views_bp
from admin.views import views_admin_bp

app.register_blueprint(auth_bp)
app.register_blueprint(views_bp)
app.register_blueprint(views_admin_bp)


def create_tables():
    with app.app_context():
        db.create_all()
        User.create_admin_user()
        

if __name__ == '__main__':
    create_tables()
    app.run(host='localhost', debug=True, port=5000)

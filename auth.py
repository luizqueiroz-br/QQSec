from flask import Blueprint, render_template, request, redirect, url_for, flash,jsonify, session
from flask_login import login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash
from models import User
from database import db
from extensions import login_manager
from flask_login import login_required, current_user



auth_bp = Blueprint('auth', __name__)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    """
    Esta função lida com o login do usuário. Se o usuário já estiver autenticado, ele será redirecionado para o dashboard(frontend).
    Caso contrário, ele pode fazer login com seu nome de usuário e senha. Se o login for bem-sucedido,
    o usuário será redirecionado para o dashboard. Caso contrário, uma mensagem de erro será exibida.
    """
    data = request.form
    username = data.get('username')
    password = data.get('password')
    if current_user.is_authenticated:
        user = User.query.filter_by(username=username).first()
        return jsonify({'message': 'Login ok'}), 200
    if request.method == 'POST':
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            if not user.is_active:
                
                return jsonify({'message': 'hnn, perai vi aqui que seu user esta inativo em ...'}), 401
            else:
                login_user(user)
                print('Login realizado com sucesso new!')
                return jsonify({'message': 'Login ok'}), 200
        return jsonify({'message': 'hnn me parece que algo não esta correto revisa suas informações...'}), 401
    return jsonify({'message': 'você precisa se logar novamente ein ....'}), 401


@auth_bp.route('/verify-login')
def verify_login():
    if current_user.is_authenticated:
        return jsonify({'logged_in': True}), 200
    return jsonify({'logged_in': False}), 401




@auth_bp.route('/logout',methods=['GET', 'POST'])
def logout():
    logout_user()
    session.clear()
    return jsonify({'message': 'logout sucess'}), 200

@auth_bp.route('/api/user/register', methods=['POST'])
@login_required
def register():
    if current_user.role != 'admin':
        return jsonify({'message': 'Acesso negado'}), 403

    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    role = data.get('role', 'comum')

    # Validação de senha
    if password != confirm_password:
        return jsonify({'message': 'As senhas não coincidem!'}), 400

    if len(password) < 6:
        return jsonify({'message': 'A senha deve ter pelo menos 6 caracteres!'}), 400

    user_existente = User.query.filter_by(username=username).first()
    email_existente = User.query.filter_by(email=email).first()
    if email_existente:
        return jsonify({'message': 'Email já cadastrado!'}), 400
    if user_existente:
        return jsonify({'message': 'Usuário já existe!'}), 400

    novo_user = User(
        username=username,
        email=email,
        password=generate_password_hash(password),
        by=current_user.username,
        role=role
    )
    db.session.add(novo_user)
    db.session.commit()
    return jsonify({'message': 'Usuário registrado com sucesso!'}), 201

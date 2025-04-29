from flask import Blueprint, render_template, request, redirect, url_for, flash,jsonify
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
        login_user(user)
        print('Login realizado com sucesso!')
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




@auth_bp.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth_bp.route('/register', methods=['GET', 'POST'])
@login_required
def register():
    if current_user.role != 'admin':
        return render_template('acesso_negado.html')
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        role = request.form.get('role', 'comum')

        # Validação de senha
        if password != confirm_password:
            flash('As senhas não coincidem!')
            return redirect(url_for('auth.register'))
        
        if len(password) < 6:
            flash('A senha deve ter pelo menos 6 caracteres!')
            return redirect(url_for('auth.register'))

        user_existente = User.query.filter_by(username=username).first()
        email_existente = User.query.filter_by(email=email).first()
        if email_existente:
            flash('Email já cadastrado!')
            return redirect(url_for('auth.register'))
        if user_existente:
            flash('Usuário já existe!')
            return redirect(url_for('auth.register'))

        novo_user = User(
            username=username,
            email=email,
            password=generate_password_hash(password),
            by=current_user.username,
            role=role
        )
        db.session.add(novo_user)
        db.session.commit()
        flash('Usuário registrado com sucesso! Faça login.')
        return redirect(url_for('auth.login'))

    return render_template('admin/registro.html')

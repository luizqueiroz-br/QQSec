from flask import Blueprint, render_template, abort, request, flash, redirect, url_for, jsonify
from flask_login import login_required, current_user
from time import sleep
from models import User
views_admin_bp = Blueprint('views_admin', __name__)


@views_admin_bp.route('/admin')
@login_required
def admin_area():
    print(request.headers)
    print(current_user.role)
    if current_user.role != 'admin':
        return render_template('acesso_negado.html')
    if request.headers.get('HX-Request'):
        return render_template('admin/main.html')
    return render_template('erro.html')

@views_admin_bp.route('/admin/api/users')
@login_required
def users():
    if current_user.role != 'admin':
        return {"error": "Acesso negado"}, 403
    users = User.get_all_users()
    
    return jsonify(users), 200

@views_admin_bp.route('/users/<int:user_id>/toggle')
@login_required
def toggle_user_status(user_id):
    if current_user.role != 'admin':
        return render_template('acesso_negado.html')
    user = User.toggle_active_status(user_id)
    if user:
        flash('Status do usuário foi alterado!')
        return redirect(url_for('views_admin.users'))
    return abort(404)


# criar update de senha

@views_admin_bp.route('/settings')
@login_required
def settings():
    if current_user.role != 'admin':
        return render_template('acesso_negado.html')
    if request.headers.get('HX-Request'):
        return render_template('partials/settings.html')
    return render_template('dashboard.html')
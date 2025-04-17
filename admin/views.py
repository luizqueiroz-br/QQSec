from flask import Blueprint, render_template, abort, request
from flask_login import login_required, current_user
from time import sleep
views_admin_bp = Blueprint('views_admin', __name__)


@views_admin_bp.route('/admin')
@login_required
def admin_area():
    print(request.headers)
    if current_user.role != 'admin':
        return render_template('acesso_negado.html')
    if request.headers.get('HX-Request'):
        return render_template('admin/registro.html')
    return render_template('erro.html')

@views_admin_bp.route('/users')
@login_required
def users():
    if current_user.role != 'admin':
        return render_template('acesso_negado.html')
    if request.headers.get('HX-Request'):
        return render_template('admin/usuarios.html')
    return render_template('dashboard.html')

@views_admin_bp.route('/settings')
@login_required
def settings():
    if current_user.role != 'admin':
        return render_template('acesso_negado.html')
    if request.headers.get('HX-Request'):
        return render_template('partials/settings.html')
    return render_template('dashboard.html')
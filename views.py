from flask import Blueprint, render_template, abort
from flask_login import login_required, current_user

views_bp = Blueprint('views', __name__)

@views_bp.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', user=current_user)

@views_bp.route('/admin')
@login_required
def admin_area():
    if current_user.role != 'admin':
        return render_template('acesso_negado.html')
    return 'Área administrativa'

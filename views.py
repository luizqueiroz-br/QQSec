from flask import Blueprint, render_template, abort, request
from flask_login import login_required, current_user
from time import sleep
views_bp = Blueprint('views', __name__)


@views_bp.route('/')
def index():
    return render_template('login.html')

@views_bp.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@views_bp.route('/dashboard/main')
@login_required
def dashboard_main():
    if request.headers.get('HX-Request'):
        return render_template('partials/dashboard_main.html')
    return render_template('dashboard.html')

@views_bp.route('/nmap')
@login_required
def nmap_all():
    if request.headers.get('HX-Request'):
        return render_template('partials/nmap/recente_scans.html')
    return render_template('dashboard.html')

@views_bp.route('/nmap/new')
@login_required
def nmap_new():
    return render_template('partials/nmap/new_scan.html')

@views_bp.route('/customers')
@login_required
def customers():
    if request.headers.get('HX-Request'):
        return render_template('partials/customers.html')
    return render_template('dashboard.html')

@views_bp.route('/reports')
@login_required
def reports():
    if request.headers.get('HX-Request'):
        return render_template('partials/reports.html')
    return render_template('dashboard.html')

@views_bp.route('/profile')
@login_required
def profile():
    if request.headers.get('HX-Request'):
        return render_template('partials/profile.html')
    return render_template('dashboard.html')

@views_bp.route('/admin')
@login_required
def admin_area():
    print(request.headers)
    if current_user.role != 'admin':
        return render_template('acesso_negado.html')
    if request.headers.get('HX-Request'):
        return render_template('registro.html')
    return render_template('erro.html')

@views_bp.route('/users')
@login_required
def users():
    if current_user.role != 'admin':
        return render_template('acesso_negado.html')
    if request.headers.get('HX-Request'):
        return render_template('admin/usuarios.html')
    return render_template('dashboard.html')

@views_bp.route('/settings')
@login_required
def settings():
    if current_user.role != 'admin':
        return render_template('acesso_negado.html')
    if request.headers.get('HX-Request'):
        return render_template('partials/settings.html')
    return render_template('dashboard.html')

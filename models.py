from database import db
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

# Define the User model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    by = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)

    @staticmethod
    def get_all_users():
        users = User.query.all()
        return [user.to_json() for user in users]

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role,
            "is_active": self.is_active,
            "by": self.by
        }
    
    @staticmethod
    def toggle_active_status(user_id):
        user = User.query.get(user_id)
        if user:
            user.is_active = not getattr(user, 'is_active', True)
            db.session.commit()
            return user.to_json()
        return None
    
    @staticmethod
    def update_password(user_id, new_password):
        user = User.query.get(user_id)
        if user:
            user.password = new_password
            db.session.commit()
            return user.to_json()
        return None

    @staticmethod
    def create_admin_user():
        if not User.query.filter_by(username='admin').first():
            admin_user = User(
                username='admin',
                email='admin@admin.com',
                password=generate_password_hash('admin'),
                role='admin',
                by='system'
            )
            db.session.add(admin_user)
            db.session.commit()
    

    @staticmethod
    def get_all_users():
        users = User.query.all()
        return [user.to_json() for user in users]
 

# Define the NmapScan model
class NmapScan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ip_address = db.Column(db.String(45), nullable=False)  # Supports IPv4 and IPv6
    flags = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('nmap_scans', lazy=True))

    def to_json(self):
        return {
            "id": self.id,
            "ip_address": self.ip_address,
            "flags": self.flags,
            "timestamp": self.timestamp.isoformat(),
            "user_id": self.user_id
        }

    @staticmethod
    def get_all_scans():
        scans = NmapScan.query.all()
        return [scan.to_json() for scan in scans]

    @staticmethod
    def get_scans_by_user(user_id):
        scans = NmapScan.query.filter_by(user_id=user_id).all()
        return [scan.to_json() for scan in scans]
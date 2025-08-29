from flask import Blueprint, request, jsonify
from models import User, db
from schemas import UserSchema
from extensions import bcrypt
from sqlalchemy.exc import IntegrityError
from auth import login_required, organizer_required, get_current_user, create_token

users_bp = Blueprint('users', __name__, url_prefix='/users')
user_schema = UserSchema()
users_schema = UserSchema(many=True)

@users_bp.route('/', methods=['GET'])
@login_required
def get_users():
    """Get all users"""
    users = User.query.all()
    return jsonify(users_schema.dump(users)), 200

@users_bp.route('/<int:user_id>', methods=['GET'])
@login_required
def get_user(user_id):
    """Get a specific user by ID"""
    user = User.query.get_or_404(user_id)
    return jsonify(user_schema.dump(user)), 200

@users_bp.route('/', methods=['POST'])
def create_user():
    """Register a new user"""
    try:
        data = request.get_json()
        errors = user_schema.validate(data)
        if errors:
            return jsonify({'errors': errors}), 400
        
        # Check if user already exists
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 400
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 400
        
        user = User(
            username=data['username'],
            email=data['email'],
            role=data.get('role', 'attendee')
        )
        user.password = data['password']
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify(user_schema.dump(user)), 201
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'User creation failed'}), 400

@users_bp.route('/<int:user_id>', methods=['PUT'])
@login_required
def update_user(user_id):
    """Update user profile"""
    current_user = get_current_user()
    user = User.query.get_or_404(user_id)
    
    # Users can only update their own profile, organizers can update any profile
    if current_user.id != user_id and current_user.role != 'organizer':
        return jsonify({'error': 'You can only update your own profile'}), 403
    
    data = request.get_json()
    
    try:
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'role' in data and current_user.role == 'organizer':
            user.role = data['role']
        if 'password' in data:
            user.password = data['password']
        
        db.session.commit()
        return jsonify(user_schema.dump(user)), 200
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Update failed'}), 400

@users_bp.route('/<int:user_id>', methods=['DELETE'])
@organizer_required
def delete_user(user_id):
    """Delete a user"""
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200

@users_bp.route('/login', methods=['POST'])
def login():
    """User login"""
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Username and password required'}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if user and user.check_password(data['password']):
        token = create_token(user)
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': user_schema.dump(user)
        }), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@users_bp.route('/me', methods=['GET'])
@login_required
def get_current_user_profile():
    """Get current user's profile"""
    user = get_current_user()
    return jsonify(user_schema.dump(user)), 200

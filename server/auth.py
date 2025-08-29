from functools import wraps
from flask import jsonify, request
from models import User
import jwt
import datetime
import os

def get_token_from_header():
    """Extract token from Authorization header"""
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None
    
    try:
        # Expect format: "Bearer <token>"
        token = auth_header.split(' ')[1]
        return token
    except (IndexError, AttributeError):
        return None

def decode_token(token):
    """Decode and validate JWT token"""
    try:
        secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key')
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def login_required(f):
    """Decorator to require user authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = get_token_from_header()
        if not token:
            return jsonify({'error': 'Authentication required'}), 401
        
        payload = decode_token(token)
        if not payload:
            return jsonify({'error': 'Invalid or expired token'}), 401
        
        # Add user info to request context
        request.current_user_id = payload.get('user_id')
        return f(*args, **kwargs)
    return decorated_function

def organizer_required(f):
    """Decorator to require organizer role"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = get_token_from_header()
        if not token:
            return jsonify({'error': 'Authentication required'}), 401
        
        payload = decode_token(token)
        if not payload:
            return jsonify({'error': 'Invalid or expired token'}), 401
        
        user = User.query.get(payload.get('user_id'))
        if not user or user.role != 'organizer':
            return jsonify({'error': 'Organizer access required'}), 403
        
        # Add user info to request context
        request.current_user_id = payload.get('user_id')
        return f(*args, **kwargs)
    return decorated_function

def get_current_user():
    """Get the currently logged in user"""
    token = get_token_from_header()
    if not token:
        return None
    
    payload = decode_token(token)
    if not payload:
        return None
    
    return User.query.get(payload.get('user_id'))

def create_token(user):
    """Create JWT token for user"""
    secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key')
    payload = {
        'user_id': user.id,
        'username': user.username,
        'role': user.role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24),  # 24 hour expiry
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, secret_key, algorithm='HS256')
    return token

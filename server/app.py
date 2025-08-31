# server/app.py

from flask import Flask
from extensions import db, migrate, bcrypt
from routes.users import users_bp
from routes.events import events_bp
from routes.vendors import vendors_bp
import os

def create_app():
    """Application factory function"""
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    
    # Register blueprints
    app.register_blueprint(users_bp)
    app.register_blueprint(events_bp)
    app.register_blueprint(vendors_bp)
    
    # Root route
    @app.route('/')
    def home():
        return {
            'message': 'Event Planning API',
            'endpoints': {
                'users': '/users',
                'events': '/events',
                'vendors': '/vendors'
            }
        }
    
    return app

# Create the app instance
app = create_app()

if __name__ == '__main__':
    with app.app_context():
        # Create all tables
        db.create_all()
    app.run(port=5000, debug=True)

from extensions import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import func
from datetime import datetime

# Association Tables
event_attendees = db.Table('event_attendees',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), nullable=False),
    db.Column('rsvp_status', db.String(20), default='pending'),  # pending, confirmed, cancelled
    db.Column('created_at', db.DateTime, default=func.now())
)

event_vendors = db.Table('event_vendors',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('vendor_id', db.Integer, db.ForeignKey('vendors.id'), nullable=False),
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), nullable=False),
    db.Column('contract_details', db.Text),
    db.Column('created_at', db.DateTime, default=func.now())
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='attendee')  # organizer, attendee
    created_at = db.Column(db.DateTime, default=func.now())
    
    # Relationships
    organized_events = db.relationship('Event', backref='organizer', lazy=True)
    attended_events = db.relationship('Event', secondary=event_attendees, backref=db.backref('attendees', lazy='dynamic'))
    
    serialize_rules = ('-password_hash', '-organized_events.attendees', '-attended_events.attendees')
    
    @hybrid_property
    def password(self):
        raise AttributeError('password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f'<User {self.username}>'

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String(200), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    ticket_price = db.Column(db.Float, default=0.0)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    
    # Relationships
    vendors = db.relationship('Vendor', secondary=event_vendors, backref=db.backref('events', lazy='dynamic'))
    
    serialize_rules = ('-organizer.password_hash', '-attendees.password_hash', '-vendors.events')
    
    def __repr__(self):
        return f'<Event {self.name}>'

class Vendor(db.Model, SerializerMixin):
    __tablename__ = 'vendors'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    service_type = db.Column(db.String(50), nullable=False)  # caterer, dj, photographer, etc.
    contact_info = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    
    serialize_rules = ('-events.attendees', '-events.organizer.password_hash')
    
    def __repr__(self):
        return f'<Vendor {self.name} - {self.service_type}>'

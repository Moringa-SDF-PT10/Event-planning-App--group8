from flask import Blueprint, request, jsonify
from models import Event, User, Vendor, db, event_attendees, event_vendors
from schemas import EventSchema, EventAttendeeSchema
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from auth import login_required, organizer_required, get_current_user

events_bp = Blueprint('events', __name__, url_prefix='/events')
event_schema = EventSchema()
events_schema = EventSchema(many=True)
attendee_schema = EventAttendeeSchema()

@events_bp.route('/', methods=['GET'])
def get_events():
    """Get all events"""
    events = Event.query.all()
    return jsonify(events_schema.dump(events)), 200

@events_bp.route('/<int:event_id>', methods=['GET'])
def get_event(event_id):
    """Get a specific event by ID"""
    event = Event.query.get_or_404(event_id)
    return jsonify(event_schema.dump(event)), 200

@events_bp.route('/', methods=['POST'])
@organizer_required
def create_event():
    """Create a new event"""
    try:
        data = request.get_json()
        errors = event_schema.validate(data)
        if errors:
            return jsonify({'errors': errors}), 400
        
        # Convert datetime string to datetime object
        if 'datetime' in data and isinstance(data['datetime'], str):
            data['datetime'] = datetime.fromisoformat(data['datetime'].replace('Z', '+00:00'))
        
        # Use current user as organizer
        current_user = get_current_user()
        
        event = Event(
            name=data['name'],
            description=data.get('description', ''),
            location=data['location'],
            datetime=data['datetime'],
            capacity=data['capacity'],
            ticket_price=data.get('ticket_price', 0.0),
            organizer_id=current_user.id
        )
        
        db.session.add(event)
        db.session.commit()
        
        return jsonify(event_schema.dump(event)), 201
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Event creation failed'}), 400

@events_bp.route('/<int:event_id>', methods=['PUT'])
@login_required
def update_event(event_id):
    """Update an event"""
    event = Event.query.get_or_404(event_id)
    current_user = get_current_user()
    
    # Only the organizer can update their own events
    if event.organizer_id != current_user.id:
        return jsonify({'error': 'You can only update events you organized'}), 403
    
    data = request.get_json()
    
    try:
        if 'name' in data:
            event.name = data['name']
        if 'description' in data:
            event.description = data['description']
        if 'location' in data:
            event.location = data['location']
        if 'datetime' in data:
            if isinstance(data['datetime'], str):
                event.datetime = datetime.fromisoformat(data['datetime'].replace('Z', '+00:00'))
            else:
                event.datetime = data['datetime']
        if 'capacity' in data:
            event.capacity = data['capacity']
        if 'ticket_price' in data:
            event.ticket_price = data['ticket_price']
        
        db.session.commit()
        return jsonify(event_schema.dump(event)), 200
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Update failed'}), 400

@events_bp.route('/<int:event_id>', methods=['DELETE'])
@login_required
def delete_event(event_id):
    """Delete an event"""
    event = Event.query.get_or_404(event_id)
    current_user = get_current_user()
    
    # Only the organizer can delete their own events
    if event.organizer_id != current_user.id:
        return jsonify({'error': 'You can only delete events you organized'}), 403
    
    db.session.delete(event)
    db.session.commit()
    return jsonify({'message': 'Event deleted successfully'}), 200

@events_bp.route('/<int:event_id>/attendees', methods=['GET'])
def get_event_attendees(event_id):
    """Get all attendees for an event"""
    event = Event.query.get_or_404(event_id)
    attendees = event.attendees.all()
    return jsonify([{'id': user.id, 'username': user.username, 'email': user.email} for user in attendees]), 200

@events_bp.route('/<int:event_id>/attendees', methods=['POST'])
@login_required
def add_attendee(event_id):
    """Add an attendee to an event"""
    event = Event.query.get_or_404(event_id)
    current_user = get_current_user()
    data = request.get_json()
    
    try:
        # Users can add themselves, organizers can add any user
        user_id = data.get('user_id', current_user.id)
        rsvp_status = data.get('rsvp_status', 'pending')
        
        # Check if user is trying to add someone else (only organizers can do this)
        if user_id != current_user.id and current_user.role != 'organizer':
            return jsonify({'error': 'You can only add yourself to events'}), 403
        
        user = User.query.get_or_404(user_id)
        
        # Check if user is already attending
        if user in event.attendees:
            return jsonify({'error': 'User is already attending this event'}), 400
        
        # Check capacity
        if event.attendees.count() >= event.capacity:
            return jsonify({'error': 'Event is at full capacity'}), 400
        
        event.attendees.append(user)
        
        # Update RSVP status in association table
        stmt = event_attendees.update().where(
            event_attendees.c.user_id == user_id,
            event_attendees.c.event_id == event_id
        ).values(rsvp_status=rsvp_status)
        db.session.execute(stmt)
        
        db.session.commit()
        return jsonify({'message': 'Attendee added successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@events_bp.route('/<int:event_id>/attendees/<int:user_id>', methods=['DELETE'])
@login_required
def remove_attendee(event_id, user_id):
    """Remove an attendee from an event"""
    event = Event.query.get_or_404(event_id)
    current_user = get_current_user()
    user = User.query.get_or_404(user_id)
    
    # Users can remove themselves, organizers can remove any user
    if user_id != current_user.id and current_user.role != 'organizer':
        return jsonify({'error': 'You can only remove yourself from events'}), 403
    
    if user not in event.attendees:
        return jsonify({'error': 'User is not attending this event'}), 400
    
    event.attendees.remove(user)
    db.session.commit()
    return jsonify({'message': 'Attendee removed successfully'}), 200

@events_bp.route('/<int:event_id>/vendors', methods=['GET'])
def get_event_vendors(event_id):
    """Get all vendors for an event"""
    event = Event.query.get_or_404(event_id)
    vendors = event.vendors
    return jsonify([{'id': vendor.id, 'name': vendor.name, 'service_type': vendor.service_type} for vendor in vendors]), 200

@events_bp.route('/<int:event_id>/vendors', methods=['POST'])
@organizer_required
def add_vendor_to_event(event_id):
    """Add a vendor to an event"""
    event = Event.query.get_or_404(event_id)
    current_user = get_current_user()
    data = request.get_json()
    
    # Only the organizer can add vendors to their events
    if event.organizer_id != current_user.id:
        return jsonify({'error': 'You can only add vendors to events you organized'}), 403
    
    try:
        vendor_id = data.get('vendor_id')
        contract_details = data.get('contract_details', '')
        
        if not vendor_id:
            return jsonify({'error': 'vendor_id is required'}), 400
        
        vendor = Vendor.query.get_or_404(vendor_id)
        
        # Check if vendor is already assigned
        if vendor in event.vendors:
            return jsonify({'error': 'Vendor is already assigned to this event'}), 400
        
        event.vendors.append(vendor)
        
        # Update contract details in association table
        stmt = event_vendors.update().where(
            event_vendors.c.vendor_id == vendor_id,
            event_vendors.c.event_id == event_id
        ).values(contract_details=contract_details)
        db.session.execute(stmt)
        
        db.session.commit()
        return jsonify({'message': 'Vendor added successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

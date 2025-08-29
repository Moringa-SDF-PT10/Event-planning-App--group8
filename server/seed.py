from app import create_app
from extensions import db
from models import User, Event, Vendor
from datetime import datetime, timedelta

def seed_database():
    """Seed the database with sample data"""
    app = create_app()
    
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Create sample users
        users = [
            User(
                username='john_organizer',
                email='john@example.com',
                role='organizer'
            ),
            User(
                username='sarah_attendee',
                email='sarah@example.com',
                role='attendee'
            ),
            User(
                username='mike_organizer',
                email='mike@example.com',
                role='organizer'
            ),
            User(
                username='lisa_attendee',
                email='lisa@example.com',
                role='attendee'
            )
        ]
        
        # Set passwords
        users[0].password = 'password123'
        users[1].password = 'password123'
        users[2].password = 'password123'
        users[3].password = 'password123'
        
        for user in users:
            db.session.add(user)
        
        # Create sample vendors
        vendors = [
            Vendor(
                name='Elite Catering Co.',
                service_type='caterer',
                contact_info='Phone: (555) 123-4567, Email: info@elitecatering.com'
            ),
            Vendor(
                name='DJ Master Pro',
                service_type='dj',
                contact_info='Phone: (555) 234-5678, Email: bookings@djmasterpro.com'
            ),
            Vendor(
                name='Perfect Pictures Photography',
                service_type='photographer',
                contact_info='Phone: (555) 345-6789, Email: hello@perfectpictures.com'
            ),
            Vendor(
                name='Dream Venues',
                service_type='venue',
                contact_info='Phone: (555) 456-7890, Email: info@dreamvenues.com'
            )
        ]
        
        for vendor in vendors:
            db.session.add(vendor)
        
        db.session.commit()
        
        # Create sample events
        events = [
            Event(
                name='Tech Conference 2024',
                description='Annual technology conference featuring the latest innovations',
                location='Convention Center, Downtown',
                datetime=datetime.now() + timedelta(days=30),
                capacity=200,
                ticket_price=150.0,
                organizer_id=users[0].id
            ),
            Event(
                name='Summer Music Festival',
                description='Outdoor music festival with local and national artists',
                location='Central Park',
                datetime=datetime.now() + timedelta(days=60),
                capacity=500,
                ticket_price=75.0,
                organizer_id=users[2].id
            ),
            Event(
                name='Business Networking Mixer',
                description='Professional networking event for entrepreneurs',
                location='Grand Hotel Ballroom',
                datetime=datetime.now() + timedelta(days=15),
                capacity=100,
                ticket_price=25.0,
                organizer_id=users[0].id
            )
        ]
        
        for event in events:
            db.session.add(event)
        
        db.session.commit()
        
        # Add attendees to events
        events[0].attendees.append(users[1])  # Sarah attends Tech Conference
        events[0].attendees.append(users[3])  # Lisa attends Tech Conference
        events[1].attendees.append(users[1])  # Sarah attends Music Festival
        events[2].attendees.append(users[3])  # Lisa attends Networking Mixer
        
        # Add vendors to events
        events[0].vendors.append(vendors[0])  # Caterer for Tech Conference
        events[0].vendors.append(vendors[2])  # Photographer for Tech Conference
        events[1].vendors.append(vendors[1])  # DJ for Music Festival
        events[1].vendors.append(vendors[2])  # Photographer for Music Festival
        events[2].vendors.append(vendors[0])  # Caterer for Networking Mixer
        
        db.session.commit()
        
        print("Database seeded successfully!")
        print(f"Created {len(users)} users, {len(vendors)} vendors, and {len(events)} events")

if __name__ == '__main__':
    seed_database()

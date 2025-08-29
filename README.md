# Event-planning-App--group8
plan events


### Backend 
# Event Planning App

A Flask-based REST API for event planning and management. Users can create events, register as attendees, and connect with vendors like caterers, DJs, and photographers.

## Features

- **User Management**: Register, login, and manage user profiles
- **Event Management**: Create, read, update, and delete events
- **Vendor Management**: Manage vendors and their services
- **Attendee Management**: RSVP to events and manage attendee lists
- **Vendor Assignment**: Assign vendors to events with contract details

## Tech Stack

- **Flask**: Web framework
- **Flask-SQLAlchemy**: ORM for database operations
- **Flask-Migrate**: Database migrations
- **Flask-Bcrypt**: Password hashing
- **Marshmallow**: Serialization and validation
- **SQLAlchemy-Serializer**: Model serialization
- **SQLite**: Database (development)

## Setup Instructions

1. **Install dependencies**:
   ```bash
   pipenv install
   ```

2. **Activate virtual environment**:
   ```bash
   pipenv shell
   ```

3. **Run the application**:
   ```bash
   cd server
   python app.py
   ```

4. **Seed the database** (optional):
   ```bash
   python seed.py
   ```

The API will be available at `http://localhost:5555`

## Database Models

### User
- `id`: Primary key
- `username`: Unique username
- `email`: Unique email address
- `password_hash`: Hashed password
- `role`: 'organizer' or 'attendee'
- `created_at`: Timestamp

### Event
- `id`: Primary key
- `name`: Event name
- `description`: Event description
- `location`: Event location
- `datetime`: Event date and time
- `capacity`: Maximum attendees
- `ticket_price`: Ticket price
- `organizer_id`: Foreign key to User
- `created_at`: Timestamp

### Vendor
- `id`: Primary key
- `name`: Vendor name
- `service_type`: Type of service (caterer, dj, photographer, etc.)
- `contact_info`: Contact information
- `created_at`: Timestamp

### Association Tables
- `event_attendees`: Links users to events with RSVP status
- `event_vendors`: Links vendors to events with contract details

## Authentication

The API uses JWT (JSON Web Token) authentication. Users must log in to access protected endpoints.

### Authentication Flow:
1. **Register** a new user or use existing credentials
2. **Login** with username and password to receive a JWT token
3. **Include token in Authorization header** for subsequent requests: `Authorization: Bearer <token>`
4. **Token expires after 24 hours** - re-login to get a new token

### User Roles:
- **attendee**: Can view events, RSVP to events, update own profile
- **organizer**: Can do everything attendees can, plus create/manage events and vendors

### Protected Endpoints:
- Most endpoints require authentication (`@login_required`)
- Event creation, vendor management require organizer role (`@organizer_required`)
- Users can only modify their own data (except organizers who have broader access)

### Example Usage:
```bash
# Login to get token
curl -X POST http://localhost:5555/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john_organizer", "password": "password123"}'

# Use token for authenticated requests
curl -X GET http://localhost:5555/users/me \
  -H "Authorization: Bearer <your_token_here>"
```

## API Endpoints

### Users

#### GET /users
Get all users
```json
[
  {
    "id": 1,
    "username": "john_organizer",
    "email": "john@example.com",
    "role": "organizer",
    "created_at": "2024-01-01T00:00:00"
  }
]
```

#### GET /users/{id}
Get a specific user

#### POST /users
Register a new user
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "role": "attendee"
}
```

#### PUT /users/{id}
Update user profile

#### DELETE /users/{id}
Delete a user

#### POST /users/login
User login
```json
{
  "username": "john_organizer",
  "password": "password123"
}
```

#### GET /users/me
Get current user's profile (requires authentication)

### Events

#### GET /events
Get all events
```json
[
  {
    "id": 1,
    "name": "Tech Conference 2024",
    "description": "Annual technology conference",
    "location": "Convention Center",
    "datetime": "2024-02-01T10:00:00",
    "capacity": 200,
    "ticket_price": 150.0,
    "organizer_id": 1,
    "created_at": "2024-01-01T00:00:00"
  }
]
```

#### GET /events/{id}
Get a specific event

#### POST /events
Create a new event (requires organizer role)
```json
{
  "name": "New Event",
  "description": "Event description",
  "location": "Event Location",
  "datetime": "2024-03-01T14:00:00",
  "capacity": 100,
  "ticket_price": 50.0
}
```

#### PUT /events/{id}
Update an event (requires authentication, only organizer can update their own events)

#### DELETE /events/{id}
Delete an event (requires authentication, only organizer can delete their own events)

#### GET /events/{id}/attendees
Get all attendees for an event

#### POST /events/{id}/attendees
Add an attendee to an event (requires authentication)
```json
{
  "user_id": 2,
  "rsvp_status": "confirmed"
}
```

#### DELETE /events/{id}/attendees/{user_id}
Remove an attendee from an event (requires authentication)

#### GET /events/{id}/vendors
Get all vendors for an event

#### POST /events/{id}/vendors
Add a vendor to an event (requires organizer role, only for events you organized)
```json
{
  "vendor_id": 1,
  "contract_details": "Catering contract details"
}
```

### Vendors

#### GET /vendors
Get all vendors
```json
[
  {
    "id": 1,
    "name": "Elite Catering Co.",
    "service_type": "caterer",
    "contact_info": "Phone: (555) 123-4567",
    "created_at": "2024-01-01T00:00:00"
  }
]
```

#### GET /vendors/{id}
Get a specific vendor

#### POST /vendors
Create a new vendor (requires organizer role)
```json
{
  "name": "New Vendor",
  "service_type": "dj",
  "contact_info": "Phone: (555) 999-8888"
}
```

#### PUT /vendors/{id}
Update a vendor (requires organizer role)

#### DELETE /vendors/{id}
Delete a vendor (requires organizer role)

#### GET /vendors/service/{service_type}
Get vendors by service type

## Sample Data

The seed file creates:
- 4 users (2 organizers, 2 attendees)
- 4 vendors (caterer, dj, photographer, venue)
- 3 events with attendees and vendors

## Testing

Run tests with:
```bash
pytest
```

## Project Structure

```
server/
├── app.py              # Application factory and entry point
├── models.py           # SQLAlchemy models
├── extensions.py       # Flask extensions
├── schemas.py          # Marshmallow schemas
├── seed.py             # Database seeding
├── routes/             # Blueprint routes
│   ├── __init__.py
│   ├── users.py        # User routes
│   ├── events.py       # Event routes
│   └── vendors.py      # Vendor routes
└── instance/           # Database files (created at runtime)
    └── app.db
```

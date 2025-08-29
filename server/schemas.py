from marshmallow import Schema, fields, validate, ValidationError
from datetime import datetime

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=3, max=80))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6), load_only=True)
    role = fields.Str(validate=validate.OneOf(['organizer', 'attendee']))
    created_at = fields.DateTime(dump_only=True)

class EventSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    description = fields.Str()
    location = fields.Str(required=True, validate=validate.Length(min=1, max=200))
    datetime = fields.DateTime(required=True)
    capacity = fields.Int(required=True, validate=validate.Range(min=1))
    ticket_price = fields.Float(validate=validate.Range(min=0))
    organizer_id = fields.Int(required=True)
    created_at = fields.DateTime(dump_only=True)

class VendorSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    service_type = fields.Str(required=True, validate=validate.Length(min=1, max=50))
    contact_info = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)

class EventAttendeeSchema(Schema):
    user_id = fields.Int(required=True)
    event_id = fields.Int(required=True)
    rsvp_status = fields.Str(validate=validate.OneOf(['pending', 'confirmed', 'cancelled']))

class EventVendorSchema(Schema):
    vendor_id = fields.Int(required=True)
    event_id = fields.Int(required=True)
    contract_details = fields.Str()

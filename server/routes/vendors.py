from flask import Blueprint, request, jsonify
from models import Vendor, db
from schemas import VendorSchema
from sqlalchemy.exc import IntegrityError
from auth import login_required, organizer_required

vendors_bp = Blueprint('vendors', __name__, url_prefix='/vendors')
vendor_schema = VendorSchema()
vendors_schema = VendorSchema(many=True)

@vendors_bp.route('/', methods=['GET'])
def get_vendors():
    """Get all vendors"""
    vendors = Vendor.query.all()
    return jsonify(vendors_schema.dump(vendors)), 200

@vendors_bp.route('/<int:vendor_id>', methods=['GET'])
def get_vendor(vendor_id):
    """Get a specific vendor by ID"""
    vendor = Vendor.query.get_or_404(vendor_id)
    return jsonify(vendor_schema.dump(vendor)), 200

@vendors_bp.route('/', methods=['POST'])
@organizer_required
def create_vendor():
    """Create a new vendor"""
    try:
        data = request.get_json()
        errors = vendor_schema.validate(data)
        if errors:
            return jsonify({'errors': errors}), 400
        
        vendor = Vendor(
            name=data['name'],
            service_type=data['service_type'],
            contact_info=data['contact_info']
        )
        
        db.session.add(vendor)
        db.session.commit()
        
        return jsonify(vendor_schema.dump(vendor)), 201
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Vendor creation failed'}), 400

@vendors_bp.route('/<int:vendor_id>', methods=['PUT'])
@organizer_required
def update_vendor(vendor_id):
    """Update a vendor"""
    vendor = Vendor.query.get_or_404(vendor_id)
    data = request.get_json()
    
    try:
        if 'name' in data:
            vendor.name = data['name']
        if 'service_type' in data:
            vendor.service_type = data['service_type']
        if 'contact_info' in data:
            vendor.contact_info = data['contact_info']
        
        db.session.commit()
        return jsonify(vendor_schema.dump(vendor)), 200
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Update failed'}), 400

@vendors_bp.route('/<int:vendor_id>', methods=['DELETE'])
@organizer_required
def delete_vendor(vendor_id):
    """Delete a vendor"""
    vendor = Vendor.query.get_or_404(vendor_id)
    db.session.delete(vendor)
    db.session.commit()
    return jsonify({'message': 'Vendor deleted successfully'}), 200

@vendors_bp.route('/service/<service_type>', methods=['GET'])
def get_vendors_by_service(service_type):
    """Get vendors by service type"""
    vendors = Vendor.query.filter_by(service_type=service_type).all()
    return jsonify(vendors_schema.dump(vendors)), 200

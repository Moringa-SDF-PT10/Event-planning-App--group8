// src/components/forms/RSVPForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './FormStyles.css';

const RSVPForm = ({ onSubmit, eventId, userId }) => {
  const formik = useFormik({
    initialValues: {
      status: 'confirmed',
      guests: 1,
      notes: ''
    },
    validationSchema: Yup.object({
      status: Yup.string()
        .oneOf(['confirmed', 'pending', 'canceled'], 'Invalid status')
        .required('Status is required'),
      guests: Yup.number()
        .min(1, 'Must have at least 1 guest')
        .max(10, 'Cannot exceed 10 guests')
        .required('Number of guests is required'),
      notes: Yup.string()
        .max(200, 'Notes must be less than 200 characters')
    }),
    onSubmit: (values) => {
      onSubmit({
        ...values,
        event_id: eventId,
        user_id: userId
      });
    }
  });

  return (
    <div className="form-container">
      <h3>RSVP to Event</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="status" className="form-label">RSVP Status</label>
          <select
            id="status"
            name="status"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
          </select>
          {formik.touched.status && formik.errors.status ? (
            <div className="form-error">{formik.errors.status}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="guests" className="form-label">Number of Guests</label>
          <input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="10"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.guests}
          />
          {formik.touched.guests && formik.errors.guests ? (
            <div className="form-error">{formik.errors.guests}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="notes" className="form-label">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.notes}
            placeholder="Any special requirements or notes..."
          />
          {formik.touched.notes && formik.errors.notes ? (
            <div className="form-error">{formik.errors.notes}</div>
          ) : null}
        </div>

        <button type="submit" className="form-button" disabled={formik.isSubmitting}>
          Submit RSVP
        </button>
      </form>
    </div>
  );
};

export default RSVPForm;
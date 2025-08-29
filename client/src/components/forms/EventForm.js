// src/components/forms/EventForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './FormStyles.css';

const EventForm = ({ onSubmit, initialValues = {}, isEdit = false }) => {
  const formik = useFormik({
    initialValues: {
      title: initialValues.title || '',
      description: initialValues.description || '',
      location: initialValues.location || '',
      date: initialValues.date || '',
      time: initialValues.time || '',
      capacity: initialValues.capacity || '',
      price: initialValues.price || '',
      ...initialValues
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Title must be at least 5 characters')
        .max(100, 'Title must be less than 100 characters')
        .required('Title is required'),
      description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must be less than 500 characters')
        .required('Description is required'),
      location: Yup.string()
        .min(5, 'Location must be at least 5 characters')
        .required('Location is required'),
      date: Yup.date()
        .min(new Date(), 'Event date must be in the future')
        .required('Date is required'),
      time: Yup.string()
        .required('Time is required'),
      capacity: Yup.number()
        .min(1, 'Capacity must be at least 1')
        .max(1000, 'Capacity cannot exceed 1000')
        .required('Capacity is required'),
      price: Yup.number()
        .min(0, 'Price cannot be negative')
        .max(10000, 'Price cannot exceed $10,000')
        .required('Price is required')
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Edit Event' : 'Create Event'}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Event Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="form-error">{formik.errors.title}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="form-error">{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="form-error">{formik.errors.location}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />
          {formik.touched.date && formik.errors.date ? (
            <div className="form-error">{formik.errors.date}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="time" className="form-label">Time</label>
          <input
            id="time"
            name="time"
            type="time"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}
          />
          {formik.touched.time && formik.errors.time ? (
            <div className="form-error">{formik.errors.time}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="capacity" className="form-label">Capacity</label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.capacity}
          />
          {formik.touched.capacity && formik.errors.capacity ? (
            <div className="form-error">{formik.errors.capacity}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">Price ($)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="form-error">{formik.errors.price}</div>
          ) : null}
        </div>

        <button type="submit" className="form-button" disabled={formik.isSubmitting}>
          {isEdit ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
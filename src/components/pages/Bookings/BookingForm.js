import React, { useState } from 'react';
import ConfirmedBooking from './ConfirmedBooking';
import './index.css';

function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    seating: '',
    date: '',
    time: '',
    guests: '',
    occasion: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    accepted: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.accepted
    ) {
      setSubmitted(true);
    } else {
      alert('Please fill all required fields.');
    }
  };

  if (submitted) return <ConfirmedBooking data={formData} />;

  return (
    <div className="bookings">
      <h2 className="form-title">Reserve a Table</h2>
      <form onSubmit={step === 1 ? handleNext : handleSubmit} className="reservation-form">
        {step === 1 && (
          <div className="step-one">
            <div className="form-field">
              <label>Seating</label>
              <select name="seating" value={formData.seating} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
            </div>
            <div className="form-field">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Time</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Number of Guests</label>
              <input type="number" name="guests" value={formData.guests} onChange={handleChange} required min="1" max="10" />
            </div>
            <div className="form-field">
              <label>Occasion</label>
              <select name="occasion" value={formData.occasion} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
              </select>
            </div>
            <button type="submit" className="next-button">Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="step-two">
            <div className="form-field">
              <label>First Name *</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Last Name *</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Phone *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Additional Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} />
            </div>
            <div className="form-field checkbox-field">
              <label>
                <input type="checkbox" name="accepted" checked={formData.accepted} onChange={handleChange} required /> I accept the privacy policy *
              </label>
            </div>
            <button type="submit" className="confirm-button">Confirm Reservation</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default BookingForm;

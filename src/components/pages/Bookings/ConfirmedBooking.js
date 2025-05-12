import React from 'react';

function ConfirmedBooking({ data }) {
  return (
    <section className="confirmed-booking">
      <h2>Reservation Confirmed 🎉</h2>
      <p>Thank you, <strong>{data.firstName} {data.lastName}</strong>.</p>
      <p>We’ve received your booking for <strong>{data.date}</strong> at <strong>{data.time}</strong>.</p>
      <p>Guests: <strong>{data.guests}</strong></p>
      <p>Seating: <strong>{data.seating}</strong> | Occasion: <strong>{data.occasion || '—'}</strong></p>
      <p>Contact Info:</p>
      <p>Email: <strong>{data.email}</strong></p>
      <p>Phone: <strong>{data.phone}</strong></p>
      {data.message && <p>Note: <em>{data.message}</em></p>}
      <p style={{ marginTop: '1rem', color: '#495E57' }}>You’ll receive a confirmation by email shortly.</p>
    </section>
  );
}

export default ConfirmedBooking;
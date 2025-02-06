import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './BookingForm.css';

function BookingForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const barbers = [
    { id: 1, name: 'יוסי' },
    { id: 2, name: 'משה' },
    { id: 3, name: 'דוד' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          barber: selectedBarber,
          customerName: name,
          phoneNumber: phone,
        }),
      });
      if (response.ok) {
        alert('התור נקבע בהצלחה!');
        // ניקוי הטופס
        setSelectedDate(null);
        setSelectedBarber('');
        setName('');
        setPhone('');
      }
    } catch (error) {
      alert('אירעה שגיאה בקביעת התור');
    }
  };

  return (
    <div className="booking-form">
      <h2>קביעת תור לתספורת</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>בחר תאריך ושעה:</label>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="dd/MM/yyyy HH:mm"
            minDate={new Date()}
            placeholderText="בחר תאריך ושעה"
          />
        </div>

        <div className="form-group">
          <label>בחר ספר:</label>
          <select
            value={selectedBarber}
            onChange={(e) => setSelectedBarber(e.target.value)}
            required
          >
            <option value="">בחר ספר</option>
            {barbers.map(barber => (
              <option key={barber.id} value={barber.id}>
                {barber.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>שם מלא:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>מספר טלפון:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit">קבע תור</button>
      </form>
    </div>
  );
}

export default BookingForm; 
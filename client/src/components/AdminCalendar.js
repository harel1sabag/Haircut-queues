import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import './AdminCalendar.css';

function AdminCalendar() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({
    date: '',
    barber: '',
    customer: ''
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setEvents(data.map(booking => ({
        id: booking._id,
        title: `${booking.customerName} - ${booking.barberName}`,
        start: booking.date,
        end: new Date(new Date(booking.date).getTime() + 30*60000)
      })));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleEventClick = (info) => {
    // פתיחת חלון עריכה/מחיקה
    if (window.confirm(`האם למחוק את התור של ${info.event.title}?`)) {
      deleteBooking(info.event.id);
    }
  };

  const deleteBooking = async (id) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="admin-calendar">
      <h2>ניהול תורים</h2>
      <div className="filters">
        <input
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({...filter, date: e.target.value})}
          placeholder="סנן לפי תאריך"
        />
        <input
          type="text"
          value={filter.barber}
          onChange={(e) => setFilter({...filter, barber: e.target.value})}
          placeholder="סנן לפי ספר"
        />
        <input
          type="text"
          value={filter.customer}
          onChange={(e) => setFilter({...filter, customer: e.target.value})}
          placeholder="סנן לפי לקוח"
        />
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        locale="he"
        direction="rtl"
      />
    </div>
  );
}

export default AdminCalendar; 
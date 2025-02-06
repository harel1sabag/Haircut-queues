document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const appointment = {
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        barber: document.getElementById('barber').value,
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value
    };

    if (!validatePhone(appointment.phone)) {
        alert('נא להזין מספר טלפון ישראלי תקין (מתחיל ב-05 ובאורך 10 ספרות)');
        return;
    }

    if (!isTimeSlotAvailable(appointment.date, appointment.time, appointment.barber)) {
        alert('התור הזה כבר תפוס, נא לבחור זמן אחר');
        return;
    }

    // כאן בדרך כלל היינו שולחים את הנתונים לשרת
    // לצורך הדוגמה נשמור בלוקל סטורג'
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    alert('התור נקבע בהצלחה!');
    this.reset();
});

function validatePhone(phone) {
    const regex = /^05\d{8}$/;
    return regex.test(phone);
}

function isTimeSlotAvailable(date, time, barber) {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    return !appointments.some(app => 
        app.date === date && 
        app.time === time && 
        app.barber === barber
    );
} 
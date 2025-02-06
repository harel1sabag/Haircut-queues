document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const appointment = {
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        barber: document.getElementById('barber').value,
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value
    };

    // כאן בדרך כלל היינו שולחים את הנתונים לשרת
    // לצורך הדוגמה נשמור בלוקל סטורג'
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    alert('התור נקבע בהצלחה!');
    this.reset();
}); 
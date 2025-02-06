function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const tbody = document.getElementById('appointmentsList');
    tbody.innerHTML = '';

    appointments.forEach((appointment, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>${getBarberName(appointment.barber)}</td>
            <td>${appointment.name}</td>
            <td>${appointment.phone}</td>
            <td>
                <button class="action-btn" onclick="deleteAppointment(${index})">מחק</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function getBarberName(barberId) {
    const barbers = {
        '1': 'יוסי',
        '2': 'משה',
        '3': 'דוד'
    };
    return barbers[barberId] || 'לא ידוע';
}

function deleteAppointment(index) {
    if (confirm('האם אתה בטוח שברצונך למחוק תור זה?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments();
    }
}

// טעינת התורים בעת טעינת הדף
document.addEventListener('DOMContentLoaded', loadAppointments);

// הוספת מאזינים לפילטרים
document.getElementById('filterDate').addEventListener('change', filterAppointments);
document.getElementById('filterBarber').addEventListener('change', filterAppointments);
document.getElementById('filterCustomer').addEventListener('input', filterAppointments);

function filterAppointments() {
    const date = document.getElementById('filterDate').value;
    const barber = document.getElementById('filterBarber').value;
    const customer = document.getElementById('filterCustomer').value.toLowerCase();

    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    appointments = appointments.filter(appointment => {
        const dateMatch = !date || appointment.date === date;
        const barberMatch = !barber || appointment.barber === barber;
        const customerMatch = !customer || appointment.name.toLowerCase().includes(customer);
        return dateMatch && barberMatch && customerMatch;
    });

    const tbody = document.getElementById('appointmentsList');
    tbody.innerHTML = '';

    appointments.forEach((appointment, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>${getBarberName(appointment.barber)}</td>
            <td>${appointment.name}</td>
            <td>${appointment.phone}</td>
            <td>
                <button class="action-btn" onclick="deleteAppointment(${index})">מחק</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// בדיקת סיסמת מנהל
if (!localStorage.getItem('isAdmin')) {
    const password = prompt('נא להזין סיסמת מנהל:');
    if (password !== 'YOUR_ADMIN_PASSWORD') {
        window.location.href = 'index.html';
    } else {
        localStorage.setItem('isAdmin', true);
    }
} 
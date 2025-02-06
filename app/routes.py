from flask import render_template, redirect, url_for, flash, request
from app import app, db
from app.models import Appointment
from app.forms import AppointmentForm
from datetime import datetime

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/book', methods=['GET', 'POST'])
def book_appointment():
    form = AppointmentForm()
    if form.validate_on_submit():
        new_appointment = Appointment(
            full_name=form.full_name.data,
            phone_number=form.phone_number.data,
            date=form.date.data,
            hairdresser=form.hairdresser.data,
            device=form.device.data
        )
        try:
            db.session.add(new_appointment)
            db.session.commit()
            flash('התור נקבע בהצלחה!', 'success')
            return redirect(url_for('index'))
        except Exception as e:
            db.session.rollback()
            flash('אירעה שגיאה בעת קביעת התור. אנא נסה שוב.', 'danger')
    return render_template('book_appointment.html', form=form)

@app.route('/manage')
def manage_appointments():
    # Implement authentication for admin access
    appointments = Appointment.query.order_by(Appointment.date).all()
    return render_template('manage_appointments.html', appointments=appointments)

@app.route('/delete_appointment/<int:id>', methods=['POST'])
def delete_appointment(id):
    # Implement authentication for admin access
    appointment = Appointment.query.get_or_404(id)
    try:
        db.session.delete(appointment)
        db.session.commit()
        flash('התור נמחק בהצלחה!', 'success')
    except Exception as e:
        db.session.rollback()
        flash('אירעה שגיאה בעת מחיקת התור.', 'danger')
    return redirect(url_for('manage_appointments'))

@app.route('/edit_appointment/<int:id>', methods=['GET', 'POST'])
def edit_appointment(id):
    # Implement authentication for admin access
    appointment = Appointment.query.get_or_404(id)
    form = AppointmentForm(obj=appointment)
    
    if form.validate_on_submit():
        try:
            form.populate_obj(appointment)
            db.session.commit()
            flash('התור עודכן בהצלחה!', 'success')
            return redirect(url_for('manage_appointments'))
        except Exception as e:
            db.session.rollback()
            flash('אירעה שגיאה בעת עדכון התור.', 'danger')
    
    return render_template('book_appointment.html', form=form, editing=True)

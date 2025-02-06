from flask import render_template, redirect, url_for, flash, request, session
from app import app, db
from app.models import Appointment
from app.forms import AppointmentForm, LoginForm
from datetime import datetime
import hashlib

# Hardcoded admin credentials (replace with more secure method in production)
ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'haircut123'  # Use a strong password in production

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

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

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        
        if (username == ADMIN_USERNAME and 
            hash_password(password) == hash_password(ADMIN_PASSWORD)):
            session['logged_in'] = True
            flash('התחברת בהצלחה!', 'success')
            return redirect(url_for('manage_appointments'))
        else:
            flash('שם משתמש או סיסמה שגויים', 'danger')
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('התנתקת בהצלחה', 'success')
    return redirect(url_for('index'))

def login_required(f):
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('logged_in'):
            flash('אינך מורשה לגשת לדף זה. אנא התחבר.', 'warning')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/manage')
@login_required
def manage_appointments():
    appointments = Appointment.query.order_by(Appointment.date).all()
    return render_template('manage_appointments.html', appointments=appointments)

@app.route('/delete_appointment/<int:id>', methods=['POST'])
@login_required
def delete_appointment(id):
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
@login_required
def edit_appointment(id):
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

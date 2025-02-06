from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, SelectField, SubmitField, PasswordField
from wtforms.validators import DataRequired, Length, ValidationError
import re
from datetime import datetime

class AppointmentForm(FlaskForm):
    full_name = StringField('שם מלא', validators=[
        DataRequired(message='אנא הזן שם מלא'),
        Length(min=2, max=100, message='שם צריך להיות בין 2 ל-100 תווים')
    ])
    phone_number = StringField('מספר טלפון', validators=[DataRequired(message='אנא הזן מספר טלפון')])
    date = DateTimeField('תאריך ושעה', format='%Y-%m-%d %H:%M', validators=[DataRequired(message='אנא בחר תאריך ושעה')])
    hairdresser = SelectField('ספר', choices=[
        ('ישראל', 'ישראל'),
        ('דוד', 'דוד'),
        ('אלון', 'אלון')
    ], validators=[DataRequired(message='אנא בחר ספר')])
    device = SelectField('מכשיר', choices=[
        ('כיסא 1', 'כיסא 1'),
        ('כיסא 2', 'כיסא 2'),
        ('כיסא 3', 'כיסא 3')
    ], validators=[DataRequired(message='אנא בחר מכשיר')])
    submit = SubmitField('קבע תור')

    def validate_phone_number(self, field):
        # Validate Israeli phone number format
        if not re.match(r'^(0[2-9]\d{8}|[1-9]\d{8})$', field.data):
            raise ValidationError('אנא הזן מספר טלפון תקין')

class LoginForm(FlaskForm):
    username = StringField('שם משתמש', validators=[DataRequired(message='אנא הזן שם משתמש')])
    password = PasswordField('סיסמה', validators=[DataRequired(message='אנא הזן סיסמה')])
    submit = SubmitField('התחבר')

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap5

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Change this in production
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///haircut_appointments.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bootstrap = Bootstrap5(app)

from app import routes, models

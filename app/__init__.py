from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap5
import os

# Determine environment
is_production = os.environ.get('ENV') == 'production'

app = Flask(__name__)

# Secret Key
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'development_secret_key_for_sessions')

# Database Configuration
if is_production:
    # Production: use PostgreSQL from environment variable
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '').replace('postgres://', 'postgresql://')
else:
    # Development: use SQLite
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///haircut_appointments.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bootstrap = Bootstrap5(app)

from app import routes, models

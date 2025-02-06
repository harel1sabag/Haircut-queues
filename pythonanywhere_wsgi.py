import sys
import os

# Add your project path
path = '/home/yourusername/Haircut-queues'
if path not in sys.path:
    sys.path.append(path)

# Set environment variables
os.environ['SECRET_KEY'] = 'your_secret_key_here'

# Import your app
from app import app as application

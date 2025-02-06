from app import app, db
import os
import traceback
import sys
import logging
import socket

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

print("Starting application initialization...")

def create_database():
    try:
        print("Attempting to create database...")
        with app.app_context():
            db.create_all()
        print("Database created successfully")
        logging.info("Database created successfully")
    except Exception as e:
        print(f"Error creating database: {e}")
        logging.error(f"Error creating database: {e}")
        traceback.print_exc()

def find_free_port():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(('', 0))
            s.listen(1)
            port = s.getsockname()[1]
        print(f"Found free port: {port}")
        return port
    except Exception as e:
        print(f"Error finding free port: {e}")
        return 5000  # Fallback port

if __name__ == '__main__':
    try:
        print("Initializing application...")
        
        # Create database
        create_database()
        
        # Find a free port
        port = find_free_port()
        
        print(f"Attempting to start app on port {port}")
        logging.info(f"Attempting to start app on port {port}")
        
        # Print out app configuration
        print(f"App configuration: {app.config}")
        
        app.run(
            host='127.0.0.1', 
            port=port, 
            debug=True
        )
    except Exception as e:
        print(f"Fatal error starting application: {e}")
        logging.critical(f"Fatal error starting application: {e}")
        logging.critical(traceback.format_exc())
        sys.exit(1)

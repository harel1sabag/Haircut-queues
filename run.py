from app import app, db
import os
import traceback
import sys
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('app_logs.log')
    ]
)

def create_database():
    try:
        with app.app_context():
            db.create_all()
            logging.info("Database created successfully")
    except Exception as e:
        logging.error(f"Error creating database: {e}")
        logging.error(traceback.format_exc())
        raise

if __name__ == '__main__':
    try:
        create_database()
        port = int(os.environ.get('PORT', 5000))
        logging.info(f"Starting app on port {port}")
        app.run(host='0.0.0.0', port=port)
    except Exception as e:
        logging.critical(f"Fatal error starting application: {e}")
        logging.critical(traceback.format_exc())
        raise

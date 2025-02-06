from app import app, db
import os

def create_database():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    create_database()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from models import db, User, Item
from flask_cors import CORS
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt
config = dotenv_values(".env")
from flask_migrate import Migrate

app = Flask(__name__)
app.secret_key = config['FLASK_SECRET_KEY']
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

from server import init_plaid_routes
init_plaid_routes(app)

db.init_app(app)

@app.get("/")
def index():
    return "money magnet backend"


# Check session
@app.get("/api/check_session")
def check_session():
    user = db.session.get(User, session.get('user_id'))
    print(f'check session: {user}')
    if user:
        return user.to_dict(rules=['-password']), 200
    else:
        return {"message": "No user logged in."}, 401
    
# Login
@app.post("/api/login")
def login():
    try:
        data = request.json
        user = User.query.filter_by(email=data.get("email")).first()

        if user and bcrypt.check_password_hash(user.password_hash, data.get('password')):
            session["user_id"] = user.id
            print("success")
            return user.to_dict(rules=['-password_hash']), 200
        else:
            if not user:
                return {"error": "User not found. Please try again."}, 404
            else:
                return {"error": "Incorrect password. Please try again."}, 401

    except Exception as e:
        return {"error": str(e)}

# Logout
@app.delete('/api/logout')
def logout():
    session.pop('user_id', None) 
    return { "message": "Logged out"}, 200

# Signup
@app.post("/api/signup")
def signup():
    try:
        data = request.json
        existing_user = User.query.filter_by(email=data.get("email")).first()

        if existing_user:
            return {"error": "Email already exists. Please select new email."}, 400
    
        new_user = User(
            email=data.get("email"),
            password_hash=bcrypt.generate_password_hash(data.get("password")),
        )

        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict(rules=['-password_hash']), 200

    except Exception as e:
        return {"error": str(e)}, 500
    
# API endpoint to create an item instance associated with the logged-in user
# Not sure we need an endpoint for this- when making the connection we can create the item - Joseph

# @app.post('/api/create_item/<int:user_id>')
# def create_item(user_id):
#     try:
#         # Extract data from the request body
#         data = request.json

#         # Check if the user exists
#         user = User.query.get(user_id)
#         if not user:
#             return jsonify({'error': 'User not found'}), 404
        
#         itemId = data['itemId']
#         accessToken = data['accessToken']

#         # Create a new item instance associated with the user
#         new_item = Item(item_id=itemId, access_token=accessToken, user_id=user_id)

#         # Add the item to the user's items list
#         user.items.append(new_item)
        
#         # Commit the changes to the database
#         db.session.add(new_item)
#         db.session.commit()
        
#         return jsonify({'message': 'Item created successfully'}), 201
        
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(port=5555, debug=True)


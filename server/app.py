#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
import datetime

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Item, Account, Transaction

# Views go here!

class Users(Resource):
    def get(self):
        return make_response([user.to_dict() for user in User.query.all()], 200)
    def post(self):
        params = request.json
        new_user = User(
            email = params['email'],
            password = params['password']
        )
        db.session.add(new_user)
        db.session.commit()
        session['user_email'] = new_user.email
        return make_response({'user': new_user.to_dict()}, 201)

api.add_resource(Users, '/users')


if __name__ == '__main__':
    app.run(port=5555, debug=True)


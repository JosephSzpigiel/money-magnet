from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import string, datetime
from dotenv import load_dotenv
import os
import re
from datetime import datetime

load_dotenv()

metadata = MetaData(
    naming_convention={
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users_table'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    password_hash = db.Column(db.String)
    transactions = db.relationship('Transaction', back_populates = 'user', cascade = 'all, delete-orphan')
    items = db.relationship('Item', back_populates = 'user', cascade = 'all, delete-orphan')

    def __repr__(self):
        return f'<User: {self.id}>'

class Item(db.Model, SerializerMixin):
    __tablename__ = 'items_table'

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.String)
    access_token = db.Column(db.String)
    bank_name = db.Column(db.String)
    user_id = db.Column(db.String, db.ForeignKey('users_table.id'))  # Define foreign key here
    user = db.relationship('User', back_populates='items')
    accounts = db.relationship('Account', back_populates='item', cascade='all, delete-orphan')
    is_active = db.Column(db.Boolean, default=1)
    cursor = db.Column(db.String, default='')
    serialize_rules = ('-user', '-access_token')

    def __repr__(self):
        return f'<Item: {self.user} at {self.bank_name}'


class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts_table'

    id = db.Column(db.String, primary_key=True)
    item_id = db.Column(db.String, db.ForeignKey('items_table.id'))  # Define foreign key here
    item = db.relationship('Item', back_populates='accounts')
    transactions = db.relationship('Transaction', back_populates='account', cascade='all, delete-orphan')
    name = db.Column(db.String)
    serialize_rules = ('-item')

class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions_table'

    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))  
    user = db.relationship('User', back_populates='transactions')
    account_id = db.Column(db.String, db.ForeignKey('accounts_table.id'))
    account = db.relationship('Account', back_populates='transactions')
    category = db.Column(db.String)
    date = db.Column(db.String)
    authorized_date = db.Column(db.String)
    name = db.Column(db.String)
    amount = db.Column(db.Float)
    currency_code = db.Column(db.String)
    is_removed = db.Column(db.Boolean, default=0)
    serialize_rules = ('-account', '-user')
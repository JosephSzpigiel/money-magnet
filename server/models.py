from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    email = db.Column(db.String, primary_key = True)
    id = db.Column(db.String, unique = True)
    password = db.Column(db.String)
    transactions = db.relationship('Transaction', back_populates = 'user', cascade = 'all, delete-orphan')
    items = db.relationship('Item', back_populates = 'user', cascade = 'all, delete-orphan')

    def __repr__(self):
        return f'<User: {self.email}>'

class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    id = db.Column(db.String, primary_key = True)
    access_token = db.Column(db.String)
    bank_name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), )
    user = db.relationship('User', back_populates = 'items')
    accounts = db.relationship('Account', back_populates = 'item', cascade = 'all, delete-orphan')
    is_active = db.Column(db.Boolean, default = 1)
    serialize_rules = ('-user')

    def __repr__(self):
        return f'<Item: {self.user} at {self.bank_name}'

class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    id = db.Column(db.String, primary_key = True)
    item_id = db.Column(db.String, db.ForeignKey('items.id'))
    item = db.relationship('Item', back_populates = 'accounts')
    transactions = db.relationship('Transaction', back_populates = 'account', cascade = 'all, delete-orphan')
    name  = db.Column(db.String)
    serialize_rules = ('-item')

class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions'

    id = db.Column(db.String, primary_key = True)
    user_id = db.Column(db.String, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates = 'transactions')
    account_id = db.Column(db.String, db.ForeignKey('accounts.id'))
    account = db.relationship('Account', back_populates = 'transactions')
    category = db.Column(db.String)
    date = db.Column(db.String)
    authorized_date = db.Column(db.String)
    name = db.Column(db.String)
    amount = db.Column(db.Float)
    currency_code = db.Column(db.String)
    is_removed = db.Column(db.Boolean, default = 0)
    
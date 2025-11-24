from sqlalchemy import Column, Integer, String, Boolean, JSON
from database import Base

class MedicineReminderDB(Base):
    __tablename__ = "medicines"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    dosage = Column(String)
    time = Column(String)
    taken = Column(Boolean, default=False)

class AppointmentDB(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    doctor = Column(String)
    date = Column(String)
    time = Column(String)
    location = Column(String)

class ContactDB(Base):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    relation = Column(String)
    phone = Column(String)
    image_url = Column(String, nullable=True)

class RecipeDB(Base):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    ingredients = Column(JSON) # Storing list as JSON
    instructions = Column(String)

class GroceryItemDB(Base):
    __tablename__ = "groceries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    checked = Column(Boolean, default=False)

class HealthInfoDB(Base):
    __tablename__ = "health_info"
    id = Column(Integer, primary_key=True, index=True) # Singleton mostly
    blood_type = Column(String)
    allergies = Column(JSON)
    conditions = Column(JSON)
    insurance_provider = Column(String)
    policy_number = Column(String)

class CognitiveScoreDB(Base):
    __tablename__ = "cognitive_scores"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String) # ISO format YYYY-MM-DD
    score = Column(Integer)
    total_attempts = Column(Integer)
    game_type = Column(String, default='memory')

class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)

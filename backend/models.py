from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class MedicineReminder(BaseModel):
    id: int
    name: str
    dosage: str
    time: str # HH:MM format
    taken: bool = False

    class Config:
        from_attributes = True

class Appointment(BaseModel):
    id: int
    title: str
    doctor: str
    date: str # YYYY-MM-DD
    time: str # HH:MM
    location: str

    class Config:
        from_attributes = True

class Contact(BaseModel):
    id: int
    name: str
    relation: str
    phone: str
    image_url: Optional[str] = None

    class Config:
        from_attributes = True

class Recipe(BaseModel):
    id: int
    title: str
    ingredients: List[str]
    instructions: str

    class Config:
        from_attributes = True

class GroceryItem(BaseModel):
    id: int
    name: str
    checked: bool = False

    class Config:
        from_attributes = True

class HealthInfo(BaseModel):
    blood_type: str
    allergies: List[str]
    conditions: List[str]
    insurance_provider: str
    policy_number: str

    class Config:
        from_attributes = True

class User(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str

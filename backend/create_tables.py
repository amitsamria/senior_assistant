from database import engine, Base
import db_models

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created.")

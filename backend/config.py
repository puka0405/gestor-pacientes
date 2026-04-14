import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Obtiene la URL de la base de datos desde las variables de entorno
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "").replace(
        "postgres://", "postgresql://"  
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret")
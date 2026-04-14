from .db import db
from datetime import datetime


class Doctor(db.Model):
    __tablename__ = "doctores"

    id           = db.Column(db.Integer, primary_key=True)
    nombre       = db.Column(db.String(120), nullable=False)
    apellido     = db.Column(db.String(120), nullable=False)
    especialidad = db.Column(db.String(100), nullable=False)
    email        = db.Column(db.String(150), unique=True, nullable=False)

    citas = db.relationship("Cita", back_populates="doctor", lazy=True)


class Paciente(db.Model):
    __tablename__ = "pacientes"

    id        = db.Column(db.Integer, primary_key=True)
    nombre    = db.Column(db.String(120), nullable=False)
    apellido  = db.Column(db.String(120), nullable=False)
    fecha_nac = db.Column(db.Date, nullable=False)
    telefono  = db.Column(db.String(20))
    email     = db.Column(db.String(150), unique=True)

    citas = db.relationship("Cita", back_populates="paciente", lazy=True)


class Cita(db.Model):
    __tablename__ = "citas"

    id          = db.Column(db.Integer, primary_key=True)
    fecha_hora  = db.Column(db.DateTime, nullable=False)
    motivo      = db.Column(db.String(255), nullable=False)
    estado      = db.Column(db.String(30), default="pendiente")  # pendiente | completada | cancelada
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)

    paciente_id = db.Column(db.Integer, db.ForeignKey("pacientes.id"), nullable=False)
    doctor_id   = db.Column(db.Integer, db.ForeignKey("doctores.id"), nullable=False)

    paciente = db.relationship("Paciente", back_populates="citas")
    doctor   = db.relationship("Doctor", back_populates="citas")
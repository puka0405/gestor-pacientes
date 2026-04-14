from flask import Blueprint, request, jsonify
from ..models import Doctor
from ..schemas import doctor_schema, doctores_schema
from ..db import db

bp = Blueprint("doctores", __name__, url_prefix="/api/doctores")

@bp.route("", methods=["GET"])
def listar():
    return jsonify(doctores_schema.dump(Doctor.query.all())), 200

@bp.route("/<int:id>", methods=["GET"])
def obtener(id):
    return jsonify(doctor_schema.dump(Doctor.query.get_or_404(id))), 200

@bp.route("", methods=["POST"])
def crear():
    try:
        doctor = doctor_schema.load(request.json, session=db.session)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    db.session.add(doctor)
    db.session.commit()
    return jsonify(doctor_schema.dump(doctor)), 201

@bp.route("/<int:id>", methods=["PUT"])
def actualizar(id):
    doctor = Doctor.query.get_or_404(id)
    errors = doctor_schema.validate(request.json, session=db.session, partial=True)
    if errors:
        return jsonify(errors), 400
    doctor_schema.load(request.json, instance=doctor, session=db.session, partial=True)
    db.session.commit()
    return jsonify(doctor_schema.dump(doctor)), 200

@bp.route("/<int:id>", methods=["DELETE"])
def eliminar(id):
    doctor = Doctor.query.get_or_404(id)
    db.session.delete(doctor)
    db.session.commit()
    return "", 204
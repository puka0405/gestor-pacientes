from flask import Blueprint, request, jsonify
from ..models import Paciente
from ..schemas import paciente_schema, pacientes_schema
from ..db import db

bp = Blueprint("pacientes", __name__, url_prefix="/api/pacientes")

@bp.route("", methods=["GET"])
def listar():
    return jsonify(pacientes_schema.dump(Paciente.query.all())), 200

@bp.route("/<int:id>", methods=["GET"])
def obtener(id):
    return jsonify(paciente_schema.dump(Paciente.query.get_or_404(id))), 200

@bp.route("", methods=["POST"])
def crear():
    try:
        paciente = paciente_schema.load(request.json, session=db.session)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    db.session.add(paciente)
    db.session.commit()
    return jsonify(paciente_schema.dump(paciente)), 201

@bp.route("/<int:id>", methods=["PUT"])
def actualizar(id):
    paciente = Paciente.query.get_or_404(id)
    errors = paciente_schema.validate(request.json, session=db.session, partial=True)
    if errors:
        return jsonify(errors), 400
    paciente_schema.load(request.json, instance=paciente, session=db.session, partial=True)
    db.session.commit()
    return jsonify(paciente_schema.dump(paciente)), 200

@bp.route("/<int:id>", methods=["DELETE"])
def eliminar(id):
    paciente = Paciente.query.get_or_404(id)
    db.session.delete(paciente)
    db.session.commit()
    return "", 204
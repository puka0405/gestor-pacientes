from flask import Blueprint, request, jsonify
from ..models import Cita
from ..schemas import cita_schema, citas_schema
from ..db import db

bp = Blueprint("citas", __name__, url_prefix="/api/citas")

@bp.route("", methods=["GET"])
def listar():
    return jsonify(citas_schema.dump(Cita.query.all())), 200

@bp.route("/<int:id>", methods=["GET"])
def obtener(id):
    return jsonify(cita_schema.dump(Cita.query.get_or_404(id))), 200

@bp.route("", methods=["POST"])
def crear():
    try:
        cita = cita_schema.load(request.json, session=db.session)
    except Exception as e:
        return jsonify({"error": str(e)}), 400 
    
    db.session.add(cita)
    db.session.commit()
    return jsonify(cita_schema.dump(cita)), 201

@bp.route("/<int:id>", methods=["PUT"])
def actualizar(id):
    cita = Cita.query.get_or_404(id)
    errors = cita_schema.validate(request.json, session=db.session, partial=True)
    if errors:
        return jsonify(errors), 400
    cita_schema.load(request.json, instance=cita, session=db.session, partial=True)
    db.session.commit()
    return jsonify(cita_schema.dump(cita)), 200

@bp.route("/<int:id>", methods=["DELETE"])
def eliminar(id):
    cita = Cita.query.get_or_404(id)
    db.session.delete(cita)
    db.session.commit()
    return "", 204
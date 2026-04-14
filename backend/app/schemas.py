from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields, validate
from .models import Paciente, Doctor, Cita

class DoctorSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Doctor
        load_instance = True

    nombre       = fields.Str(required=True, validate=validate.Length(min=2, max=120))
    apellido     = fields.Str(required=True, validate=validate.Length(min=2, max=120))
    especialidad = fields.Str(required=True)
    email        = fields.Email(required=True)


class PacienteSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Paciente
        load_instance = True

    nombre    = fields.Str(required=True, validate=validate.Length(min=2, max=120))
    apellido  = fields.Str(required=True, validate=validate.Length(min=2, max=120))
    fecha_nac = fields.Date(required=True)
    email     = fields.Email(load_default=None)


class CitaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Cita
        load_instance = True
        include_fk = True  # expone paciente_id y doctor_id

    fecha_hora = fields.DateTime(required=True)
    motivo     = fields.Str(required=True, validate=validate.Length(min=3, max=255))
    estado     = fields.Str(validate=validate.OneOf(["pendiente", "completada", "cancelada"]))

    # Solo lectura: devuelve nombre completo en GET, no se carga en POST/PUT
    paciente = fields.Nested(PacienteSchema, dump_only=True)
    doctor   = fields.Nested(DoctorSchema, dump_only=True)


doctor_schema   = DoctorSchema()
doctores_schema = DoctorSchema(many=True)

paciente_schema  = PacienteSchema()
pacientes_schema = PacienteSchema(many=True)

cita_schema  = CitaSchema()
citas_schema = CitaSchema(many=True)
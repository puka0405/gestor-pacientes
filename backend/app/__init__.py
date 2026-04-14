from flask import Flask, jsonify
from flask_cors import CORS
from .routes import pacientes, doctores, citas
from .db import db, migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.register_blueprint(pacientes.bp)
    app.register_blueprint(doctores.bp)
    app.register_blueprint(citas.bp)

    @app.errorhandler(400)
    def bad_request(e):
        return jsonify({"error": "Petición inválida"}), 400

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "No encontrado"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Error interno"}), 500

    return app
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Paciente } from "../models/paciente.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class PacientesService {

  private url = `${environment.apiURL}/pacientes`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Paciente[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }

  create(p: Paciente) {
    return this.http.post<Paciente>(this.url, p);
  }

  update(id: number, p: Paciente) {
    return this.http.put<Paciente>(`${this.url}/${id}`, p);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
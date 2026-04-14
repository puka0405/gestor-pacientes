import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cita } from "../models/cita.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class CitasService {

  private url = `${environment.apiURL}/citas`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Cita[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Cita>(`${this.url}/${id}`);
  }

  create(c: Cita) {
    return this.http.post<Cita>(this.url, c);
  }

  update(id: number, c: Cita) {
    return this.http.put<Cita>(`${this.url}/${id}`, c);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
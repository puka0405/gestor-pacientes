import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Doctor } from "../models/doctor.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class DoctoresService {

  private url = `${environment.apiURL}/doctores`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Doctor[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Doctor>(`${this.url}/${id}`);
  }

  create(d: Doctor) {
    return this.http.post<Doctor>(this.url, d);
  }

  update(id: number, d: Doctor) {
    return this.http.put<Doctor>(`${this.url}/${id}`, d);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
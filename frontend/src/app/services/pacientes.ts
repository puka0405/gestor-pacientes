import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private pacientesCollection;

  constructor(private firestore: Firestore) {
    this.pacientesCollection = collection(this.firestore, 'pacientes');
  }

  getPacientes(): Observable<Paciente[]> {
    return collectionData(this.pacientesCollection, { idField: 'id' }).pipe(
      map((data: any[]) =>
        data.map(p => ({
          ...p,
          fechaNacimiento: p.fechaNacimiento?.toDate?.() ?? null
        }))
      )
    ) as Observable<Paciente[]>;
  }

  addPaciente(paciente: Paciente): Promise<any> {
    return addDoc(this.pacientesCollection, paciente);
  }

  updatePaciente(id: string, paciente: Partial<Paciente>): Promise<void> {
    const pacienteDoc = doc(this.firestore, `pacientes/${id}`);
    return updateDoc(pacienteDoc, paciente);
  }

  deletePaciente(id: string): Promise<void> {
    const pacienteDoc = doc(this.firestore, `pacientes/${id}`);
    return deleteDoc(pacienteDoc);
  }
}
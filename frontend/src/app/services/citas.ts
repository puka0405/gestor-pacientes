import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,
         doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private citasCollection;

  constructor(private firestore: Firestore) {
    this.citasCollection = collection(this.firestore, 'citas');
  }

  getCitas(): Observable<Cita[]> {
    return collectionData(this.citasCollection,
                          { idField: 'id' }) as Observable<Cita[]>;
  }

  addCita(cita: Cita): Promise<any> {
    return addDoc(this.citasCollection, cita);
  }

  updateCita(id: string, cita: Partial<Cita>): Promise<void> {
    const citaDoc = doc(this.firestore, `citas/${id}`);
    return updateDoc(citaDoc, cita);
  }

  deleteCita(id: string): Promise<void> {
    const citaDoc = doc(this.firestore, `citas/${id}`);
    return deleteDoc(citaDoc);
  }
}
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,
         doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {
  private doctoresCollection;

  constructor(private firestore: Firestore) {
    this.doctoresCollection = collection(this.firestore, 'doctores');
  }

  getDoctores(): Observable<Doctor[]> {
    return collectionData(this.doctoresCollection,
                          { idField: 'id' }) as Observable<Doctor[]>;
  }

  addDoctor(doctor: Doctor): Promise<any> {
    return addDoc(this.doctoresCollection, doctor);
  }

  updateDoctor(id: string, doctor: Partial<Doctor>): Promise<void> {
    const doctorDoc = doc(this.firestore, `doctores/${id}`);
    return updateDoc(doctorDoc, doctor);
  }

  deleteDoctor(id: string): Promise<void> {
    const doctorDoc = doc(this.firestore, `doctores/${id}`);
    return deleteDoc(doctorDoc);
  }
}
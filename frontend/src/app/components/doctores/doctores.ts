import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DoctoresService } from '../../services/doctores';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doctores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctores.html',
  styleUrls: ['./doctores.css'],
})
export class DoctoresComponent implements OnInit {
  doctorForm: FormGroup;
  doctores: Doctor[] = [];
  editingId: string | null = null;
  user$!: Observable<any>;

  readonly soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  constructor(
    private fb: FormBuilder,
    private doctoresService: DoctoresService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.doctorForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
          Validators.pattern(this.soloLetrasRegex),
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
          Validators.pattern(this.soloLetrasRegex),
        ],
      ],
      especialidad: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.loadDoctores();
  }

  loadDoctores() {
    this.doctoresService.getDoctores().subscribe({
      next: (data) => {
        this.doctores = [...data];
      },
      error: (error) => {
        console.error('Error al cargar doctores:', error);
        alert('Error al cargar la lista de doctores');
      },
    });
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      const doctor: Doctor = {
        ...this.doctorForm.value,
      };

      if (this.editingId) {
        this.updateDoctor(doctor);
      } else {
        this.addDoctor(doctor);
      }
    } else {
      this.markFormGroupTouched(this.doctorForm);
      alert('Por favor, completa todos los campos correctamente');
    }
  }

  addDoctor(doctor: Doctor) {
    this.doctoresService.addDoctor(doctor)
      .then(() => {
        alert('✅ Doctor agregado exitosamente');
        this.resetForm();
      })
      .catch((error) => {
        console.error('Error al agregar doctor:', error);
        alert('❌ Error al agregar el doctor');
      });
  }

  updateDoctor(doctor: Doctor) {
    if (!this.editingId) return;

    this.doctoresService.updateDoctor(this.editingId, doctor)
      .then(() => {
        alert('✅ Doctor actualizado exitosamente');
        this.resetForm();
        this.editingId = null;
      })
      .catch((error) => {
        console.error('Error al actualizar doctor:', error);
        alert('❌ Error al actualizar el doctor');
      });
  }

  editDoctor(doctor: Doctor) {
    this.editingId = doctor.id || null;

    this.doctorForm.patchValue({
      nombre: doctor.nombre,
      apellidos: doctor.apellidos,
      especialidad: doctor.especialidad,
      correoElectronico: doctor.correoElectronico,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteDoctor(id: string | undefined) {
    if (!id) return;

    if (confirm('¿Estás seguro de eliminar este doctor?')) {
      this.doctoresService.deleteDoctor(id)
        .then(() => {
          alert('✅ Doctor eliminado exitosamente');
        })
        .catch((error) => {
          console.error('Error al eliminar doctor:', error);
          alert('❌ Error al eliminar el doctor');
        });
    }
  }

  resetForm() {
    this.doctorForm.reset();
    this.editingId = null;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
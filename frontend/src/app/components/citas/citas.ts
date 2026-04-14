import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CitasService } from '../../services/citas';
import { PacientesService } from '../../services/pacientes';
import { DoctoresService } from '../../services/doctores';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './citas.html',
  styleUrls: ['./citas.css'],
})
export class CitasComponent implements OnInit {
  citaForm: FormGroup;

  citas: any[] = [];
  pacientes: any[] = [];
  doctores: any[] = [];

  editingId: string | null = null;
  user$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private pacientesService: PacientesService,
    private doctoresService: DoctoresService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.citaForm = this.fb.group({
      fechaHora: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.maxLength(255)]],
      estado: ['pendiente'],
      pacienteId: ['', Validators.required],
      doctorId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.loadCitas();
    this.loadPacientes();
    this.loadDoctores();
  }

  loadCitas() {
    this.citasService.getCitas().subscribe({
      next: (data) => {
        this.citas = data.map(c => ({
          ...c,
          fechaHora: this.toDate(c.fechaHora),
        }));
      },
      error: (err) => console.error(err),
    });
  }

  loadPacientes() {
    this.pacientesService.getPacientes().subscribe({
      next: (data) => this.pacientes = data,
      error: (err) => console.error(err),
    });
  }

  loadDoctores() {
    this.doctoresService.getDoctores().subscribe({
      next: (data) => this.doctores = data,
      error: (err) => console.error(err),
    });
  }

  onSubmit() {
    if (this.citaForm.invalid) return;

    const raw = this.citaForm.value;

    const cita = {
      ...raw,
      fechaHora: new Date(raw.fechaHora).toISOString(),
    };

    if (this.editingId) {
      this.citasService.updateCita(this.editingId, cita).then(() => {
        this.resetForm();
      });
    } else {
      this.citasService.addCita(cita).then(() => {
        this.resetForm();
      });
    }
  }

  editCita(cita: any) {
    this.editingId = cita.id;

    this.citaForm.patchValue({
      fechaHora: this.toInputDate(cita.fechaHora),
      motivo: cita.motivo,
      estado: cita.estado,
      pacienteId: cita.pacienteId,
      doctorId: cita.doctorId,
    });
  }

  deleteCita(id: string) {
    if (!id) return;

    if (confirm('¿Eliminar cita?')) {
      this.citasService.deleteCita(id).then(() => {
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.citaForm.reset({ estado: 'pendiente' });
    this.editingId = null;
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // --------------------
  // Helpers de fecha
  // --------------------

  private toDate(value: any): Date {
    if (!value) return new Date();

    if (value?.toDate) return value.toDate(); // Firestore Timestamp
    if (typeof value === 'string') return new Date(value);

    return value;
  }

  private toInputDate(value: any): string {
    const date = this.toDate(value);
    return date.toISOString().slice(0, 16);
  }

  getPacienteNombre(id: string): string {
    const p = this.pacientes.find(x => x.id === id);
    return p ? `${p.nombre} ${p.apellidos}` : 'Desconocido';
  }

  getDoctorNombre(id: string): string {
    const d = this.doctores.find(x => x.id === id);
    return d ? `${d.nombre} ${d.apellidos}` : 'Desconocido';
  }
}
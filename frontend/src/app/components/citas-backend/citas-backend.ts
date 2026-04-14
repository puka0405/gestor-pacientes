import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from '../../services_backend/citas';
import { PacientesService } from '../../services_backend/pacientes';
import { DoctoresService } from '../../services_backend/doctores';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './citas-backend.html'
})
export class CitasBackendComponent implements OnInit {

  form: FormGroup;

  citas: any[] = [];
  pacientes: any[] = [];
  doctores: any[] = [];

  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private pacientesService: PacientesService,
    private doctoresService: DoctoresService
  ) {

    this.form = this.fb.group({
      fecha_hora: ['', Validators.required],
      motivo: ['', Validators.required],
      estado: ['pendiente'],
      paciente_id: ['', Validators.required],
      doctor_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.load();

    this.pacientesService.getAll().subscribe(res => this.pacientes = res);
    this.doctoresService.getAll().subscribe(res => this.doctores = res);
  }

  load() {
    this.citasService.getAll().subscribe(res => this.citas = res);
  }

  save() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.editingId) {
      this.citasService.update(this.editingId, data).subscribe(() => this.reset());
    } else {
      this.citasService.create(data).subscribe(() => this.reset());
    }
  }

  edit(c: any) {
    this.editingId = c.id;

    this.form.patchValue({
      fecha_hora: c.fecha_hora,
      motivo: c.motivo,
      estado: c.estado,
      paciente_id: c.paciente_id,
      doctor_id: c.doctor_id
    });
  }

  delete(id: number) {
    this.citasService.delete(id).subscribe(() => this.load());
  }

  reset() {
    this.form.reset({ estado: 'pendiente' });
    this.editingId = null;
    this.load();
  }

  // -------------------------
  // Helpers para mostrar nombres
  // -------------------------

  getPacienteNombre(id: number): string {
    const p = this.pacientes.find(x => x.id === id);
    return p ? `${p.nombre} ${p.apellido}` : '---';
  }

  getDoctorNombre(id: number): string {
    const d = this.doctores.find(x => x.id === id);
    return d ? `${d.nombre} ${d.apellido}` : '---';
  }

  formatFecha(fecha: any): string {
    if (!fecha) return '';

    const date = fecha?.toDate ? fecha.toDate() : new Date(fecha);

    return date.toLocaleString();
  }
}
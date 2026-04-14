import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacientesService } from '../../services_backend/pacientes';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pacientes-backend.html'
})
export class PacientesBackendComponent implements OnInit {

  form: FormGroup;
  pacientes: any[] = [];
  editingId: number | null = null;

  constructor(private fb: FormBuilder, private service: PacientesService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nac: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['']
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(res => this.pacientes = res);
  }

  save() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.editingId) {
      this.service.update(this.editingId, data).subscribe(() => this.reset());
    } else {
      this.service.create(data).subscribe(() => this.reset());
    }
  }

  edit(p: any) {
    this.editingId = p.id;
    this.form.patchValue(p);
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }

  reset() {
    this.form.reset();
    this.editingId = null;
    this.load();
  }
}
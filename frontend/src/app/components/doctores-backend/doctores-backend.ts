import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoctoresService } from '../../services_backend/doctores';

@Component({
  selector: 'app-doctores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctores-backend.html',
})
export class DoctoresBackendComponent implements OnInit {

  form: FormGroup;
  doctores: any[] = [];
  editingId: number | null = null;

  constructor(private fb: FormBuilder, private service: DoctoresService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      especialidad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(res => this.doctores = res);
  }

  save() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.editingId) {
      this.service.update(this.editingId, data).subscribe(() => {
        this.reset();
      });
    } else {
      this.service.create(data).subscribe(() => {
        this.reset();
      });
    }
  }

  edit(d: any) {
    this.editingId = d.id;
    this.form.patchValue(d);
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
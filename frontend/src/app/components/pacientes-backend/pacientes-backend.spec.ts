import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesBackend } from './pacientes-backend';

describe('PacientesBackend', () => {
  let component: PacientesBackend;
  let fixture: ComponentFixture<PacientesBackend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesBackend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesBackend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasBackend } from './citas-backend';

describe('CitasBackend', () => {
  let component: CitasBackend;
  let fixture: ComponentFixture<CitasBackend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasBackend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasBackend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

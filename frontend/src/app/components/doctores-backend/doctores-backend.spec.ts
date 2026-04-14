import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoresBackend } from './doctores-backend';

describe('DoctoresBackend', () => {
  let component: DoctoresBackend;
  let fixture: ComponentFixture<DoctoresBackend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctoresBackend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctoresBackend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

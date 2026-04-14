import { TestBed } from '@angular/core/testing';

import { Doctores } from './doctores';

describe('Doctores', () => {
  let service: Doctores;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Doctores);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

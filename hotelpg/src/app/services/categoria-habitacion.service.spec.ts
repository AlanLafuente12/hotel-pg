import { TestBed } from '@angular/core/testing';

import { CategoriaHabitacionService } from './categoria-habitacion.service';

describe('CategoriaHabitacionService', () => {
  let service: CategoriaHabitacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaHabitacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

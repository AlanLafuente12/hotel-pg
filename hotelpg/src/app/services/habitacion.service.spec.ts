import { TestBed } from '@angular/core/testing';

import { HabitacionService } from './habitacion.service';

describe('HabitacionService', () => {
  let service: HabitacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

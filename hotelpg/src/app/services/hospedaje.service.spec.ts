import { TestBed } from '@angular/core/testing';

import { HospedajeService } from './hospedaje.service';

describe('HospedajeService', () => {
  let service: HospedajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospedajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

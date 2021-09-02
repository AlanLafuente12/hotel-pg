import { TestBed } from '@angular/core/testing';

import { DosificacionService } from './dosificacion.service';

describe('DosificacionService', () => {
  let service: DosificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DosificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

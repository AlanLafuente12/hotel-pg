import { TestBed } from '@angular/core/testing';

import { SubirArchivoService } from './subir-archivo.service';

describe('SubirArchivoService', () => {
  let service: SubirArchivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

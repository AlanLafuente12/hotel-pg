import { TestBed } from '@angular/core/testing';

import { UsuarioOpService } from './usuario-op.service';

describe('UsuarioOpService', () => {
  let service: UsuarioOpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioOpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PdfConverterService } from './pdf-converter.service';

describe('PdfConverterService', () => {
  let service: PdfConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

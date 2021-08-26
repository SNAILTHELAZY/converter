import { TestBed } from '@angular/core/testing';

import { NumberingSystemConverterService } from './numbering-system-converter.service';

describe('NumberingSystemConverterService', () => {
  let service: NumberingSystemConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberingSystemConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { CurrenciesService } from './currencies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CurrenciesService', () => {
  let service: CurrenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HttpClient,
        },
      ],
    });
    service = TestBed.inject(CurrenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

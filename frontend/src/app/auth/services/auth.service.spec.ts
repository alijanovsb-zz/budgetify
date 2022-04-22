import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new AuthService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setSession will call it on success', (done: DoneFn) => {
    spyOn(service as any, 'setSession');
    const expected = {
      apiKey: 'apiKey',
      expiresIn: 10000,
    };
    httpClientSpy.get.and.returnValue(of(expected));
    service
      .login({ email: 'alijanov.sb@gmail.com', password: '12321' })
      .subscribe(() => {
        expect(service['setSession']).toHaveBeenCalledWith(expected);
      });
    done();
  });
});

import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpClientTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],

      providers: [
        AuthService,
        { provide: environment.api, useValue: 'http://localhost:3000' },
        { provide: '', useValue: 'http://localhost:3000' },
      ],
    });
    service = TestBed.inject(AuthService);
    httpClientTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setSession testing', (done: DoneFn) => {
    spyOn(service as any, 'setSession');

    const expectedAuthResult = {
      apiKey: 'testApiKey',
      expiresAt: 10000,
    };

    httpClientSpy.post.and.returnValue(of(expectedAuthResult));
    service
      .login({ email: 'sb@gmail.com', password: '12321' })
      .subscribe(() => {
        expect((service as any).setSession).toHaveBeenCalledOnceWith(
          expectedAuthResult
        );
        done();
      });

    const req = httpClientTestingController.expectOne({
      method: 'POST',
      url: `${environment.api}users/login`,
    });

    req.flush(expectedAuthResult);
  });

  it('error  setSession testing', (done: DoneFn) => {
    spyOn(service as any, 'setSession');

    httpClientSpy.post.and.returnValue(throwError(() => '401'));
    service.login({ email: 'sb@gmail.com', password: '12321' }).subscribe({
      error: (err) => {
        expect((service as any).setSession).not.toHaveBeenCalled();
        expect(err).toBe('401');
        done();
      },
    });
  });
});

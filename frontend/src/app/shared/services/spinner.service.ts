import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, Subject } from 'rxjs';
import { observeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isVisible$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}

  getSpinnerState$() {
    return this.isVisible$.asObservable().pipe(observeOn(asyncScheduler));
  }

  showSpinner() {
    this.isVisible$.next(true);
  }

  hideSpinner() {
    this.isVisible$.next(false);
  }
}

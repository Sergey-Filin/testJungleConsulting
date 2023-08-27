import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private get value(): number {
    const value = this.loader$.value;
    return value > 0 ? value : 0;
  }

  loader$ = new BehaviorSubject<number>(0);
  loading$: Observable<boolean> = this.loader$.asObservable().pipe(
      map(value => !!value),
      share(),
  );

  constructor() {
  }

  show(): void {
    const value = this.value + 1;
    this.loader$.next(value);
  }

  hide(): void {
    const value = this.value - 1;
    const currentValue = value > 0 ? value : 0;
    this.loader$.next(currentValue);
  }

  forceClose(): void {
    this.loader$.next(0);
  }

  destroy(): void {
    this.loader$.complete();
  }

}

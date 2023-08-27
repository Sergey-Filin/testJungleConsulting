import {OnDestroy, Directive} from '@angular/core';
import {Observable, Subject} from 'rxjs';

export interface DestroyStreamI {
  destroyStream$: Observable<void>;

  destroy(): void;
}

/**
 * @description
 * Class that provides destroy stream for subscriptions and emit value on `ngOnDestroy` lifecycle hook.
 *
 * Note: if child class implements OnDestroy call super.ngOnDestroy():
 * @usageNotes
 * ```typescript
 * ngOnDestroy() {
 *   ...
 *   super.ngOnDestroy();
 * }
 * ```
 */
@Directive()
export class DestroySubscription implements DestroyStreamI, OnDestroy {
  private readonly destroySubject$ = new Subject<void>();

  /**
   * @description
   * Stream should be used inside ["takeUntil"](https://rxjs.dev/api/operators/takeUntil) operators.
   * Note: should be the last operator inside pipe function.
   *
   * @usageNotes
   * Example of usage:
   *
   * ```typescript
   * stream$.pipe(
   *  ...
   *  takeUntil(this.destroyStream$)
   * ).subscribe();
   * ```
   *
   */
  public get destroyStream$(): Observable<void> {
    return this.destroySubject$.asObservable();
  }

  /**
   * @description
   * Method which check instance of `destroyStream$` stream end emit value and unsubscribe from them.
   */
  public destroy(): void {
    const destroy = this.destroySubject$;
    if (destroy?.isStopped) {
      return;
    }
    destroy.next();
    destroy.unsubscribe();
  }

  public ngOnDestroy(): void {
    this.destroy();
  }
}

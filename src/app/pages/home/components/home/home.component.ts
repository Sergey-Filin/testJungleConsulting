import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from "../services/home.service";
import {
  catchError,
  combineLatest,
  debounceTime, EMPTY,
  map, merge,
  Observable, of,
  share,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil, tap
} from "rxjs";
import { PaginatorData, SearchQueryParams, UserDto, UserI } from "@shared/models";
import { FormControl } from "@angular/forms";
import { DestroySubscription } from "@helpers/classes";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends DestroySubscription implements OnInit, AfterViewInit, OnDestroy {

  searchControl = new FormControl<string>('');
  usersDataList$: Observable<UserI[]>

  private readonly updateList$ = new Subject<void>();

  constructor(
    private readonly homeService: HomeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.updateForm();
    this.subscribeQueryChange();
  }

  ngAfterViewInit(): void {
    this.subscribeParamsChange();
  }

  private subscribeParamsChange() {
    this.formValueChanges().pipe(
      takeUntil(this.destroyStream$)
    ).subscribe(params => {
      this.router.navigate(['./'], {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: 'merge',
      })
    });
  }

  private formValueChanges(): Observable<any> {
    return this.searchControl.valueChanges.pipe(
      debounceTime(300),
      map((searchName: string) => ({name: encodeURIComponent(searchName)})),
    );
  }

  private subscribeQueryChange(): void {
    this.usersDataList$ = combineLatest([
      this.route.queryParams,
      this.updateList$.pipe(startWith({})),
    ]).pipe(
      map(([params, update]: [SearchQueryParams, void]) => {
        const page = +params?.page || 1;
        const size = +params?.size || 10;
        const paginator = new PaginatorData(size, page);
        const name = params?.name || null;
        return name ? new UserDto(name, paginator) : EMPTY;
      }),
      switchMap((params: UserDto | Observable<never>) => params === EMPTY ?
        this.homeService.getUsers()
        :
        this.homeService.getUser(params as UserDto)
      ),
      share(),
      shareReplay(1),
      catchError((err: HttpErrorResponse) => {
        this.searchControl.setErrors({server: err.error.message})
        this.searchControl.markAsTouched();
        return EMPTY;
      }),
      );
  }

  private updateForm(): void {
    const params = this.route.snapshot.queryParams;
    this.searchControl.patchValue(params['name'], {emitEvent: false});
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.updateList$.unsubscribe();
  }
}

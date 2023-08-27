import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DestroySubscription } from "@helpers/classes";
import { ActivatedRoute, Router } from "@angular/router";
import { EMPTY, Observable, of, switchMap, takeUntil } from "rxjs";
import { UserReposService } from "../../services/user-repos.service";
import { ReposModelI } from "@shared/models";

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserReposComponent extends DestroySubscription implements OnInit {

  userRepos$: Observable<ReposModelI[]>;

  constructor(
      private readonly router: Router,
      private readonly route: ActivatedRoute,
      private readonly userReposService: UserReposService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.userRepos$ = this.route.params.pipe(
        switchMap((params) => {
          const url = params['id'];
          if (!url) {
            this.router.navigate(['/']);
            return EMPTY;
          }
          return this.userReposService.getUserRepos(url);
        }),
        takeUntil(this.destroyStream$)
    )
  }

  openRepos(data: ReposModelI): void {
      this.userReposService.openModal(data)
  }

}

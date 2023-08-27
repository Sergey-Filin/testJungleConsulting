import { Injectable } from '@angular/core';
import { AppApiService } from "@shared/services";
import { EMPTY, Observable } from "rxjs";
import { ReposModelI } from "@shared/models";
import { OverlayService } from "@shared/modules/modal";
import {
  ReposDetailsInfoComponent
} from "../../../shared/components/repos-details-info/components/repos-details-info/repos-details-info.component";
import { OverlayCloseEvent, OverlayCloseEventType } from "@shared/modules/modal/interface/overlay-close-event";

@Injectable()
export class UserReposService {

  constructor(
      private readonly appApiService: AppApiService,
      private readonly overlayService: OverlayService
  ) { }

  getUserRepos(name: any): Observable<ReposModelI[]> {
    return this.appApiService.getUserRepos(name);
  }

  openModal(data: ReposModelI): Observable<OverlayCloseEvent<null, OverlayCloseEventType | null>> {
    return this.overlayService.open(ReposDetailsInfoComponent, data)?.afterClosed$ || EMPTY;
  }

}

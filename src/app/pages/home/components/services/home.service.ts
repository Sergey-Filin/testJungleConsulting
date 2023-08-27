import { Injectable } from '@angular/core';
import { AppApiService } from "@shared/services";
import { map, Observable } from "rxjs";
import { FoundUsersI, UserDto, UserI } from "@shared/models";

@Injectable()
export class HomeService {

  constructor(private readonly appApiService: AppApiService) { }

  getUsers(): Observable<UserI[]> {
    return this.appApiService.getUsers()
  }

  getUser(params: UserDto): Observable<UserI[]> {
    return this.appApiService.getUser(params).pipe(
      map((data: FoundUsersI) => data.items),
    )
  }
}

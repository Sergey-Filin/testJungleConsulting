import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FoundUsersI, ReposModelI, UserDto, UserI } from "@shared/models";
import { loader } from "@shared/modules/custom-loader/models/decorators";

export interface AppApiServiceI {

  getUsers(): Observable<UserI[]>;

  getUser(params: UserDto): Observable<FoundUsersI>;

  getUserRepos(params: any): Observable<ReposModelI[]>;

}

@Injectable()
export class AppApiService implements AppApiServiceI{

  private readonly apiUrl = 'api/';

  constructor(private readonly http: HttpClient) {
  }

  @loader()
  getUser(params: UserDto): Observable<FoundUsersI> {
    const {name, paginator} = params;
    const {page, size} = paginator;
    return this.http.get<FoundUsersI>(`${this.apiUrl}search/users?q=${name}&per_page=${size}&page=${page}`);
  }

  @loader()
  getUsers(): Observable<UserI[]> {
    return this.http.get<UserI[]>(`${this.apiUrl}users`);
  }

  @loader()
  getUserRepos(params: any): Observable<ReposModelI[]> {
    return this.http.get<ReposModelI[]>(`${this.apiUrl}users/${params}/repos`);
  }

}

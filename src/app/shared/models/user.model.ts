export interface FoundUsersI {
  total_count: number,
  items: UserI[]
}

export interface UserI {
  id: number;
  login: string;
  avatar_url: string;
}

export class UserDto {
  constructor(
    public readonly name: string,
    public readonly paginator: PaginatorData,
  ) {
  }
}

export class PaginatorData {
  constructor(
    public readonly size: number,
    public readonly page: number
  ) {
  }
}

export interface SearchQueryParams {
  readonly name?: string;
  readonly page?: string;
  readonly size?: string;
}

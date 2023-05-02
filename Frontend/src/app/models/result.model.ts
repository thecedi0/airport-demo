export interface Result {
  data: any[];
  page: number;
  pageSize: number;
  total: number;
  token?: string;
  success?: boolean;
  message?: boolean;
}

export interface IResult<T> {
  data: T[] | T;
  page: number;
  pageSize: number;
  total: number;
  token?: string;

  success?: boolean;
  message?: boolean;
}

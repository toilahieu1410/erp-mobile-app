export interface BaseResponse<T = object> {
  data: T;
  isSuccess: boolean;
  isFail: boolean;
  statusCode: number;
  message: string;
}

export interface ListData<T = object> {
  data: T[];
  totalPage: number;
  pageSize: number;
  pageNumber: number;
  isMore: boolean;
}

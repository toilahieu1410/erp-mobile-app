export interface BaseResponse<T = object> {
  value: T;
  isSuccess: boolean;
  isFailure: boolean;
  statusCode: number;
  error: {
    code: string;
    message: string;
  };
}

export interface BaseResponseConfirm<T = object> {
  value: {
    items: T[]
  };
  isSuccess: boolean;
  isFailure: boolean;
  statusCode: number;
  error: {
    code: string;
    message: string;
  };
}

export interface ListData<T = object> {
  value: T[];
  totalPage: number;
  pageSize: number;
  pageNumber: number;
  isMore: boolean;
}

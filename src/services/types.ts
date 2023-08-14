export interface APIResponse<T> {
  code: number;
  status: string;
  data: T;
  message: string;
}

export interface ResponsePagination<T> {
  data: T;
  pagination_data: {
    prev_cursor: string;
    next_cursor: string;
    current_records: number;
  };
}

export type APIResponsePagination<T> = APIResponse<ResponsePagination<T>>;

export interface SellerBank {
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
}

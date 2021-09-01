export interface ErrorResponse {
  errors: ErrorResponseBlock[]
};

export interface ErrorResponseBlock {
  message: string;
  field?: string;
};
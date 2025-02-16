export const HTTP_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export interface ApiResponse<T> {
  message?: string;
  code: number;
  data?: T;
}

export function getFormattedApiResponse<T>({
  message,
  code,
  data,
}: {
  message: string;
  code: number;
  data?: T;
}): ApiResponse<T> {
  return {
    message,
    code,
    data,
  };
}

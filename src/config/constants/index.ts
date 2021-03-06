export const RUN_MODE = {
  prod: 'production',
  dev: 'development',
  test: 'test',
};

export const VIETNAMESE_PHONE_REGEX = /((84[3|5|7|8|9])|(0[3|5|7|8|9]))+([0-9]{8})/;

export const HttpStatus = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  GENERIC: 500,
};

export const HttpCode = {
  SUCCESS: 'SUCCESS',
  BAD_REQUEST: 'INVALID_INPUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

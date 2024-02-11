export enum ErrorMessages {
  NOT_ROUTE = 'Route Not Found',
  NOT_REQUEST = 'Request Not Found',
  NOT_USER = 'User Not Found',
  INVALID_ID = 'User not found, invalid id',
  INVALID_BODY = 'Request does not contain required fields',
  INVALID_BODY_TYPES = 'Request does not contain required fields types',
  SOMETHING_WRONG = 'Something went wrong',
}

export const IDRegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

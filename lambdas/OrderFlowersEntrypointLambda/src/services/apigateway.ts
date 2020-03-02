
export interface IHeaders {
  [key: string]: string,
}

export function response(data: any, statusCode = 200, headers: IHeaders = {}) {
  headers['Content-Type'] = typeof data === 'string'
    ? 'text/plain'
    : 'application/json'
  return {
    "isBase64Encoded": false,
    "statusCode": statusCode,
    "headers": headers,
    "body": typeof data === 'string'
      ? data
      : JSON.stringify(data),
  };
}
import { IResponse, StringMap } from "./types";

export function response(data: any, statusCode = 200, headers: StringMap = {}): IResponse {
  headers['Content-Type'] = typeof data === 'string'
    ? 'text/plain'
    : 'application/json'
  return {
    isBase64Encoded: false,
    statusCode: statusCode,
    headers: headers,
    body: typeof data === 'string'
      ? data
      : JSON.stringify(data),
  };
};
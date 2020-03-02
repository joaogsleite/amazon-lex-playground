
export interface IContext {
  platform: 'messenger',
  language?: string,
  userId: number,
}

export interface IHeaders {
  [key: string]: string,
}

export interface IResponse {
  isBase64Encoded: boolean,
  statusCode: number,
  headers: IHeaders,
  body: string,
}

export type ListenerFunc = (event: IEvent, context: any) => Promise<IResponse>

export interface IListener {
  name: string,
  func: ListenerFunc,
}

export interface IEvent {
  path?: string,
  resource: string,
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE',
  queryStringParameters: { 
    [key: string]: string,
  },
  body: any,
}
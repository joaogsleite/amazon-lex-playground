
export interface IContext {
  platform: 'messenger',
  language?: string,
  userId: number,
}

export type IResponse = any

export type ListenerFunc = (event: IEvent, context: any) => IResponse

export interface IListener {
  name: string,
  func: Function,
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
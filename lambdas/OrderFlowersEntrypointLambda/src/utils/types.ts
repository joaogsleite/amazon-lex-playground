
export type Platform = 'messenger';

export interface IMessageContent {
  image?: string,
  url?: string,
  title?: string,
  text?: string,
  buttons?: Array<{ text: string, value: string }>,
};

export type IMessage = IMessageContent | IMessageContent[];

export interface IProfile {
  name?: string,
  locale?: string,
  gender?: string,
  timezone?: number,
};

export interface IContext {
  platform: Platform,
  languages: string[],
  userId?: number,
  profile?: IProfile,
};

export interface StringMap {
  [key: string]: string,
};

export interface IResponse {
  isBase64Encoded: boolean,
  statusCode: number,
  headers: StringMap,
  body: string,
};

export type ListenerFunc = (event: IEvent, context: any) => Promise<IResponse>;

export interface IListener {
  name: string,
  func: ListenerFunc,
};

export interface IEvent {
  path?: string,
  resource: string,
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE',
  queryStringParameters: { 
    [key: string]: string,
  },
  body: any,
};
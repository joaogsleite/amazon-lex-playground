import { IMessage } from "./types";

export function plainTextMessage (content: string): IMessage {
  return {
    contentType: 'PlainText',
    content,
  };
}
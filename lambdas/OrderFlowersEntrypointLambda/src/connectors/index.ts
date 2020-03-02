// message controller
import * as  messageController from '../messages';

// platform connectors
import * as messenger from './messenger';
import { IContext } from '../types';

export function receiveMsg(context: IContext, body: string) {
  return messageController.receiveMsg(context, body);
};

export function sendMsg(context: IContext, body: string) {
  switch(context.platform) {
    case 'messenger':
      return messenger.sendMsg(context, body);
  }
};
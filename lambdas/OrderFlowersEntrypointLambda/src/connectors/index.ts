// message controller
import * as  messageController from '../controllers/messages';

// platform connectors
import * as messenger from './messenger';

// utils
import { IContext, IMessage } from '../utils/types';

export function receiveMsg(context: IContext, msg: string) {
  return messageController.receiveMsg(context, msg);
};

export function sendMsg(context: IContext, msg: IMessage) {
  switch(context.platform) {
    case 'messenger':
      return messenger.sendMsg(context, msg);
  }
};

export function getProfile(context: IContext) {
  switch(context.platform) {
    case 'messenger':
      return messenger.getProfile(context);
  }
};
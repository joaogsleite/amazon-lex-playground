// message controller
import * as  messageController from '../controllers/messages';

// platform connectors
import * as messenger from './messenger';

// utils
import { IContext } from '../utils/types';

export function receiveMsg(context: IContext, body: string) {
  return messageController.receiveMsg(context, body);
};

export function sendMsg(context: IContext, body: string) {
  switch(context.platform) {
    case 'messenger':
      return messenger.sendMsg(context, body);
  }
};

export function getProfile(context: IContext) {
  switch(context.platform) {
    case 'messenger':
      return messenger.getProfile(context);
  }
};
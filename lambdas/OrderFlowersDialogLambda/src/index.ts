import { delegate, confirmIntent } from './dialogActions';
import { IEvent, IIntent, IResponse } from './types';
import { plainTextMessage } from './message';

function handleMessage(intent: IIntent) {
  if (intent.confirmationStatus === 'Confirmed') {
    const message = plainTextMessage('Do you want to add a gift package?');
    const nextIntent = 'GiftPackage';
    return confirmIntent(intent, message, nextIntent);
  } else {
    return delegate(intent);
  }
}

export async function handler(event: IEvent): Promise<IResponse> {
  const dialogAction = await handleMessage(event.currentIntent);
  return { dialogAction };
};
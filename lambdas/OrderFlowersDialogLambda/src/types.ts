
export interface ISlotResolution {
  value: string,
}

export interface ISlot {
  resolutions: ISlotResolution[],
  originalValue: string,
}

export interface IIntent {
  name: string,
  slots: {
    [slotName: string]: string,
  },
  slotDetails: {
    [slotName: string]: ISlot,
  },
  confirmationStatus: 'None' | 'Confirmed' | 'Denied',
}

export interface IBot {
  name: string,
  alias: string,
  version: string,
}

export interface IAttributes {
  [key: string]: string,
}

export interface IIntentSummary {
  intentName: string,
  checkpointLabel: string,
  slots: {
    [slotName: string]: string,
  },
  confirmationStatus: 'None' | 'Confirmed' | 'Denied',
  dialogActionType: 'ElicitIntent' | 'ElicitSlot' | 'ConfirmIntent' | 'Delegate' | 'Close',
  fulfillmentState: 'Fulfilled' | 'Failed',
  slotToElicit: string,
}

export interface IEvent {
  currentIntent: IIntent,
  bot: IBot,
  userId: string,
  inputTranscript: string,
  invocationSource: 'FulfillmentCodeHook' | 'DialogCodeHook',
  messageVersion: string,
  sessionAttributes: IAttributes,
  requestAttributes: IAttributes,
  recentIntentSummaryView: IIntentSummary[],
  sentimentResponse: {
    sentimentLabel: string,
    sentimentScore: string,
  }
}

export interface IMessage {
  contentType: 'PlainText' | 'SSML' | 'CustomPayload',
  content: any,
}

export type FulfillmentState = 'Fulfilled' | 'Failed'

export interface IDialogAction {
  intentName?: string,
  slotToElicit?: string,
  type: 'Delegate' | 'Close' | 'ElicitSlot' | 'ElicitIntent' | 'ConfirmIntent',
  fulfillmentState?: FulfillmentState,
  message?: IMessage,
  responseCard?: any,
  slots?: {
    [slotName: string]: string,
  }
}

export interface IResponse {
  sessionAttributes?: IAttributes,
  recentIntentSummaryView?: IIntentSummary[],
  dialogAction: IDialogAction,
}
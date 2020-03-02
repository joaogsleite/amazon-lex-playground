import { IIntent, IMessage, FulfillmentState, IDialogAction } from "./types";

export const close = (currentIntent: IIntent, message: IMessage, state: FulfillmentState) => ({
  type: "Close",
  fulfillmentState: currentIntent ? state : 'Failed',
  message,
}) as IDialogAction;

export const confirmIntent = (currentIntent: IIntent, message: IMessage, nextIntent: string) => ({
  type: 'ConfirmIntent',
  intentName: nextIntent || currentIntent.name,
  slots: nextIntent ? undefined : currentIntent.slots,
  message,
}) as IDialogAction;

export const delegate = (currentIntent: IIntent) => ({
  type: 'Delegate',
  slots: currentIntent.slots,
}) as IDialogAction;

export const elicitIntent = (currentIntent: IIntent, message: IMessage) => ({
  type: 'ElicitIntent',
  intentName: currentIntent.name,
  message,
}) as IDialogAction;

export const elicitSlot = (currentIntent: IIntent, message: IMessage, slotToElicit: string) => ({
  type: 'ElicitSlot',
  intentName: currentIntent.name,
  slots: currentIntent.slots,
  slotToElicit,
  message,
}) as IDialogAction;
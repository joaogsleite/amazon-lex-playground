// utils
import './utils/dotenv';
import { IEvent, IListener, ListenerFunc } from "./utils/types";
import { response } from './utils/apigateway';

const listeners: IListener[] = [];

export function addListener (name: string, func: ListenerFunc) {
  listeners.push({ name, func })
};

export async function handler (event: IEvent, context: any) {
  const eventName = event.path || event.resource;
  const { func } = listeners.find(({ name }) => {
    return eventName.includes(name);
  }) || {};
  if (func) {
    return await func(event, context);
  } else {
    return response({ error: 'Not found' }, 404);
  }
};

import('./connectors');
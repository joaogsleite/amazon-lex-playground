import { IEvent, IListener, ListenerFunc } from "./types";
import dotenv from 'dotenv';
import { response } from './services/apigateway';

dotenv.config();

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
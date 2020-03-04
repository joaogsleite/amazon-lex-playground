import { IContext, Platform, StringMap } from "./types";

export function mostUsedLanguage(context: IContext): string {
  return context.languages.reduce((result, current, i, array) => 
    array.filter(v => v === result).length > array.filter(v => v === current).length
      ? result
      : current
  );
};

export function toStringMap(context: IContext): StringMap {
  return {
    platform: context.platform,
    languages: JSON.stringify(context.languages || []),
    userId: (context.userId || '') + '',
  };
};

export function toContext(attributes: StringMap): IContext {
  return {
    platform: attributes.platform as Platform,
    languages: JSON.parse(attributes.languages || '[]'),
    userId: Number(attributes.userId || '0'),
  };
};

export function createContext(context: Partial<IContext>): IContext {
  return {
    platform: context.platform || 'messenger',
    languages: context.languages || [],
    userId: context.userId,
    profile: context.profile,
  };
};
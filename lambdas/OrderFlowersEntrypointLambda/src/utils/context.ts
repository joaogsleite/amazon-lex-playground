import { IContext, Platform, StringMap } from "./types";

export function mostUsedLanguage(context: IContext): string {
  console.log(`Languages: ${JSON.stringify(context.languages)}`)
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
    profile: context.profile ? JSON.stringify(context.profile) : '',
  };
};

export function toContext(attributes: StringMap): IContext {
  return {
    platform: attributes.platform as Platform,
    languages: JSON.parse(attributes.languages || '[]'),
    userId: Number(attributes.userId || '0'),
    profile: attributes.profile && JSON.parse(attributes.profile),
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
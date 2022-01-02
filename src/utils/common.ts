import { NextFunction } from 'express';

import Logger from '@src/loaders/logger';

export const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;

export function isUrlFormat(url) {
  return urlRegex.test(url);
}

export function generateRandomKey(length: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 10) {
  return Math.random()
    .toString(36)
    .substr(2, length + 2);
}

export function passErrorToNext(callback: any, next: NextFunction) {
  try {
    callback();
  } catch (e) {
    Logger.error('🔥 error: %o', e);
    return next(e);
  }
}

export async function generateAvatar(firstName: string, lastName = ''): Promise<string> {
  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;
}

export const convertDto = (dto: any, obj: any) => {
  for (const [key, value] of Object.entries(dto)) {
    obj[key] = value;
  }
};

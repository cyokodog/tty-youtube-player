import * as URL from 'url';
import * as querystring from 'querystring';

export const extractVideoId = (url: string): string => {
  const parsed = URL.parse(url);
  return querystring.parse(parsed.query).v as string;
};

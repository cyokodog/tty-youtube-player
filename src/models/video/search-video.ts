import * as puppeteer from 'puppeteer';

import { videoSiteDomain } from './definition';

const endpoint = `${videoSiteDomain}/results`;
const queryName = 'search_query';

export const searchVideo = async (page: puppeteer.Page, searchedWord: string) => {
  const param = [queryName, searchedWord.replace(/ /g, '+')].join('=');
  const url = [endpoint, '?', param].join('');
  await page.goto(url);
};

import * as puppeteer from 'puppeteer';

import { Video } from './video';
import { Videos } from './videos';

const selector = 'h3 a[href^="/watch?v="]';

export const fetchSearchedVideos = async (page: puppeteer.Page): Promise<Videos> => {
  await page.waitForSelector(selector);
  const videoList = await page.$$eval(selector, items => {
    return items.map(item => {
      const url = item.getAttribute('href');
      const title = item.getAttribute('title');
      return { title, url };
    });
  });
  const list = videoList.map(item => {
    return Video.fromUrlAndTitle(item);
  });
  return new Videos(list);
};

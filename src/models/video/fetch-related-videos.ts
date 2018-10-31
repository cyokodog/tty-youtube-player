import * as puppeteer from 'puppeteer';

import { Video } from './video';
import { Videos } from './videos';

const selector = 'a[href^="/watch?v="]';

export const fetchRelatedVideos = async (page: puppeteer.Page): Promise<Videos> => {
  await page.waitForSelector(selector);
  const videoList = await page.$$eval(selector, items => {
    return items.map(item => {
      const url = item.getAttribute('href');
      return {
        html: item.innerHTML,
        url,
      };
    });
  });

  const list = videoList
    .map(item => {
      // const title = item.html.replace(/(^.* title\=\")(.+)(\".*$)/g, '$2');
      let title;
      item.html.replace(/title\=\"(.+)\"/, (_, _title) => {
        title = _title;
        return '';
      });
      return { ...item, title };
    })
    .filter(item => {
      return !!item.title;
    })
    .map(item => {
      return Video.fromUrlAndTitle(item);
    });
  return new Videos(list);
};

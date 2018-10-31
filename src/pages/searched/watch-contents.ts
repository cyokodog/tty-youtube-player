import { SearchedPage } from './index';
import { Video } from '../../models/video/video';

const interval = 1000;

export const watchContent = async (searchedPage: SearchedPage, _lastTitle: string = '') => {
  let lastTitle = _lastTitle;
  try {
    const el = await searchedPage.page.$('h1.title');
    if (el) {
      const prop = await el.getProperty('textContent');
      const title = await prop.jsonValue();
      if (lastTitle && lastTitle !== title) {
        const url = await searchedPage.page.url();
        const video = Video.fromUrlAndTitle({ url, title });
        searchedPage.addSelectedVideoToRender(video);
      }
      lastTitle = title;
    }
  } catch (e) {}

  await searchedPage.page.evaluate(() => {
    const skipBtn = document.querySelector('button.videoAdUiSkipButton') as HTMLButtonElement;
    if (skipBtn) {
      skipBtn.click();
    }
    const ads = document.querySelector('.video-ads') as HTMLElement;
    if (ads && ads.style.display !== 'none') {
      ads.style.display = 'none';
    }
  });

  searchedPage.timeout = setTimeout(() => {
    watchContent(searchedPage, lastTitle);
  }, interval);
};

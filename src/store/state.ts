import { Page } from './definition';
import { Videos } from '../models/video/videos';
import { DownloadVideos } from '../models/video/download-videos';

class State {
  page: Page;
  searchedVideos: Videos;
  downloadVideos: DownloadVideos;

  constructor() {
    this.page = Page.Top;
    this.searchedVideos = Videos.blank();
    this.downloadVideos = DownloadVideos.blank();
  }
}
export const state = new State();

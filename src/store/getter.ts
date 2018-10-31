import { state } from './state';
import { Videos } from '../models/video/videos';
import { DownloadVideos } from '../models/video/download-videos';
import { Page } from './definition';

export const getter = {
  getSearchedVideos: (): Videos => {
    return state.searchedVideos;
  },

  getDownloadVideos: (): DownloadVideos => {
    return state.downloadVideos;
  },

  getPage: (): Page => {
    return state.page;
  },
};

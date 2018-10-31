import { Page } from './definition';
import { state } from './state';
import { Videos } from '../models/video/videos';
import { DownloadVideo } from '../models/video/download-video';
import { Video } from '../models/video/video';

export const action = {
  changePage: (page: Page) => {
    state.page = page;
  },

  changeSearchedVideos: (videos: Videos) => {
    state.searchedVideos = videos;
  },

  addDownloadVideo: (video: Video) => {
    state.downloadVideos = state.downloadVideos.add(DownloadVideo.fromVideo(video));
  },
};

import * as fs from 'fs';
import * as youtubedl from 'youtube-dl';

import { getter } from '../../store/getter';
import { DownloadVideo } from './download-video';

const interval = 3000;
const downloadPath = './download/';
const ext = '.mp4';

interface DownloaderParams {
  onChangeState: () => void;
}

export class Downloader {
  onChangeState: () => void;

  constructor(params: DownloaderParams) {
    const { onChangeState } = params;
    this.onChangeState = onChangeState;
  }

  watch() {
    const videos = getter.getDownloadVideos();
    if (videos.hasDownloadWaiting && !videos.hasDownloading) {
      this.download(videos.nextDownloadVideo);
    }
    setTimeout(() => {
      this.watch();
    }, interval);
  }

  private download(video: DownloadVideo) {
    const { url, title } = video;
    const dl = youtubedl(url, ['--format=18'], {});
    dl.on('end', () => {
      video.changeDownloadedState();
      this.onChangeState();
    });
    video.changeDownloadingState();
    this.onChangeState();
    dl.pipe(fs.createWriteStream(downloadPath + title + ext));
  }
}

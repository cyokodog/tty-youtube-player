import { BaseEntities } from '../base/entity/Entities';
import { DownloadVideo } from './download-video';

export class DownloadVideos extends BaseEntities<DownloadVideo> {
  static blank(): DownloadVideos {
    return new DownloadVideos([]);
  }

  get hasDownloadWaiting(): boolean {
    return this.list.some(item => {
      return item.isDownloadWaiting;
    });
  }

  get hasDownloading(): boolean {
    return this.list.some(item => {
      return item.isDownloading;
    });
  }

  get nextDownloadVideo(): DownloadVideo {
    return this.list.find(video => {
      return video.isDownloadWaiting;
    });
  }

  add(video: DownloadVideo): DownloadVideos {
    return new DownloadVideos([...this.list, video]);
  }
}

import { Video } from './video';

enum DownloadState {
  Wait,
  Now,
  Completed,
}

export class DownloadVideo extends Video {
  static fromVideo(video: Video): DownloadVideo {
    const { videoId, title, url } = video;
    return new DownloadVideo({ id: videoId, title, url });
  }

  private state: DownloadState = DownloadState.Wait;

  constructor(params) {
    super(params);
  }

  get isDownloadWaiting(): boolean {
    return this.state === DownloadState.Wait;
  }

  get isDownloaded(): boolean {
    return this.state === DownloadState.Completed;
  }

  get isDownloading(): boolean {
    return this.state === DownloadState.Now;
  }

  changeDownloadingState() {
    this.state = DownloadState.Now;
  }

  changeDownloadedState() {
    this.state = DownloadState.Completed;
  }
}

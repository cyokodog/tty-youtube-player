import { BaseEntity } from '../base/entity/Entity';
import { justifyYouTubeUrl } from './justify-youtube-url';
import { extractVideoId } from './extract-video-id';

interface AdaptedVideo {
  id: string;
  title: string;
  url: string;
}

export class Video extends BaseEntity<string> {
  static fromUrlAndTitle(params: { url: string; title: string }) {
    const id = extractVideoId(params.url);
    return new Video({ ...params, id });
  }

  private justifiedUrl: string;

  constructor(protected item: AdaptedVideo) {
    super(item.id);
    this.justifiedUrl = justifyYouTubeUrl(this.item.url);
  }

  get videoId(): string {
    return this.item.id;
  }

  get title(): string {
    return this.item.title;
  }

  get url(): string {
    return this.justifiedUrl;
  }

  equal(video: Video) {
    return this.title === video.title;
  }
}

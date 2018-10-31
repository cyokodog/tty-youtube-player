import { BaseEntities } from '../base/entity/Entities';
import { Video } from './video';

export class Videos extends BaseEntities<Video> {
  static blank(): Videos {
    return new Videos([]);
  }

  pointedIndex: number = 0;
  selectedIndex: number;

  constructor(list: Video[]) {
    super(list);
  }

  get selectedVideo(): Video {
    return this.list[this.selectedIndex];
  }

  prev() {
    if (this.pointedIndex <= 0) {
      return;
    }
    this.pointedIndex--;
  }

  next() {
    if (this.pointedIndex >= this.count - 1) {
      return;
    }
    this.pointedIndex++;
  }

  select() {
    this.selectedIndex = this.pointedIndex;
  }

  addSelectedVideo(video: Video): Videos {
    const videos = new Videos([...this.list, video]);
    videos.selectedIndex = videos.count - 1;
    videos.pointedIndex = videos.count - 1;
    return videos;
  }
}

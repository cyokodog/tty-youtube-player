import { BasePage } from '../../models/base/page';
import { KeyPressObject } from '../../lib/key-controller';
import { getter } from '../../store/getter';
import { action } from '../../store/action';
import { fetchRelatedVideos } from '../../models/video/fetch-related-videos';
import { Videos } from '../../models/video/videos';
import { Video } from '../../models/video/video';
import { cancelWatching } from './cancel-watching';
import { watchContent } from './watch-contents';
import { HeaderUi } from '../../component/header';
import { styles } from '../../style';

const shortCutKeys: string[] = [
  'n', // 次の曲
  'p', // 前の曲(プレイリストの場合のみ)
  'j', // 巻き戻し
  'k', // 早送り
  'l', // 一時停止・再生
];

export class SearchedPage extends BasePage {
  timeout: NodeJS.Timeout;

  private videos: Videos;

  render() {
    const { color, bgColor, focusColor, selectedBgColor, naviColor } = styles;

    this.inputOff();
    this.baseColors(color, bgColor);
    this.clear();
    HeaderUi.get(this).render();
    this.videos = getter.getSearchedVideos();
    if (this.videos.count === 0) {
      this.println('Please to search for videos.', naviColor);
      return;
    }
    this.videos.toArray().map((video, i) => {
      const isPointed = i === this.videos.pointedIndex;
      const isSelected = i === this.videos.selectedIndex;
      this.println(
        video.title,
        isPointed && !isSelected ? focusColor : null,
        isSelected ? selectedBgColor : null,
      );
    });
  }

  async addSelectedVideoToRender(video: Video) {
    const videos = await fetchRelatedVideos(this.page);
    action.changeSearchedVideos(videos.addSelectedVideo(video));
    this.render();
  }

  async onKeyPress(_, key: KeyPressObject) {
    if (key.name === 'left' && key.shift) {
      this.router.toTopPage();
    }
    if (key.name === 'right' && key.shift) {
      this.router.toDownloadPage();
    }
    if (shortCutKeys.includes(key.name)) {
      await this.page.keyboard.down('Shift');
      await this.page.keyboard.down(key.name);
    }

    if (key.name === 'up') {
      this.videos.prev();
      this.render();
    }
    if (key.name === 'down') {
      this.videos.next();
      this.render();
    }
    if (key.name === 'return') {
      this.videos.select();
      this.render();

      cancelWatching(this.timeout);

      await this.changeUrl(this.videos.selectedVideo.url);
      await this.sleep(3000);

      this.addSelectedVideoToRender(this.videos.selectedVideo);
      await watchContent(this);
    }

    if (key.name === 'd' && key.shift) {
      action.addDownloadVideo(this.videos.selectedVideo);
      this.router.toDownloadPage();
    }
  }

  onInput() {}
}

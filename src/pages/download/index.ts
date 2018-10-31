import { BasePage } from '../../models/base/page';
import { KeyPressObject } from '../../lib/key-controller';
import { getter } from '../../store/getter';
import { HeaderUi } from '../../component/header';
import { styles } from '../../style';

export class DownloadPage extends BasePage {
  render() {
    const { color, bgColor, naviColor, disabledColor, selectedBgColor } = styles;

    this.inputOff();
    this.baseColors(color, bgColor);
    this.clear();
    HeaderUi.get(this).render();

    const videos = getter.getDownloadVideos();
    if (videos.count === 0) {
      this.println('There are no download videos.', naviColor);
      return;
    }

    videos.toArray().forEach(video => {
      this.println(
        video.title,
        video.isDownloadWaiting ? disabledColor : null,
        video.isDownloading ? selectedBgColor : null,
      );
    });
  }

  onKeyPress(_, key: KeyPressObject) {
    if (key.name === 'left' && key.shift) {
      this.router.toSearchedPage();
    }
  }

  async onInput() {}
}

import { BasePage, BasePageParams } from '../../models/base/page';
import { action } from '../../store/action';
import { searchVideo } from '../../models/video/search-video';
import { fetchSearchedVideos } from '../../models/video/fetch-searched-videos';
import { KeyPressObject } from '../../lib/key-controller';
import { HeaderUi } from '../../component/header';

export class TopPage extends BasePage {
  constructor(params: BasePageParams) {
    super(params);
  }

  render() {
    this.inputOff();
    this.baseColors(117, 'black');
    this.clear();
    HeaderUi.get(this).render();
    this.println('Please enter search word.', 241);
    this.inputOn();
  }
  async onKeyPress(_, key: KeyPressObject) {
    if (key.name === 'right' && key.shift) {
      this.router.toSearchedPage();
    }
  }

  async onInput(searchWord: string) {
    if (!searchWord) {
      return;
    }
    await searchVideo(this.page, searchWord);
    const videos = await fetchSearchedVideos(this.page);
    action.changeSearchedVideos(videos);
    this.router.toSearchedPage();
  }
}

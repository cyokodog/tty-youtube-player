import { TopPage } from '../pages/top/index';
import { BrowserObject } from '../lib/get-browser-object';
import { Page } from '../store/definition';
import { KeyController } from '../lib/key-controller';
import { DownloadPage } from '../pages/download';
import { BasePageParams, BasePage } from '../models/base/page';
import { SearchedPage } from '../pages/searched';
import { action } from '../store/action';
import { Downloader } from '../models/video/downloader';
import { getter } from '../store/getter';

interface RouterParams {
  browserObject: BrowserObject;
  keyController: KeyController;
}

export class Router {
  static create(routerParams: RouterParams) {
    return new Router(routerParams);
  }

  browserObject: BrowserObject;
  keyController: KeyController;

  private topPage: TopPage;
  private searchedPage: SearchedPage;
  private downloadPage: DownloadPage;
  private download: Downloader;

  private constructor(routerParams: RouterParams) {
    const { browserObject, keyController } = routerParams;
    this.browserObject = browserObject;
    this.keyController = keyController;

    const { page } = browserObject;

    const pageParams: BasePageParams = { router: this, keyController, page };
    this.topPage = new TopPage(pageParams);
    this.searchedPage = new SearchedPage(pageParams);
    this.downloadPage = new DownloadPage(pageParams);

    this.download = new Downloader({
      onChangeState: () => {
        if (getter.getPage() === Page.Download) {
          this.downloadPage.render();
        }
      },
    });
    this.download.watch();
  }

  private changePage(page: Page, targetPage: BasePage) {
    action.changePage(page);
    this.keyController.setTargetPage(targetPage);
    targetPage.render();
  }

  toTopPage() {
    this.changePage(Page.Top, this.topPage);
  }

  toSearchedPage() {
    this.changePage(Page.Searched, this.searchedPage);
  }

  toDownloadPage() {
    this.changePage(Page.Download, this.downloadPage);
  }
}

import { TopPage } from '../pages/top/index';
import { state } from '../store/state';
import { BrowserObject } from '../lib/get-browser-object';
import { Page } from '../store/definition';
import { KeyController } from '../lib/key-controller';
import { PlayerPage } from '../pages/player';

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
  private playerPage: PlayerPage;

  private constructor(routerParams: RouterParams) {
    const { browserObject, keyController } = routerParams;
    this.browserObject = browserObject;
    this.keyController = keyController;

    const pageParams = { router: this, keyController };
    this.topPage = TopPage.create(pageParams);
    this.playerPage = PlayerPage.create(pageParams);
  }

  toTopPage() {
    state.page = Page.Top;
    this.keyController.setTargetPage(this.topPage);
    this.topPage.clear();
    this.topPage.render();
  }

  toPlayerPage() {
    state.page = Page.Player;
    this.keyController.setTargetPage(this.playerPage);
    this.playerPage.clear();
    this.playerPage.render();
  }
}

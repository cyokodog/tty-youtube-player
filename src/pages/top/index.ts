import { BasePage } from '../../models/base/page';
import { Router } from '../../router';
import { KeyPressObject, KeyController } from '../../lib/key-controller';

interface TopPageParams {
  router: Router;
  keyController: KeyController;
}

export class TopPage extends BasePage {
  static create(params: TopPageParams): TopPage {
    return new TopPage(params);
  }

  constructor(params: TopPageParams) {
    const { router, keyController } = params;
    super({ router, keyController });
  }

  render() {
    this.write('Input search word');
    this.inputOn();
  }

  keyPress(_: any, key: KeyPressObject) {
    if (key.name === 'up') {
      this.router.toPlayerPage();
    }
  }
}

import { BasePage } from '../../models/base/page';
import { Router } from '../../router/index';
import { KeyPressObject, KeyController } from '../../lib/key-controller';

interface PlayerPageParams {
  router: Router;
  keyController: KeyController;
}

export class PlayerPage extends BasePage {
  static create(params: PlayerPageParams): PlayerPage {
    return new PlayerPage(params);
  }

  constructor(params: PlayerPageParams) {
    const { router, keyController } = params;
    super({ router, keyController });
  }

  render() {
    this.write('player');
  }

  keyPress(_, key: KeyPressObject) {
    console.log('hello player', key, typeof this.router);
  }
}

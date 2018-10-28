import { KeyPressObject, KeyController } from '../../lib/key-controller';
import { Router } from '../../router/index';

interface BasePageParams {
  router: Router;
  keyController: KeyController;
}

export class BasePage {
  static create(params: BasePageParams): BasePage {
    return new BasePage(params);
  }

  router: Router;
  private keyController: KeyController;

  constructor(params: BasePageParams) {
    const { router, keyController } = params;
    this.router = router;
    this.keyController = keyController;
  }

  clear() {
    process.stdout.write('\x1b[2J');
    process.stdout.write('\x1b[0f');
  }

  write(text: string) {
    console.log(text);
    process.stdout.write(text);
  }

  keyPress(str: string, key: KeyPressObject) {
    console.log('keyPress', str, key);
  }

  inputOn() {
    this.keyController.inputOn();
  }

  inputOff() {
    this.keyController.inputOff();
  }
}

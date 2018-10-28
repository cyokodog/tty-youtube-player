import * as readline from 'readline';
import * as MuteStream from 'mute-stream';

import { BasePage } from '../models/base/page';

export interface KeyPressObject {
  sequence: string;
  name: string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  code: string;
}

export class KeyController {
  static create(): KeyController {
    return new KeyController();
  }

  private targetPage: BasePage;
  private _onPressQuitKey: () => void;
  private _readline: readline.ReadLine;

  constructor() {
    const output = new MuteStream();
    output.pipe(process.stdout);
    this._readline = readline.createInterface({
      terminal: true,
      input: process.stdin,
      output,
    });
    this.inputOff();

    process.stdin.on('keypress', async (str: string, key: KeyPressObject) => {
      if (key.sequence === '\u0003') {
        if (this._onPressQuitKey) {
          this._onPressQuitKey();
        }
      }

      if (!this.targetPage) {
        return;
      }
      this.targetPage.keyPress(str, key);
    });
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
  }

  get readline(): readline.ReadLine {
    return this._readline;
  }

  inputOn() {
    this._readline['output'].unmute();
  }

  inputOff() {
    this._readline['output'].mute();
  }

  setTargetPage(targetPage: BasePage) {
    this.targetPage = targetPage;
  }

  onPressQuitKey(f: () => void) {
    this._onPressQuitKey = f;
  }
}

import * as puppeteer from 'puppeteer';
import * as Charm from 'charm';

import { KeyPressObject, KeyController } from '../../lib/key-controller';
import { Router } from '../../router/index';

const charm = Charm(process.stdout);

export interface BasePageParams {
  router: Router;
  page: puppeteer.Page;
  keyController: KeyController;
}

export abstract class BasePage {
  private _router: Router;
  private _page: puppeteer.Page;
  private _keyController: KeyController;
  private baseColor: string | number = null;
  private baseBgColor: string | number = null;

  constructor(params: BasePageParams) {
    const { router, page, keyController } = params;
    this._router = router;
    this._page = page;
    this._keyController = keyController;
  }

  get router(): Router {
    return this._router;
  }

  get page(): puppeteer.Page {
    return this._page;
  }

  get keyController(): KeyController {
    return this._keyController;
  }

  private resetBaseColors() {
    this.colors(this.baseColor, this.baseBgColor);
  }

  private write(text: string) {
    process.stdout.write(text);
  }

  clear() {
    process.stdout.write('\x1b[2J');
    process.stdout.write('\x1b[0f\n');
    this.position(0, 0);
  }

  print(text: string, color: string | number = null, bgColor: string | number = null) {
    this.colors(color, bgColor);
    process.stdout.write(text);
    this.resetBaseColors();
  }

  prints(params: [string, string | number, string | number][]) {
    params.forEach(items => {
      const [text, color, bgColor] = items;
      this.print(text, color, bgColor);
    });
  }

  println(text: string, color: string | number = null, bgColor: string | number = null) {
    this.print(text, color, bgColor);
    this.ln();
  }

  printsln(params: [string, string | number, string | number][]) {
    this.prints(params);
    this.ln();
  }

  ln() {
    this.write('\n');
  }

  render() {}

  onKeyPress(value: string, key: KeyPressObject) {
    console.log('keyPress', value, key);
  }

  onInput(value: string) {
    console.log('value', value);
  }

  inputOn() {
    this._keyController.inputOn();
  }

  inputOff() {
    this._keyController.inputOff();
  }

  changeUrl(url: string): Promise<puppeteer.Response> {
    return this.page.goto(url);
  }

  sleep(ms: number): Promise<void> {
    return this.page.waitFor(ms);
  }

  baseColors(color: string | number, bgColor: string | number) {
    this.baseColor = color;
    this.baseBgColor = bgColor;
    this.colors(color, bgColor);
  }

  colors(color: string | number, bgColor: string | number) {
    if (color !== null) {
      this.color(color);
    }
    if (bgColor !== null) {
      this.bgColor(bgColor);
    }
  }

  color(color: string | number) {
    charm.foreground(color);
  }

  bgColor(bgColor: string | number) {
    charm.background(bgColor);
  }

  position(x: number, y: number) {
    charm.position(x, y);
  }
}

import { BasePage, BasePageParams } from '../../models/base/page';
import { TopPage } from '../../pages/top';
import { SearchedPage } from '../../pages/searched/index';
import { styles } from '../../style';

export class HeaderUi extends BasePage {
  static get(fromPage: BasePage) {
    const { router, page, keyController } = fromPage;
    return new HeaderUi({ router, page, keyController }, fromPage);
  }

  private fromPage: BasePage;

  constructor(params: BasePageParams, fromPage: BasePage) {
    super(params);
    this.fromPage = fromPage;
  }

  render() {
    const { color, bgColor, tabColor, tabBgColor, tabSelectedBgColor } = styles;

    this.baseColors(color, bgColor);

    const selectedIndex =
      this.fromPage instanceof TopPage ? 0 : this.fromPage instanceof SearchedPage ? 1 : 2;

    const tabBaseSettings = [' YouTube ', ' Play ', ' Download ', ' Help '];

    const tabSettings = tabBaseSettings.map((label, index) => {
      if (selectedIndex === index) {
        return [label, tabColor, tabSelectedBgColor];
      }
      return [label, tabColor, tabBgColor];
    }) as [string, string, string][];

    this.printsln(tabSettings);
    this.ln();
  }
}

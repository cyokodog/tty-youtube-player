import { Router } from './router';
import { fetchBrowserObject } from './lib/get-browser-object';
import { KeyController } from './lib/key-controller';

fetchBrowserObject().then(browserObject => {
  const keyController = KeyController.create();
  keyController.onPressQuitKey(async () => {
    await browserObject.browser.close();
    process.exit();
  });

  const router = Router.create({ browserObject, keyController });
  router.toTopPage();
});

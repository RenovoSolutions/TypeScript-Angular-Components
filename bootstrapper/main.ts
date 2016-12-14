import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';

import { ComponentsBootstrapperModule, moduleName } from './app';

platformBrowserDynamic().bootstrapModule(ComponentsBootstrapperModule).then(platformRef => {
	const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
	upgrade.bootstrap(document.documentElement, [moduleName]);
});

import { Provider, provide, ExceptionHandler, PipeTransform } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';

import * as angular from 'angular';

import { services, downgrade } from 'typescript-angular-utilities';

import { BusyComponent } from './components/busy/busy';
import {
	ButtonComponent,
	ButtonAsyncComponent,
	ButtonLinkComponent,
	ButtonLongClickComponent,
	ButtonSubmitComponent,
	ButtonToggleComponent,
} from './components/buttons/index';
import { CheckboxComponent, TextboxComponent } from './components/inputs/index';
import { CommaListComponent } from './components/commaList/commaList';
import { FormComponent } from './components/form/form';

import { ColumnSearchFilter } from './components/cardContainer/filters/columnSearchFilter/columnSearchFilter.service';

import { DatePipe } from './filters/date/date.filter';

import { FormService } from './services/form/form.service';

import { defaultThemeToken, defaultThemeValueName, DEFAULT_THEME_PROVIDER } from './components/componentsDefaultTheme';

export const moduleName: string = 'rl.components.downgrade';

export const columnSearchFilterName: string = 'columnSearchFilter';

const componentsDowngradeModule = angular.module(moduleName, []);

export function downgradeComponentsToAngular1(upgradeAdapter: UpgradeAdapter) {
	const columnSearchFactoryProvider: Provider = new Provider(ColumnSearchFilter, {
		useValue: new ColumnSearchFilter(services.object.objectUtility, services.string.stringUtility, services.transform.transform),
	});

	upgradeAdapter.addProvider(DEFAULT_THEME_PROVIDER);
	upgradeAdapter.addProvider(FormService);
	upgradeAdapter.addProvider(columnSearchFactoryProvider);

	componentsDowngradeModule.value(defaultThemeValueName, defaultThemeToken);

	componentsDowngradeModule.filter('rlDate', downgrade.PipeDowngrader(new DatePipe(services.object.objectUtility)));

	componentsDowngradeModule.directive('rlBusyNg', <any>upgradeAdapter.downgradeNg2Component(BusyComponent));
	componentsDowngradeModule.directive('rlButtonNg', <any>upgradeAdapter.downgradeNg2Component(ButtonComponent));
	componentsDowngradeModule.directive('rlButtonAsyncNg', <any>upgradeAdapter.downgradeNg2Component(ButtonAsyncComponent));
	componentsDowngradeModule.directive('rlButtonLinkNg', <any>upgradeAdapter.downgradeNg2Component(ButtonLinkComponent));
	componentsDowngradeModule.directive('rlButtonLongClickNg', <any>upgradeAdapter.downgradeNg2Component(ButtonLongClickComponent));
	componentsDowngradeModule.directive('rlButtonSubmitNg', <any>upgradeAdapter.downgradeNg2Component(ButtonSubmitComponent));
	componentsDowngradeModule.directive('rlButtonToggleNg', <any>upgradeAdapter.downgradeNg2Component(ButtonToggleComponent));
	componentsDowngradeModule.directive('rlCheckboxNg', <any>upgradeAdapter.downgradeNg2Component(CheckboxComponent));
	componentsDowngradeModule.directive('rlCommaListNg', <any>upgradeAdapter.downgradeNg2Component(CommaListComponent));
	componentsDowngradeModule.directive('rlFormNg', <any>upgradeAdapter.downgradeNg2Component(FormComponent));
	componentsDowngradeModule.directive('rlTextboxNg', <any>upgradeAdapter.downgradeNg2Component(TextboxComponent));

	componentsDowngradeModule.factory(columnSearchFilterName, upgradeAdapter.downgradeNg2Provider(ColumnSearchFilter));
}

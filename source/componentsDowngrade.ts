import { Provider, provide, ExceptionHandler, PipeTransform, Injector } from '@angular/core';
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
import { StringWithWatermarkComponent } from './components/stringWithWatermark/stringWithWatermark';

import { CardContainerBuilder, DataSourceBuilder, FilterBuilder } from './components/cardContainer/builder/index';
import { ColumnSearchFilter } from './components/cardContainer/filters/columnSearchFilter/columnSearchFilter.service';
import { DataPager } from './components/cardContainer/paging/index';
import { Sorter } from './components/cardContainer/sorts/sorter/sorter.service';
import { MergeSort } from './components/cardContainer/sorts/mergeSort/mergeSort.service';

import { DatePipe } from './filters/date/date.filter';

import { FormService } from './services/form/form.service';

import { defaultThemeToken, defaultThemeValueName, DEFAULT_THEME_PROVIDER } from './components/componentsDefaultTheme';

export const moduleName: string = 'rl.components.downgrade';

export const cardContainerBuilderServiceName: string = 'rlCardContainerBuilder';
export const dataPagerFactoryName: string = 'rlDataPagerFactory';
export const columnSearchFilterName: string = 'columnSearchFilter';
export const sorterServiceName: string = 'rlSorterService';

const componentsDowngradeModule = angular.module(moduleName, []);

export function downgradeComponentsToAngular1(upgradeAdapter: UpgradeAdapter) {
	upgradeAdapter.addProvider(Injector);
	upgradeAdapter.addProvider(DataSourceBuilder);
	upgradeAdapter.addProvider(FilterBuilder);

	const cardContainerBuilderFactoryProvider: Provider = new Provider(CardContainerBuilder, {
		deps: [Injector, DataSourceBuilder, FilterBuilder],
		useFactory: (injector: Injector, dataSourceBuilder: DataSourceBuilder, filterBuilder: FilterBuilder) => {
			return {
				getInstance: () => new CardContainerBuilder(injector, dataSourceBuilder, filterBuilder),
			};
		},
	});
	const dataPagerFactoryProvider: Provider = new Provider(DataPager, {
		useValue: {
			getInstance: () => new DataPager(),
		},
	});
	const columnSearchFactoryProvider: Provider = new Provider(ColumnSearchFilter, {
		useValue: {
			getInstance: () => new ColumnSearchFilter(services.object.objectUtility, services.string.stringUtility, services.transform.transform),
		},
	});

	upgradeAdapter.addProvider(DEFAULT_THEME_PROVIDER);
	upgradeAdapter.addProvider(FormService);
	upgradeAdapter.addProvider(dataPagerFactoryProvider);
	upgradeAdapter.addProvider(columnSearchFactoryProvider);
	upgradeAdapter.addProvider(Sorter);
	upgradeAdapter.addProvider(MergeSort);
	upgradeAdapter.addProvider(cardContainerBuilderFactoryProvider);

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
	componentsDowngradeModule.directive('rlStringWithWatermarkNg', <any>upgradeAdapter.downgradeNg2Component(StringWithWatermarkComponent));

	componentsDowngradeModule.factory(cardContainerBuilderServiceName, upgradeAdapter.downgradeNg2Provider(CardContainerBuilder));
	componentsDowngradeModule.factory(dataPagerFactoryName, upgradeAdapter.downgradeNg2Provider(DataPager));
	componentsDowngradeModule.factory(columnSearchFilterName, upgradeAdapter.downgradeNg2Provider(ColumnSearchFilter));
	componentsDowngradeModule.factory(sorterServiceName, upgradeAdapter.downgradeNg2Provider(Sorter));
}

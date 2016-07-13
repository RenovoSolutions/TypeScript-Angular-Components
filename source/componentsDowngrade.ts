import { Provider, provide, ExceptionHandler, PipeTransform, Injector } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';

import * as angular from 'angular';

import { services, downgrade } from 'typescript-angular-utilities';

import { AbsoluteTimeComponent } from './components/inputs/absoluteTime/absoluteTime';
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
import { DialogRootService } from './components/dialog/dialogRoot.service';
import { FormComponent } from './components/form/form';
import { StringWithWatermarkComponent } from './components/stringWithWatermark/stringWithWatermark';

import { CardContainerBuilder, DataSourceBuilder, FilterBuilder } from './components/cardContainer/builder/index';
import { ColumnSearchFilter } from './components/cardContainer/filters/columnSearchFilter/columnSearchFilter.service';
import { DataPager } from './components/cardContainer/paging/index';
import { Sorter } from './components/cardContainer/sorts/sorter/sorter.service';
import { MergeSort } from './components/cardContainer/sorts/mergeSort/mergeSort.service';

import { DatePipe } from './pipes/date/date.pipe';
import { LocalizeStringDatesPipe } from './pipes/localizeStringDates/localizeStringDates.pipe';

import { AsyncHelper } from './services/async/async.service';
import { DocumentService } from './services/documentWrapper/documentWrapper.service';
import { FormService } from './services/form/form.service';
import { JQUERY_PROVIDER } from './services/jquery/jquery.provider';
import { WindowService } from './services/windowWrapper/windowWrapper.service';

import { BreakpointService, VisibleBreakpointService, visibleBreakpointServiceName } from './services/breakpoints/index';

import { defaultThemeToken, defaultThemeValueName, DEFAULT_THEME_PROVIDER } from './components/componentsDefaultTheme';

export { visibleBreakpointServiceName };

export const moduleName: string = 'rl.components.downgrade';

export const cardContainerBuilderServiceName: string = 'rlCardContainerBuilder';
export const dataPagerFactoryName: string = 'rlDataPagerFactory';
export const documentServiceName: string = 'documentWrapper';
export const columnSearchFilterName: string = 'columnSearchFilter';
export const sorterServiceName: string = 'rlSorterService';
export const windowServiceName: string = 'windowWrapper';

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

	upgradeAdapter.addProvider(AsyncHelper);
	upgradeAdapter.addProvider(DEFAULT_THEME_PROVIDER);
	upgradeAdapter.addProvider(DialogRootService);
	upgradeAdapter.addProvider(FormService);
	upgradeAdapter.addProvider(DocumentService);
	upgradeAdapter.addProvider(BreakpointService);
	upgradeAdapter.addProvider(VisibleBreakpointService);
	upgradeAdapter.addProvider(JQUERY_PROVIDER);
	upgradeAdapter.addProvider(WindowService);
	upgradeAdapter.addProvider(dataPagerFactoryProvider);
	upgradeAdapter.addProvider(columnSearchFactoryProvider);
	upgradeAdapter.addProvider(Sorter);
	upgradeAdapter.addProvider(MergeSort);
	upgradeAdapter.addProvider(cardContainerBuilderFactoryProvider);

	componentsDowngradeModule.value(defaultThemeValueName, upgradeAdapter.downgradeNg2Provider(defaultThemeToken));

	componentsDowngradeModule.filter('rlDate', downgrade.PipeDowngrader(new DatePipe(services.object.objectUtility)));
	componentsDowngradeModule.filter('rlLocalizeStringDates', downgrade.PipeDowngrader(new LocalizeStringDatesPipe(services.timezone.timezoneService)));

	componentsDowngradeModule.directive('rlAbsoluteTime', <any>upgradeAdapter.downgradeNg2Component(AbsoluteTimeComponent));
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
	componentsDowngradeModule.factory(documentServiceName, upgradeAdapter.downgradeNg2Provider(DocumentService));
	componentsDowngradeModule.factory(visibleBreakpointServiceName, upgradeAdapter.downgradeNg2Provider(VisibleBreakpointService));
	componentsDowngradeModule.factory(windowServiceName, upgradeAdapter.downgradeNg2Provider(WindowService));
}

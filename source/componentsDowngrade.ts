import { PipeTransform, Injector } from '@angular/core';
import { downgradeInjectable } from '@angular/upgrade/static';

import * as angular from 'angular';

import { services, downgrade } from 'typescript-angular-utilities';

import { AbsoluteTimeComponent } from './components/inputs/absoluteTime/absoluteTime';
import { BusyComponent } from './components/busy/busy';
import {
	ButtonComponent,
	ButtonAsyncComponent,
	ButtonLinkComponent,
	ButtonLongClickComponent,
	ButtonRouteComponent,
	ButtonSubmitComponent,
	ButtonToggleComponent,
} from './components/buttons/index';
import { CheckboxComponent, TextboxComponent } from './components/inputs/index';
import { CommaListComponent } from './components/commaList/commaList';
import { DialogOutletComponent } from './components/dialog/dialogOutlet';
import { FormComponent } from './components/form/form';
import { StringWithWatermarkComponent } from './components/stringWithWatermark/stringWithWatermark';

import { ColumnSearchFilter } from './components/cardContainer/filters/columnSearchFilter/columnSearchFilter.service';
import { DataPagerOld } from './components/cardContainer/paging/index';
import { Sorter } from './components/cardContainer/sorts/sorter/sorter.service';

import { IsEmptyPipe } from './pipes/isEmpty/isEmpty.pipe';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';
import { DatePipe } from './pipes/date/date.pipe';
import { LocalizeStringDatesPipe } from './pipes/localizeStringDates/localizeStringDates.pipe';

import { AutosaveActionService } from './services/autosaveAction/autosaveAction.service';
import { DocumentService } from './services/documentWrapper/documentWrapper.service';
import { WindowService } from './services/windowWrapper/windowWrapper.service';

import { BreakpointService, VisibleBreakpointService, visibleBreakpointServiceName } from './services/breakpoints/index';

import { DefaultTheme, defaultThemeValueName } from './components/componentsDefaultTheme';

export { visibleBreakpointServiceName };

export const moduleName: string = 'rl.components.downgrade';

export const autosaveActionServiceName: string = 'autosaveAction';
export const cardContainerBuilderServiceName: string = 'rlCardContainerBuilder';
export const dataPagerFactoryName: string = 'rlDataPagerFactory';
export const documentServiceName: string = 'documentWrapper';
export const columnSearchFilterName: string = 'columnSearchFilter';
export const sorterServiceName: string = 'rlSorterService';
export const windowServiceName: string = 'windowWrapper';

export function PipeDowngrader(pipe: PipeTransform) {
	// factory that returns a filter
	return () => (value: any, ...args: any[]): any => {
		return pipe.transform(value, ...args);
	};
}

angular.module(moduleName, [])
	   .value(defaultThemeValueName, downgradeInjectable('defaultThemeNg1'))

	   .filter('isEmpty', PipeDowngrader(new IsEmptyPipe(services.object.objectUtility)))
	   .filter('truncate', PipeDowngrader(new TruncatePipe(services.object.objectUtility)))
	   .filter('rlDate', PipeDowngrader(new DatePipe(services.object.objectUtility)))
	   .filter('rlLocalizeStringDates', PipeDowngrader(new LocalizeStringDatesPipe(<any>services.timezone.timezoneService)))

	//    .directive('rlAbsoluteTime', <any>downgradeInjectable(AbsoluteTimeComponent))
	//    .directive('rlBusyNg', <any>downgradeInjectable(BusyComponent))
	//    .directive('rlButtonNg', <any>downgradeInjectable(ButtonComponent))
	//    .directive('rlButtonAsyncNg', <any>downgradeInjectable(ButtonAsyncComponent))
	//    .directive('rlButtonLinkNg', <any>downgradeInjectable(ButtonLinkComponent))
	//    .directive('rlButtonLongClickNg', <any>downgradeInjectable(ButtonLongClickComponent))
	//    .directive('rlButtonRouteNg', <any>downgradeInjectable(ButtonRouteComponent))
	//    .directive('rlButtonSubmitNg', <any>downgradeInjectable(ButtonSubmitComponent))
	//    .directive('rlButtonToggleNg', <any>downgradeInjectable(ButtonToggleComponent))
	//    .directive('rlCheckboxNg', <any>downgradeInjectable(CheckboxComponent))
	//    .directive('rlCommaListNg', <any>downgradeInjectable(CommaListComponent))
	//    .directive('rlDialogOutlet', <any>downgradeInjectable(DialogOutletComponent))
	//    .directive('rlFormNg', <any>downgradeInjectable(FormComponent))
	//    .directive('rlTextboxNg', <any>downgradeInjectable(TextboxComponent))
	//    .directive('rlStringWithWatermarkNg', <any>downgradeInjectable(StringWithWatermarkComponent))

	   .factory(autosaveActionServiceName, downgradeInjectable(AutosaveActionService))
	   .factory(cardContainerBuilderServiceName, downgradeInjectable(cardContainerBuilderServiceName))
	   .factory(dataPagerFactoryName, downgradeInjectable(DataPagerOld))
	   .factory(columnSearchFilterName, downgradeInjectable(ColumnSearchFilter))
	   .factory(sorterServiceName, downgradeInjectable(Sorter))
	   .factory(documentServiceName, downgradeInjectable(DocumentService))
	   .factory(visibleBreakpointServiceName, downgradeInjectable(VisibleBreakpointService))
	   .factory(windowServiceName, downgradeInjectable(WindowService));

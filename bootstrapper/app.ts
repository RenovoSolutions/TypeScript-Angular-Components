import 'jquery';
import 'bootstrap';
import * as angular from 'angular';

import { NgModule, forwardRef, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeAdapter } from '@angular/upgrade';
import { UpgradeModule } from '@angular/upgrade/static';

import { downgrade as utilitiesDowngrade, UtilitiesModule } from 'typescript-angular-utilities';

import { moduleName as componentsModule } from '../source/ui.module';
import * as componentsDowngrade from '../source/componentsDowngrade';

import { moduleName as inputModuleName } from './inputs/inputBootstrapper';
import { moduleName as buttonModuleName } from './buttons/buttonBootstrapper';
import { moduleName as popupModuleName } from './popup/popupBootstrapper';
import { moduleName as messageLogModuleName } from './messageLog/messageLogBootstrapper';
import { moduleName as cardModuleName } from './cards/cardContainerBootstrapper';
import { moduleName as tabModuleName } from './tabs/tabsBootstrapper';
import { moduleName as formModuleName } from './forms/formsBootstrapper';
import { moduleName as miscModuleName } from './misc/miscBootstrapper';
import { moduleName as textModuleName } from './text/text';

import { WelcomeComponent } from './welcome.component';
import { InputsRootComponent } from './inputs/inputRoot';
import { InputsNg1BootstrapperComponent, InputsNg1Directive } from './inputs/inputBootstrapper';
import { InputsBootstrapper } from './inputs/inputsNg2Bootstrapper';
import { ButtonsNg1BootstrapperComponent, ButtonsNg1Directive } from './buttons/buttonBootstrapper';
import { ButtonsNg2BootstrapperComponent } from './buttons/buttonsNg2Bootstrapper';
import { ButtonsRootComponent } from './buttons/buttonRoot';
import { PopupRootComponent } from './popup/popupRoot';
import { PopupNg1BootstrapperComponent, PopupNg1Directive } from './popup/popupBootstrapper';
import { PopupBootstrapper } from './popup/popupNg2Bootstrapper';
import { CardsRootComponent } from './cards/cardRoot';
import { CardsNg1BootstrapperComponent, CardsNg1Directive } from './cards/cardContainerBootstrapper';
import { CardsBootstrapper } from './cards/cardsNg2Bootstrapper';
import { CardsSmartDataBootstrapper } from './cards/cardsSmartDataBootstrapper';
import { TabsRootComponent } from './tabs/tabRoot';
import { TabsNg1BootstrapperComponent, TabsNg1Directive } from './tabs/tabsBootstrapper';
import { TabsBootstrapper } from './tabs/tabsNg2Bootstrapper';
import { MsiBootstrapperComponent } from './msi/msiBootstrapper.ng2';
import { FormsRootComponent } from './forms/formsRoot';
import { FormsNg1BootstrapperComponent, FormsNg1Directive } from './forms/formsBootstrapper';
import { FormsBootstrapper } from './forms/formsNg2Bootstrapper';
import { MessageLogNg1BootstrapperComponent, MessageLogNg1Directive } from './messageLog/messageLogBootstrapper';
import { MiscRootComponent } from './misc/miscRoot';
import { MiscNgContextBootstrapper } from './misc/miscNg2Context';
import { MiscNg1BootstrapperComponent, MiscNg2BootstrapperComponent } from './misc/miscBootstrapper';
import { App } from './app.ng2';

import { appRoutingProviders, routing } from './app.routing';

import { ComponentsModule } from'../source/ui.module';

const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(forwardRef(() => ComponentsBootstrapperModule));
// utilitiesDowngrade.downgradeUtilitiesToAngular1(upgradeAdapter);
// componentsDowngrade.downgradeComponentsToAngular1(upgradeAdapter);

export const moduleName: string = 'bootstrapper-app';

angular.module(moduleName, [
	componentsModule,

	utilitiesDowngrade.moduleName,
	inputModuleName,
	buttonModuleName,
	popupModuleName,
	cardModuleName,
	tabModuleName,
	formModuleName,
	messageLogModuleName,
	miscModuleName,
	textModuleName,
])
	// .directive('tsApp', <any>upgradeAdapter.downgradeNg2Component(App))
	.directive('tsMiscNgContext', <any>upgradeAdapter.downgradeNg2Component(MiscNgContextBootstrapper));

@NgModule({
	imports: [
		BrowserModule,
		routing,
		UtilitiesModule,
		ComponentsModule,
		UpgradeModule,
	],
	declarations: [
		InputsBootstrapper,
		InputsRootComponent,
		InputsNg1BootstrapperComponent,
		InputsNg1Directive,

		ButtonsRootComponent,
		ButtonsNg1BootstrapperComponent,
		ButtonsNg2BootstrapperComponent,
		ButtonsNg1Directive,

		PopupRootComponent,
		PopupNg1BootstrapperComponent,
		PopupBootstrapper,
		PopupNg1Directive,

		CardsRootComponent,
		CardsNg1BootstrapperComponent,
		CardsBootstrapper,
		CardsSmartDataBootstrapper,
		CardsNg1Directive,

		TabsRootComponent,
		TabsNg1BootstrapperComponent,
		TabsBootstrapper,
		TabsNg1Directive,

		MsiBootstrapperComponent,

		FormsRootComponent,
		FormsNg1BootstrapperComponent,
		FormsBootstrapper,
		FormsNg1Directive,

		MessageLogNg1BootstrapperComponent,
		MessageLogNg1Directive,

		MiscRootComponent,
		MiscNg1BootstrapperComponent,
		MiscNg2BootstrapperComponent,
		MiscNgContextBootstrapper,
		upgradeAdapter.upgradeNg1Component('tsMiscNg1'),
		upgradeAdapter.upgradeNg1Component('tsMiscNg2'),

		WelcomeComponent,
		App,
	],
	bootstrap: [App],
	providers: [
		{
			provide: '$scope',
			useFactory: injector => injector.get('$rootScope'),
			deps: ['$injector']
		}
		// {
		// 	provide: ApplicationRef,
		// 	useValue: {
		// 		componentTypes: [App],
		// 		registerDisposeListener: () => {},
		// 	},
		// },
	],
})
export class ComponentsBootstrapperModule {
	// ngDoBootstrap() {}
}

// upgradeAdapter.bootstrap(document.body, [moduleName], { strictDI: true });

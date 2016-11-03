import 'jquery';
import 'bootstrap';
import * as angular from 'angular';

import { NgModule, forwardRef, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeAdapter } from '@angular/upgrade';

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
import { InputsNg1BootstrapperComponent } from './inputs/inputBootstrapper';
import { InputsBootstrapper } from './inputs/inputsNg2Bootstrapper';
import { ButtonsNg1BootstrapperComponent, ButtonsNg2BootstrapperComponent } from './buttons/buttonBootstrapper';
import { ButtonsRootComponent } from './buttons/buttonRoot';
import { PopupRootComponent } from './popup/popupRoot';
import { PopupNg1BootstrapperComponent } from './popup/popupBootstrapper';
import { PopupBootstrapper } from './popup/popupNg2Bootstrapper';
import { CardsRootComponent } from './cards/cardRoot';
import { CardsNg1BootstrapperComponent } from './cards/cardContainerBootstrapper';
import { CardsBootstrapper } from './cards/cardsNg2Bootstrapper';
import { TabsRootComponent } from './tabs/tabRoot';
import { TabsNg1BootstrapperComponent } from './tabs/tabsBootstrapper';
import { TabsBootstrapper } from './tabs/tabsNg2Bootstrapper';
import { MsiBootstrapperComponent } from './msi/msiBootstrapper.ng2';
import { FormsRootComponent } from './forms/formsRoot';
import { FormsNg1BootstrapperComponent } from './forms/formsBootstrapper';
import { FormsBootstrapper } from './forms/formsNg2Bootstrapper';
import { MessageLogNg1BootstrapperComponent } from './messageLog/messageLogBootstrapper';
import { MiscRootComponent } from './misc/miscRoot';
import { MiscNgContextBootstrapper } from './misc/miscNg2Context';
import { MiscNg1BootstrapperComponent, MiscNg2BootstrapperComponent } from './misc/miscBootstrapper';
import { App } from './app.ng2';

import { appRoutingProviders, routing } from './app.routing';

import { ComponentsModule } from'../source/ui.module';

const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(forwardRef(() => ComponentsBootstrapperModule));
utilitiesDowngrade.downgradeUtilitiesToAngular1(upgradeAdapter);
componentsDowngrade.downgradeComponentsToAngular1(upgradeAdapter);

const moduleName: string = 'bootstrapper-app';

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
	.directive('tsApp', <any>upgradeAdapter.downgradeNg2Component(App))
	.directive('tsMiscNgContext', <any>upgradeAdapter.downgradeNg2Component(MiscNgContextBootstrapper));

@NgModule({
	imports: [
		BrowserModule,
		routing,
		UtilitiesModule,
		ComponentsModule,
	],
	declarations: [
		InputsBootstrapper,
		InputsRootComponent,
		InputsNg1BootstrapperComponent,
		upgradeAdapter.upgradeNg1Component('tsInputsNg1'),

		ButtonsRootComponent,
		ButtonsNg1BootstrapperComponent,
		ButtonsNg2BootstrapperComponent,
		upgradeAdapter.upgradeNg1Component('tsButtonsNg1'),
		upgradeAdapter.upgradeNg1Component('tsButtonsNg2'),

		PopupRootComponent,
		PopupNg1BootstrapperComponent,
		PopupBootstrapper,
		upgradeAdapter.upgradeNg1Component('tsPopupNg1'),

		CardsRootComponent,
		CardsNg1BootstrapperComponent,
		CardsBootstrapper,
		upgradeAdapter.upgradeNg1Component('tsCardsNg1'),

		TabsRootComponent,
		TabsNg1BootstrapperComponent,
		TabsBootstrapper,
		upgradeAdapter.upgradeNg1Component('tsTabsNg1'),

		MsiBootstrapperComponent,

		FormsRootComponent,
		FormsNg1BootstrapperComponent,
		FormsBootstrapper,
		upgradeAdapter.upgradeNg1Component('tsFormsNg1'),

		MessageLogNg1BootstrapperComponent,
		upgradeAdapter.upgradeNg1Component('tsMessageLogNg1'),

		MiscRootComponent,
		MiscNg1BootstrapperComponent,
		MiscNg2BootstrapperComponent,
		MiscNgContextBootstrapper,
		upgradeAdapter.upgradeNg1Component('tsMiscNg1'),
		upgradeAdapter.upgradeNg1Component('tsMiscNg2'),

		WelcomeComponent,
		App,
	],
	providers: [
		{
			provide: ApplicationRef,
			useValue: {
				componentTypes: [App],
				registerDisposeListener: () => {},
			},
		},
	],
})
class ComponentsBootstrapperModule {}

upgradeAdapter.bootstrap(document.body, [moduleName], { strictDI: true });

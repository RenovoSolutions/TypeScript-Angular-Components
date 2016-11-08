import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome.component'
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
import { CardsSmartDataBootstrapper } from './cards/cardsSmartDataBootstrapper';
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

const appRoutes: Routes = [
	{ path: '', component: WelcomeComponent },
	{
		path: 'inputs',
		component: InputsRootComponent,
		children: [
			{ path: 'ng1', component: InputsNg1BootstrapperComponent },
			{ path: 'ng2', component: InputsBootstrapper },
		],
	},
	{
		path: 'buttons',
		component: ButtonsRootComponent,
		children: [
			{ path: 'ng1', component: ButtonsNg1BootstrapperComponent },
			{ path: 'ng2', component: ButtonsNg2BootstrapperComponent },
		],
	},
	{
		path: 'popup',
		component: PopupRootComponent,
		children: [
			{ path: 'ng1', component: PopupNg1BootstrapperComponent },
			{ path: 'ng2', component: PopupBootstrapper },
		],
	},
	{
		path: 'cards',
		component: CardsRootComponent,
		children: [
			{ path: 'ng1', component: CardsNg1BootstrapperComponent },
			{ path: 'ng2', component: CardsBootstrapper },
			{ path: 'smart', component: CardsSmartDataBootstrapper },
		],
	},
	{
		path: 'tabs',
		component: TabsRootComponent,
		children: [
			{ path: 'ng1', component: TabsNg1BootstrapperComponent },
			{ path: 'ng2', component: TabsBootstrapper },
		],
	},
	{
		path: 'msi',
		children: [
			{ path: 'ng2', component: MsiBootstrapperComponent },
		],
	},
	{
		path: 'forms',
		component: FormsRootComponent,
		children: [
			{ path: 'ng1', component: FormsNg1BootstrapperComponent },
			{ path: 'ng2', component: FormsBootstrapper },
		],
	},
	{
		path: 'messageLog',
		component: MessageLogNg1BootstrapperComponent,
	},
	{
		path: 'misc',
		component: MiscRootComponent,
		children: [
			{ path: 'ng1', component: MiscNg1BootstrapperComponent },
			{ path: 'ng2', component: MiscNg2BootstrapperComponent },
		],
	},
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

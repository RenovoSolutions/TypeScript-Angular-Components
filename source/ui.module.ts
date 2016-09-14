import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BEHAVIOR_DIRECTIVES } from './behaviors/index';
import { BusyComponent } from'./components/busy/busy';
import { BUTTON_DIRECTIVES } from'./components/buttons/index';
import { CARD_CONTAINER_DIRECTIVES } from'./components/cardContainer/index';
import { ContainerHeaderComponent } from'./components/cardContainer/container/containerHeader.component';
import { ContainerFooterComponent } from'./components/cardContainer/container/containerFooter.component';
import { SelectableContainerFooterComponent } from'./components/cardContainer/container/selectableContainerFooter.component';
import { ColumnHeaderComponent } from'./components/cardContainer/container/columnHeader/columnHeader';
import { CommaListComponent } from'./components/commaList/commaList';
import { DIALOG_DIRECTIVES } from'./components/dialog/index';
import { FormComponent } from'./components/form/form';
import { INPUT_DIRECTIVES } from'./components/inputs/index';
import { MultiStepIndicatorComponent } from'./components/multiStepIndicator/multiStepIndicator';
import { RatingBarComponent } from'./components/ratingBar/ratingBar';
import { SIMPLE_CARD_DIRECTIVES } from'./components/simpleCardList/index';
import { StringWithWatermarkComponent } from'./components/stringWithWatermark/stringWithWatermark';
import { TABS_COMPONENT } from'./components/tabs/index';
import { ValidationGroupComponent } from'./components/validationGroup/validationGroup';

import { ComponentProvidersModule } from './componentProviders.module';

export const componentsList: any[] = [
	BEHAVIOR_DIRECTIVES,
	BusyComponent,
	BUTTON_DIRECTIVES,
	CARD_CONTAINER_DIRECTIVES,
	CommaListComponent,
	DIALOG_DIRECTIVES,
	FormComponent,
	INPUT_DIRECTIVES,
	MultiStepIndicatorComponent,
	RatingBarComponent,
	SIMPLE_CARD_DIRECTIVES,
	StringWithWatermarkComponent,
	TABS_COMPONENT,
	ValidationGroupComponent,
];

export * from './ui.module.ng1';
export * from './componentProviders.module';

@NgModule({
	imports: [CommonModule],
	declarations: [
		...componentsList,
		ContainerHeaderComponent,
		ContainerFooterComponent,
		SelectableContainerFooterComponent,
		ColumnHeaderComponent,
	],
	exports: [
		...componentsList,
	],
})
export class ComponentsSharedModule { }

@NgModule({
	imports: [
		CommonModule,
		ComponentProvidersModule,
		ComponentsSharedModule,
	],
	exports: [ComponentsSharedModule],
})
export class ComponentsModule { }

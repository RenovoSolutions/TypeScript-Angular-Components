import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BEHAVIOR_DIRECTIVES } from './behaviors/index';
import { BusyComponent } from'./components/busy/busy';
import { BUTTON_DIRECTIVES } from'./components/buttons/index';
import { CARD_CONTAINER_DIRECTIVES } from'./components/cardContainer/index';
import { CommaListComponent } from'./components/commaList/commaList';
import { DIALOG_DIRECTIVES } from'./components/dialog/index';
import { FormComponent } from'./components/form/form';
import { INPUT_DIRECTIVES } from'./components/inputs/index';
import { MultiStepIndicatorComponent } from'./components/multiStepIndicator/multiStepIndicator';
import { RatingBarComponent } from'./components/ratingBar/ratingBar';
import { SIMPLE_CARD_DIRECTIVES } from './components/simpleCardList/index';
import { StepComponent } from './components/multiStepIndicator/step.component';
import { StringWithWatermarkComponent } from'./components/stringWithWatermark/stringWithWatermark';
import { TABS_COMPONENT } from'./components/tabs/index';
import { ValidationGroupComponent } from'./components/validationGroup/validationGroup';

import { DatePipe, IsEmptyPipe, LocalizeStringDatesPipe, TruncatePipe } from './pipes/index';

// internal components
import { CardHeaderColumnComponent } from './components/cardContainer/card/headerColumn/headerColumn';
import { ContainerHeaderComponent } from'./components/cardContainer/container/containerHeader.component';
import { ContainerFooterComponent } from'./components/cardContainer/container/containerFooter.component';
import { SelectableContainerFooterComponent } from'./components/cardContainer/container/selectableContainerFooter.component';
import { ColumnHeaderComponent } from'./components/cardContainer/container/columnHeader/columnHeader';
import { FilterOptionComponent } from'./components/cardContainer/filters/index';
import { TypeaheadDataItemComponent } from'./components/inputs/typeaheadList/typeaheadDataItem';
import { POPOUT_LIST_DIRECTIVES } from'./components/popoutList/index';

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
	StepComponent,
	StringWithWatermarkComponent,
	TABS_COMPONENT,
	ValidationGroupComponent,

	// pipes
	DatePipe,
	IsEmptyPipe,
	LocalizeStringDatesPipe,
	TruncatePipe,
];

export * from './ui.module.ng1';
export * from './componentProviders.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
	],
	declarations: [
		...componentsList,
		CardHeaderColumnComponent,
		ContainerHeaderComponent,
		ContainerFooterComponent,
		SelectableContainerFooterComponent,
		ColumnHeaderComponent,
		FilterOptionComponent,
		TypeaheadDataItemComponent,
		POPOUT_LIST_DIRECTIVES,
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

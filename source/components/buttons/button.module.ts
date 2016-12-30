import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button';
import { ButtonAsyncComponent } from './buttonAsync/buttonAsync';
import { ButtonLinkComponent } from './buttonLink/buttonLink';
import { ButtonLongClickComponent } from './buttonLongClick/buttonLongClick';
import { ButtonRouteComponent } from './buttonRoute/buttonRoute';
import { ButtonSubmitComponent } from './buttonSubmit/buttonSubmit';
import { ButtonToggleComponent } from './buttonToggle/buttonToggle';


// This is cicular but the button's module needs rlBusy for example.
// Eventually rlBusy will be in it's own ngModule and we will only import the modules needed for the ButtonsModule
import { ComponentsSharedModule } from '../../ui.module';

@NgModule({
	imports: [
		CommonModule,
		ComponentsSharedModule
	],
	exports: [
		ButtonComponent,
		ButtonAsyncComponent,
		ButtonLinkComponent,
		ButtonLongClickComponent,
		ButtonRouteComponent,
		ButtonSubmitComponent,
		ButtonToggleComponent
	],
	declarations: [
		ButtonComponent,
		ButtonAsyncComponent,
		ButtonLinkComponent,
		ButtonLongClickComponent,
		ButtonRouteComponent,
		ButtonSubmitComponent,
		ButtonToggleComponent
	],
})
export class ButtonModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BusyModule } from '../busy/busy.module';

import { ButtonComponent } from './button/button';
import { ButtonAsyncComponent } from './buttonAsync/buttonAsync';
import { ButtonLinkComponent } from './buttonLink/buttonLink';
import { ButtonLongClickComponent } from './buttonLongClick/buttonLongClick';
import { ButtonRouteComponent } from './buttonRoute/buttonRoute';
import { ButtonSubmitComponent } from './buttonSubmit/buttonSubmit';
import { ButtonToggleComponent } from './buttonToggle/buttonToggle';

@NgModule({
	imports: [
		CommonModule,
		BusyModule,
		RouterModule
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

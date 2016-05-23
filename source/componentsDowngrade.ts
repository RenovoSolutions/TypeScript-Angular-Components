import { Provider, provide, ExceptionHandler, PipeTransform } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';

import * as angular from 'angular';

import { ButtonSubmitComponent } from './components/buttonSubmit/buttonSubmit.ng2';
import { FormComponent } from './components/form/form.ng2';
import { TextboxComponent } from './components/textbox/textbox.ng2';

export const buttonSubmitComponentName: string = 'rlButtonSubmitNg';
export const formComponentName: string = 'rlFormNg';
export const textboxComponentName: string = 'rlTextboxNg';

export const moduleName: string = 'rl.components.downgrade';

const componentsDowngradeModule = angular.module(moduleName, []);

export function downgradeComponentsToAngular1(upgradeAdapter: UpgradeAdapter) {
	componentsDowngradeModule.directive(buttonSubmitComponentName, <any>upgradeAdapter.downgradeNg2Component(ButtonSubmitComponent));
	componentsDowngradeModule.directive(formComponentName, <any>upgradeAdapter.downgradeNg2Component(FormComponent));
	componentsDowngradeModule.directive(textboxComponentName, <any>upgradeAdapter.downgradeNg2Component(TextboxComponent));
}

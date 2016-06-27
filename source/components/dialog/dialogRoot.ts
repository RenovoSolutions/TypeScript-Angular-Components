import { Component, Provider, forwardRef } from '@angular/core';

@Component({
	selector: 'rlDialogRoot',
	template: '<ng-content></ng-content>',
})
export class DialogRootComponent {

}

export const DIALOG_ROOT_PROVIDER: Provider = new Provider(DialogRootComponent, {
	useExisting: forwardRef(() => DialogRootComponent),
});

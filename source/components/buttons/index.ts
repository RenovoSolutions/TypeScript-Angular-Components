import { ButtonComponent } from './button/button';
import { ButtonAsyncComponent } from './buttonAsync/buttonAsync';
import { ButtonLinkComponent } from './buttonLink/buttonLink';
import { ButtonLongClickComponent } from './buttonLongClick/buttonLongClick';
import { ButtonSubmitComponent } from './buttonSubmit/buttonSubmit';
import { ButtonToggleComponent } from './buttonToggle/buttonToggle';

export const BUTTON_DIRECTIVES: any[] = [
	ButtonComponent,
	ButtonAsyncComponent,
	ButtonLinkComponent,
	ButtonLongClickComponent,
	ButtonSubmitComponent,
	ButtonToggleComponent,
];

export * from './button/button';
export * from './buttonAsync/buttonAsync';
export * from './buttonLink/buttonLink';
export * from './buttonLongClick/buttonLongClick';
export * from './buttonSubmit/buttonSubmit';
export * from './buttonToggle/buttonToggle';
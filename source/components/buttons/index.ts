import { ButtonComponent } from './button/button';
import { ButtonAsyncComponent } from './buttonAsync/buttonAsync';
import { ButtonLinkComponent } from './buttonLink/buttonLink';
import { ButtonLongClickComponent } from './buttonLongClick/buttonLongClick';
import { ButtonRouteComponent } from './buttonRoute/buttonRoute';
import { ButtonSubmitComponent } from './buttonSubmit/buttonSubmit';
import { ButtonToggleComponent } from './buttonToggle/buttonToggle';

export const BUTTON_DIRECTIVES: any[] = [
	ButtonComponent,
	ButtonAsyncComponent,
	ButtonLinkComponent,
	ButtonLongClickComponent,
	ButtonRouteComponent,
	ButtonSubmitComponent,
	ButtonToggleComponent,
];

export * from './button/button';
export * from './buttonAsync/buttonAsync';
export * from './buttonLink/buttonLink';
export * from './buttonLongClick/buttonLongClick';
export * from './buttonRoute/buttonRoute';
export * from './buttonSubmit/buttonSubmit';
export * from './buttonToggle/buttonToggle';

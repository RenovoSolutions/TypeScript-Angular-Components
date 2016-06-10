import { OpaqueToken, Provider } from '@angular/core';

export const defaultThemeValueName: string = 'useDefaultTheme';
export const defaultThemeValue: boolean = true;

export const defaultThemeToken: OpaqueToken = new OpaqueToken('The default theme for the components library');
export const DEFAULT_THEME_PROVIDER: Provider = new Provider(defaultThemeToken, {
	useValue: defaultThemeValue,
});

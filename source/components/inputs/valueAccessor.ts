import { Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/common';

export interface IProviderConfig {
	useClass?: any;
	useValue?: any;
	useExisting?: any;
	useFactory?: any;
	deps?: any[];
	multi?: boolean;
}

export function makeValueAccessorProvider(config: IProviderConfig): Provider {
	config.multi = true;
	return new Provider(NG_VALUE_ACCESSOR, config);
}

export abstract class ValueAccessor<T> implements ControlValueAccessor {
	onChange = (_) => { };
	onTouched = () => { };

	abstract writeValue(value: T): void;

	triggerChange(value: T): void {
		this.onChange(value);
	}

	registerOnChange(fn: (_: T) => void): void { this.onChange = fn; }
	registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
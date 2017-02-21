import { Directive, Host, Input, Output, EventEmitter, OnInit, OnDestroy, SimpleChanges } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __guid = services.guid;

export interface IOffClickEvent extends MouseEvent {
	rlEventIdentifier: string;
}

@Directive({
	selector: '[offClick]',
	host: {
		'(click)': 'onClick($event)',
	},
})
export class OffClickDirective implements OnInit, OnDestroy {
	@Output('offClick') offClick: EventEmitter<any> = new EventEmitter();

	private _active: boolean = true;
	@Input('offClickActive') set active(value: boolean)
	{
		if (value) {
			this.addListener();
		} else {
			this.removeListener();
		}
		this._active = value;
	}

	listener: { ($event: MouseEvent): void } = ($event: IOffClickEvent) => {
		if ($event.rlEventIdentifier !== this.identifier) {
			this.offClick.emit($event);
		}
	};

	identifier: string;

	constructor(guidService: __guid.GuidService) {
		this.identifier = guidService.random();
	}

	ngOnInit() {
		if (this._active) {
			setTimeout(() => {
				this.addListener();
			});
		}
	}

	addListener(): void {
		document.addEventListener('click', this.listener);
	}

	removeListener(): void {
		document.removeEventListener('click', this.listener);
	}

	ngOnDestroy() {
		this.removeListener();
	}

	onClick($event: IOffClickEvent) {
		$event.rlEventIdentifier = this.identifier;
	}
}

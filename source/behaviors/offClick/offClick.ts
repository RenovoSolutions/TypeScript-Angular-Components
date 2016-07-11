import { Directive, Host, Output, EventEmitter, OnInit, OnDestroy, Inject } from '@angular/core';

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

	listener: { ($event: MouseEvent): void } = ($event: IOffClickEvent) => {
		if ($event.rlEventIdentifier !== this.identifier) {
			this.offClick.emit($event);
		}
	};

	identifier: string;

	constructor(@Inject(__guid.guidToken) guidService: __guid.IGuidService) {
		this.identifier = guidService.random();
	}

	ngOnInit() {
		setTimeout(() => {
			document.addEventListener('click', this.listener);
		}, 0);
	}

	ngOnDestroy() {
		document.removeEventListener('click', this.listener);
	}

	onClick($event: IOffClickEvent) {
		$event.rlEventIdentifier = this.identifier;
	}
}
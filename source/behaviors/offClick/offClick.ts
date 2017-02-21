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
	@Input('offClickActive') active: boolean = true;

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
		if (this.active) {
			setTimeout(() => {
				this.addListener();
			});
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['active']) {
			if (changes['active'].currentValue) {
				this.addListener();
			} else {
				this.removeListener();
			}
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

import { Directive, Host, Input, Output, EventEmitter, OnInit, OnDestroy, SimpleChanges } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __guid = services.guid;

import { DocumentWrapper } from '../../services/document/document.provider';

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
	document: Document;

	constructor(guidService: __guid.GuidService
			, document: DocumentWrapper) {
		this.identifier = guidService.random();
		this.document = <any>document;
	}

	ngOnInit() {
		if (this._active) {
			setTimeout(() => {
				this.addListener();
			});
		}
	}

	addListener(): void {
		this.document.addEventListener('click', this.listener);
	}

	removeListener(): void {
		this.document.removeEventListener('click', this.listener);
	}

	ngOnDestroy() {
		this.removeListener();
	}

	onClick($event: IOffClickEvent) {
		$event.rlEventIdentifier = this.identifier;
	}
}

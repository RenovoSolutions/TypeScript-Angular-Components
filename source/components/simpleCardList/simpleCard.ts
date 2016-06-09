import { Component, Inject, Input, Output, Optional, EventEmitter, OnInit, ViewChild } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;

import { SimpleCardListComponent } from './simpleCardList';
import { FormComponent, ISaveAction, defaultSave } from '../form/form';

@Component({
	selector: 'rlSimpleCard',
	template: require('./simpleCard.html'),
	directives: [FormComponent],
})
export class SimpleCardComponent<T> implements OnInit {
	@Input() save: ISaveAction<T>;
	@Input() canOpen: boolean;
	@Input() alwaysOpen: boolean;
	@Input() saveWhenInvalid: boolean;
	@Input() cardType: string;
	@Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

	@ViewChild(FormComponent) rlForm: FormComponent;

	showContent: boolean = false;
	list: SimpleCardListComponent<T>;
	private boolean: __boolean.IBooleanUtility;

	constructor(@Optional() list: SimpleCardListComponent<T>
			, @Inject(__boolean.booleanToken) boolean: __boolean.IBooleanUtility) {
		this.list = list || this.emptyList();
		this.boolean = boolean;
	}

	ngOnInit(): void {
		this.save = this.save || defaultSave;
		this.canOpen = this.canOpen != null ? this.canOpen : true;
		this.list.registerCard(this);
	}

	toggle(): void {
		if (this.showContent) {
			this.close();
		} else {
			this.open();
		}
	}

	open(): void {
		if (this.canOpen && this.list.openCard()) {
			this.showContent = true;
			this.onOpen.emit(null);
		}
	}

	close(): boolean {
		if (!this.showContent || this.alwaysOpen) {
			return true;
		}

		const canClose: boolean = this.saveForm();

		if (canClose) {
			this.showContent = false;
		}

		return canClose;
	}

	saveForm(): boolean {
		return this.boolean.toBool(this.rlForm.submit());
	}

	private emptyList(): SimpleCardListComponent<T> {
		return new SimpleCardListComponent<T>();
	}
}

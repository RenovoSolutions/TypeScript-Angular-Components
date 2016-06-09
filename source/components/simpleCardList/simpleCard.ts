import { Component, Inject, Input, Output, Optional, EventEmitter, OnInit, ViewChild, Provider, forwardRef } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;
import __notification = services.notification;

import { SimpleCardListComponent } from './simpleCardList';
import { FormComponent, ISaveAction } from '../form/form';
import { FormService } from '../../services/form/form.service';

@Component({
	selector: 'rlSimpleCard',
	template: require('./simpleCard.html'),
	directives: [FormComponent],
	providers: [
		new Provider(FormComponent, {
			useExisting: forwardRef(() => SimpleCardComponent),
		}),
	],
})
export class SimpleCardComponent<T> extends FormComponent implements OnInit {
	@Input() save: ISaveAction<T>;
	@Input() canOpen: boolean;
	@Input() alwaysOpen: boolean;
	@Input() saveWhenInvalid: boolean;
	@Input() cardType: string;
	@Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

	showContent: boolean = false;
	list: SimpleCardListComponent<T>;
	private boolean: __boolean.IBooleanUtility;

	constructor(@Inject(__boolean.booleanToken) boolean: __boolean.IBooleanUtility
			, @Inject(__notification.notificationToken) notification: __notification.INotificationService
			, formService: FormService
			, @Optional() list: SimpleCardListComponent<T>) {
		super(notification, formService);
		this.list = list || this.emptyList();
		this.boolean = boolean;
	}

	ngOnInit(): void {
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
		return this.boolean.toBool(this.submit());
	}

	private emptyList(): SimpleCardListComponent<T> {
		const list: SimpleCardListComponent<T> = new SimpleCardListComponent<T>();
		list.openCard = () => true;
		return list;
	}
}

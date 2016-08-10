import { Component, Input, Output, Optional, SkipSelf, EventEmitter, OnInit, Provider, forwardRef, ContentChild } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __notification = services.notification;

import { SimpleCardListComponent } from './simpleCardList';
import { FormComponent, baseInputs } from '../form/form';
import { AsyncHelper } from '../../services/async/async.service';
import { FormService } from '../../services/form/form.service';
import { CardHeaderTemplate, CardContentTemplate, CardFooterTemplate } from '../cards/index';

@Component({
	selector: 'rlSimpleCard',
	template: require('./simpleCard.html'),
	directives: [FormComponent],
	inputs: [baseInputs.save],
	providers: [
		new Provider(FormComponent, {
			useExisting: forwardRef(() => SimpleCardComponent),
		}),
	],
})
export class SimpleCardComponent<T> extends FormComponent implements OnInit {
	@Input() canOpen: boolean;
	@Input() alwaysOpen: boolean;
	@Input() saveWhenInvalid: boolean;
	@Input() cardType: string;
	@Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

	@ContentChild(CardHeaderTemplate) header: CardHeaderTemplate;
	@ContentChild(CardContentTemplate) content: CardContentTemplate;
	@ContentChild(CardFooterTemplate) footer: CardFooterTemplate;

	showContent: boolean = false;
	list: SimpleCardListComponent<T>;
	alternatingClass: string = '';

	constructor(notification: __notification.NotificationService
			, asyncHelper: AsyncHelper
			, formService: FormService
			, @Optional() @SkipSelf() parentForm: FormComponent
			, @Optional() list: SimpleCardListComponent<T>) {
		super(notification, asyncHelper, formService, parentForm);
		this.list = list || this.emptyList();
	}

	ngOnInit(): void {
		this.canOpen = this.canOpen != null ? this.canOpen : true;
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

		const canClose: boolean = this.submit();

		if (canClose) {
			this.showContent = false;
		}

		return canClose;
	}

	private emptyList(): SimpleCardListComponent<T> {
		const list: SimpleCardListComponent<T> = new SimpleCardListComponent<T>(null);
		list.openCard = () => true;
		return list;
	}
}

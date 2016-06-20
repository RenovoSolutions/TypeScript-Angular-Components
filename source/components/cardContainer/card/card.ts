import { Component, Input, Inject, Provider, forwardRef } from '@angular/core';
import { Subject } from 'rxjs';
import { isFunction } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;
import __notification = services.notification;

import { IDataSource } from '../dataSources/dataSource';
import { IColumn } from '../column';
import { CardContainerComponent } from '../cardContainer';
import { FormComponent, ISaveAction } from '../../form/form';
import { FormService } from '../../../services/form/form.service';
import { TemplateRenderer } from '../../templateRenderer/templateRenderer';
import { CardContent, CardFooter } from './content/index';

@Component({
	selector: 'rlCard',
	template: require('./card.html'),
	directives: [TemplateRenderer],
	providers: [
		new Provider(FormComponent, {
			useExisting: forwardRef(() => CardComponent),
		}),
	],
})
export class CardComponent<T> extends FormComponent {
	@Input() item: T;
	@Input() content: CardContent;
	@Input() footer: CardFooter;

	// consumer properties
	initCard: { (): void } = () => null;
	clickCard: { (): void } = () => null;

	showContent: boolean = false;
	dirty: boolean = false;
	hasBody: boolean;
	hasFooter: boolean;
	refresh: Subject<void>;

	cardContainer: CardContainerComponent<T>;
	boolean: __boolean.IBooleanUtility;

	constructor(@Inject(__boolean.booleanToken) boolean: __boolean.IBooleanUtility
			, @Inject(__notification.notificationToken) notification: __notification.INotificationService
			, formService: FormService
			, cardContainer: CardContainerComponent<T>) {
		super(notification, formService);
		this.boolean = boolean;
		this.cardContainer = cardContainer;
	}

	toggleContent(): void {
		if (this.showContent) {
			this.close();
		} else {
			this.open();
		}
	}

	open(): void {
		if (isFunction(this.initCard)) {
			this.initCard();
		}

		if (this.cardContainer.openCard()) {
			this.showContent = true;
		}
	}

	close(): boolean {
		if (!this.showContent) {
			return true;
		}

		const canClose: boolean = this.boolean.toBool(this.submit());

		if (canClose) {
			this.showContent = false;
		}

		return canClose;
	}

	remove(item: T): void {
		this.cardContainer.dataSource.remove(item);
	}
}
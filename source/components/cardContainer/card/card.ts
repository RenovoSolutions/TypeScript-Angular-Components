import { Component, Input, Inject, Provider, forwardRef } from '@angular/core';
import { Subject } from 'rxjs';
import { isFunction } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;
import __notification = services.notification;

import { IDataSource } from '../dataSources/dataSource';
import { IColumn } from '../column';
import { CardContainerComponent } from '../cardContainer';
import { FormComponent, baseInputs } from '../../form/form';
import { FormService } from '../../../services/form/form.service';
import { CardHeaderColumnComponent } from './headerColumn/headerColumn';
import { CardContentTemplate, CardFooterTemplate } from '../../cards/index';
import { ColumnContentTemplate } from '../templates/index';

@Component({
	selector: 'rlCard',
	template: require('./card.html'),
	inputs: [baseInputs.save],
	directives: [CardHeaderColumnComponent],
	providers: [
		new Provider(FormComponent, {
			useExisting: forwardRef(() => CardComponent),
		}),
	],
})
export class CardComponent<T> extends FormComponent {
	@Input() item: T;
	@Input() content: CardContentTemplate;
	@Input() footer: CardFooterTemplate;

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
			, @Inject(forwardRef(() => CardContainerComponent)) cardContainer: CardContainerComponent<T>) {
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

	submit(): any {
		this.form.value = this.item;
		super.submit();
	}

	getColumnTemplate(columnName: string): ColumnContentTemplate {
		return this.cardContainer.columnTemplates.filter(column => column.name === columnName)[0];
	}
}
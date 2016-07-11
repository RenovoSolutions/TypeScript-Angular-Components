import { Component, Inject, Provider, forwardRef, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
import { isFunction, assign } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;
import __notification = services.notification;

import { IDataSource } from '../dataSources/dataSource';
import { IColumn } from '../column';
import { CardContainerComponent } from '../cardContainer';
import { FormComponent, baseInputs, IBaseFormInputs } from '../../form/form';
import { AsyncHelper } from '../../../services/async/async.service';
import { FormService } from '../../../services/form/form.service';
import { CardHeaderColumnComponent } from './headerColumn/headerColumn';
import { CardContentTemplate, CardFooterTemplate } from '../../cards/index';
import { ColumnContentTemplate } from '../templates/index';

export interface ICardInputs extends IBaseFormInputs {
	item: string,
}

export const cardInputs: ICardInputs = <ICardInputs>assign({}, baseInputs, {
	item: 'item',
});

@Component({
	selector: 'rlCard',
	template: require('./card.html'),
	inputs: [cardInputs.save, cardInputs.item],
	directives: [CardHeaderColumnComponent],
	providers: [
		new Provider(FormComponent, {
			useExisting: forwardRef(() => CardComponent),
		}),
	],
})
export class CardComponent<T> extends FormComponent {
	item: T;

	// consumer properties
	initCard: { (): void } = () => null;
	clickCard: { (): void } = () => null;

	showContent: boolean = false;
	refresh: Subject<void> = new Subject<void>();

	cardContainer: CardContainerComponent<T>;
	boolean: __boolean.IBooleanUtility;

	constructor(@Inject(__notification.notificationToken) notification: __notification.INotificationService
			, asyncHelper: AsyncHelper
			, formService: FormService
			, @Optional() @SkipSelf() parentForm: FormComponent
			, @Inject(__boolean.booleanToken) boolean: __boolean.IBooleanUtility
			, @Inject(forwardRef(() => CardContainerComponent)) cardContainer: CardContainerComponent<T>) {
		super(notification, asyncHelper, formService, parentForm);
		this.boolean = boolean;
		this.cardContainer = cardContainer;
		this.refresh.subscribe(() => this.cardContainer.dataSource.refresh());
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

	remove(): void {
		this.cardContainer.dataSource.remove(this.item);
	}

	saveForm(): any {
		return this.save(this.item);
	}

	getColumnTemplate(columnName: string): ColumnContentTemplate {
		return this.cardContainer.columnTemplates.filter(column => column.name === columnName)[0];
	}
}
import { Component, Inject, forwardRef, Optional, SkipSelf } from '@angular/core';
import { isUndefined } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __notification = services.notification;

import { CardContainerComponent } from '../cardContainer';
import { SelectableCardContainerComponent, ISelectableItem } from '../selectableCardContainer';
import { FormComponent } from '../../form/form';
import { AsyncHelper } from '../../../services/async/async.service';
import { FormService } from '../../../services/form/form.service';
import { CardHeaderColumnComponent } from './headerColumn/headerColumn';
import { CardComponent, cardInputs } from './card';

@Component({
	selector: 'rlSelectableCard',
	template: require('./selectableCard.html'),
	inputs: [cardInputs.item],
	providers: [
		{
			provide: FormComponent,
			useExisting: forwardRef(() => SelectableCardComponent),
		},
		{
			provide: CardComponent,
			useExisting: forwardRef(() => SelectableCardComponent),
		},
	],
})
export class SelectableCardComponent<T extends ISelectableItem> extends CardComponent<T> {
	get selectableCardContainer(): SelectableCardContainerComponent<T> {
		return <SelectableCardContainerComponent<T>>this.cardContainer;
	}

	constructor(notification: __notification.NotificationService
			, asyncHelper: AsyncHelper
			, formService: FormService
			, @Optional() @SkipSelf() parentForm: FormComponent
			, @Inject(forwardRef(() => CardContainerComponent)) cardContainer: CardContainerComponent<T>) {
		super(notification, asyncHelper, formService, parentForm, cardContainer);
	}

	setSelected(value: boolean): void {
		if (isUndefined(this.item.viewData)) {
			this.item.viewData = {};
		}

		this.item.viewData.selected = value;

		this.selectableCardContainer.selectionChanged.emit(null);
	}

	toggleSelected(): void {
		if (isUndefined(this.item.viewData)) {
			this.item.viewData = {};
		}
		this.setSelected(!this.item.viewData.selected);
	}
}

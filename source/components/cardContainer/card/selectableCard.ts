import { Component, Inject, Provider, forwardRef, Optional, SkipSelf } from '@angular/core';
import { isUndefined } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;
import __notification = services.notification;

import { CheckboxComponent } from '../../inputs/index';
import { CardContainerComponent } from '../cardContainer';
import { SelectableCardContainerComponent, ISelectableItem } from '../selectableCardContainer';
import { FormComponent } from '../../form/form';
import { FormService } from '../../../services/form/form.service';
import { CardHeaderColumnComponent } from './headerColumn/headerColumn';
import { CardComponent, cardInputs } from './card';

@Component({
	selector: 'rlSelectableCard',
	template: require('./selectableCard.html'),
	inputs: [cardInputs.save, cardInputs.item],
	directives: [CardHeaderColumnComponent, CheckboxComponent],
	providers: [
		new Provider(FormComponent, {
			useExisting: forwardRef(() => SelectableCardComponent),
		}),
		new Provider(CardComponent, {
			useExisting: forwardRef(() => SelectableCardComponent),
		}),
	],
})
export class SelectableCardComponent<T extends ISelectableItem> extends CardComponent<T> {
	get selectableCardContainer(): SelectableCardContainerComponent<T> {
		return <SelectableCardContainerComponent<T>>this.cardContainer;
	}

	constructor( @Inject(__notification.notificationToken) notification: __notification.INotificationService
			, formService: FormService
			, @Optional() @SkipSelf() parentForm: FormComponent
			, @Inject(__boolean.booleanToken) boolean: __boolean.IBooleanUtility
			, @Inject(forwardRef(() => CardContainerComponent)) cardContainer: CardContainerComponent<T>) {
		super(notification, formService, parentForm, boolean, cardContainer);
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
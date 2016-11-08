import { Component, Input, OnInit, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { each } from 'lodash';

import { IColumn } from '../cardContainer/index';
import { CardContainerBuilderService, ICardContainerInstance, ICardContainerSettings } from '../cardContainer/builder/index';
import { CardContentTemplate, CardFooterTemplate } from '../cards/index';
import { ContainerHeaderTemplate, ContainerFooterTemplate, ColumnContentTemplate } from '../cardContainer/templates/index';
import { ColumnHeaderTemplate } from '../cardContainer/templates/columnHeader.template';

@Component({
	selector: 'rlSimpleCardContainer',
	template: require('./simpleCardContainer.html'),
})
export class SimpleCardContainer<T> implements OnInit {
	@Input() columns: IColumn<T>[];
	@Input() options: ICardContainerSettings;

	@Input()
	set data(value: T[]) {
		this.data$.next(value);
	}

	data$: BehaviorSubject<T[]>;
	builder: ICardContainerInstance;
	cardContainerBuilder: CardContainerBuilderService;

	@ContentChild(ContainerHeaderTemplate) containerHeader: ContainerHeaderTemplate;
	@ContentChild(ContainerFooterTemplate) containerFooter: ContainerFooterTemplate;
	@ContentChild(CardContentTemplate) cardContent: CardContentTemplate;
	@ContentChild(CardFooterTemplate) cardFooter: CardFooterTemplate;
	@ContentChildren(ColumnContentTemplate) columnTemplates: QueryList<ColumnContentTemplate>;
	@ContentChildren(ColumnHeaderTemplate) columnHeaders: QueryList<ColumnHeaderTemplate>;

	constructor(cardContainerBuilder: CardContainerBuilderService) {
		this.cardContainerBuilder = cardContainerBuilder;
		this.data$ = new BehaviorSubject(null);
	}

	ngOnInit(): void {
		this.builder = this.cardContainerBuilder.getInstance(this.options || {});
		each(this.columns, column => {
			this.cardContainerBuilder.addColumn(this.builder, column);
		});
		this.cardContainerBuilder.buildObservableDataSource(this.builder, this.data$);
	}
}

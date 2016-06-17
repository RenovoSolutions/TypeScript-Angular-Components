import { Component, Input, OnInit } from '@angular/core';

import { services, filters } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;
import __timeout = services.timeout;
import __isEmpty = filters.isEmpty;

import { CardContainerComponent } from '../cardContainer';
import { TextboxComponent } from '../../inputs/index';
import { ButtonComponent } from '../../buttons/index';

export const defaultSearchPlaceholder: string = 'Search';
export const defaultSearchDelay: number = 1000;

@Component({
	selector: 'rlCardSearch',
	template: require('./cardSearch.html'),
	directives: [TextboxComponent, ButtonComponent, __isEmpty.IsEmptyPipe],
})
export class CardSearchComponent implements OnInit {
	@Input() delay: number;
	@Input() searchFilter: __genericSearchFilter.IGenericSearchFilter;

	searchPlaceholder: string;
	searchLengthError: boolean = false;
	hasSearchFilter: boolean = true;
	minSearchError: string;

	cardContainer: CardContainerComponent;
	timer: __timeout.ITimeout;
	timeoutService: __timeout.TimeoutService;

	constructor(cardContainer: CardContainerComponent
			, timeoutService: __timeout.TimeoutService) {
		this.cardContainer = cardContainer;
		this.timeoutService = timeoutService;
	}

	setSearch(search: string) {
		this.searchFilter.searchText = search;
		this.validateSearchLength(search, this.searchFilter.minSearchLength);

		if (this.timer != null) {
			this.timer.cancel();
		}

		if (!this.searchLengthError) {
			this.timer = this.timeoutService.setTimeout(() => this.cardContainer.dataSource.refresh(), this.delay);
		}
	}

	ngOnInit(): void {
		this.minSearchError = 'You must enter at least {{minSearchLength}} characters to perform a search';

		if (this.searchFilter == null) {
			let filter: __genericSearchFilter.IGenericSearchFilter = this.cardContainer.searchFilter;
			this.searchFilter = filter;

			if (filter == null) {
				this.hasSearchFilter = false;
			}
		}

		if (this.hasSearchFilter) {
			this.searchPlaceholder = defaultSearchPlaceholder;

			this.delay = this.delay || defaultSearchDelay;
		}
	}

	private validateSearchLength(search: string, minLength: number): void {
		// show error if search string exists but is below minimum size
		this.searchLengthError = search != null
								&& search.length > 0
								&& search.length < minLength;
	}
}
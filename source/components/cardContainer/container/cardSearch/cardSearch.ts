import { Component, Input, OnInit, Inject, forwardRef } from '@angular/core';

import { services, filters } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;
import __timeout = services.timeout;

import { CardContainerComponent } from '../../cardContainer';

export const defaultSearchPlaceholder: string = 'Search';
export const defaultSearchDelay: number = 1000;

@Component({
	selector: 'rlCardSearch',
	template: require('./cardSearch.html'),
})
export class CardSearchComponent<T> implements OnInit {
	@Input() delay: number;
	@Input() searchFilter: __genericSearchFilter.IGenericSearchFilter;

	searchLengthError: boolean = false;
	hasSearchFilter: boolean = true;

	cardContainer: CardContainerComponent<T>;
	timer: __timeout.ITimeout;
	timeoutService: __timeout.TimeoutService;

	constructor(@Inject(forwardRef(() => CardContainerComponent)) cardContainer: CardContainerComponent<T>
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
			this.timer = this.timeoutService.setTimeout(() => this.cardContainer.dataSource.refresh(), this.delay).catch(() => null);
		}
	}

	ngOnInit(): void {
		if (this.searchFilter == null) {
			let filter: __genericSearchFilter.IGenericSearchFilter = this.cardContainer.searchFilter;
			this.searchFilter = filter;

			if (filter == null) {
				this.hasSearchFilter = false;
			}
		}

		if (this.hasSearchFilter) {
			this.delay = this.delay || defaultSearchDelay;
		}
	}

	get searchPlaceholder(): string {
 		if (this.hasSearchFilter) {
 			return this.cardContainer.searchPlaceholder || defaultSearchPlaceholder;
 		}
	}

	get minSearchError(): string {
		return `You must enter at least ${this.searchFilter.minSearchLength} characters to perform a search`;
	}

	private validateSearchLength(search: string, minLength: number): void {
		// show error if search string exists but is below minimum size
		this.searchLengthError = search != null
								&& search.length > 0
								&& search.length < minLength;
	}
}

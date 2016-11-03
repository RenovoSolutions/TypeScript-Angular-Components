import { Component, Input, OnInit, Inject, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { CardContainerComponent } from '../../cardContainer';
import { SearchFilter } from '../../filters/index';

export const defaultSearchPlaceholder: string = 'Search';
export const defaultSearchDelay: number = 1000;

@Component({
	selector: 'rlCardSearch',
	template: require('./cardSearch.html'),
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSearchComponent<T> implements OnInit {
	@Input() delay: number;
	@Input() searchFilter: SearchFilter;

	hasSearchFilter: boolean = true;
	searchChanges$: Subject<string> = new Subject<string>();

	cardContainer: CardContainerComponent<T>;

	constructor(@Inject(forwardRef(() => CardContainerComponent)) cardContainer: CardContainerComponent<T>) {
		this.cardContainer = cardContainer;
	}

	get searchLengthError$(): Observable<boolean> {
		return this.searchFilter.searchText$.map(search => {
			// show error if search string exists but is below minimum size
			return search != null
					&& search.length > 0
					&& search.length < this.searchFilter.minSearchLength;
		});
	}

	ngOnInit(): void {
		if (this.searchFilter == null) {
			let filter: SearchFilter = this.cardContainer.searchFilter;
			this.searchFilter = filter;

			if (filter == null) {
				this.hasSearchFilter = false;
			}
		}

		if (this.hasSearchFilter) {
			this.delay = this.delay || defaultSearchDelay;

			this.searchChanges$.debounceTime(this.delay)
							   .distinctUntilChanged()
							   .subscribe(search => this.searchFilter.setSearch(search));
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
}

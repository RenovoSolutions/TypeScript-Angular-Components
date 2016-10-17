import { Observable } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import SearchUtility = services.search.SearchUtility;

import { Filter, IFilter } from '../filter';

export class SearchFilter extends Filter<any, string> implements IFilter<any, string> {
	minSearchLength: number;
	caseSensitive: boolean;
	tokenized: boolean;

	searchUtility: SearchUtility;

	constructor(searchUtility: SearchUtility) {
		super();
		this.searchUtility = searchUtility;
		this.minSearchLength = 1;
		this.caseSensitive = false;
		this.tokenized = false;
	}

	get searchText$(): Observable<string> {
		return this.value$.asObservable();
	}

	setSearch(search: string): void {
		this.value$.next(search);
	}

	predicate = (item: any, searchText: string): boolean => {
		if (!searchText || searchText.length < this.minSearchLength) {
			return true;
		}

		if (this.tokenized) {
			return this.searchUtility.tokenizedSearch(item, searchText, this.caseSensitive);
		}

		return this.searchUtility.search(item, searchText, this.caseSensitive);
	}
}

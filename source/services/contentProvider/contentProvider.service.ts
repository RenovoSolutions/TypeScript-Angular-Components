// /// <reference path="../../../typings/jquery/jquery.d.ts" />

'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';
import { Observable, BehaviorSubject } from 'rxjs';

export var moduleName: string = 'rl.utilities.services.contentProvider';
export var serviceName: string = 'contentProviderFactory';

export interface IContentChanges {
	newContent: JQuery;
	scope?: ng.IScope;
}

export interface IContentProviderService {
	contentChanges: Observable<IContentChanges>;
	setContent(content: JQuery): void;
	setTranscludeContent(transcludeFunction: ng.ITranscludeFunction): void;
	getContent(selector?: string): JQuery;
}

class ContentProviderService implements IContentProviderService {
	constructor() {
		this.contentChanges = new BehaviorSubject<IContentChanges>(<any>{ newContent: ng.element('') });
	}

	private content: JQuery;
	private scope: ng.IScope;
	contentChanges: BehaviorSubject<IContentChanges>;

	setContent(content: JQuery, scope?: ng.IScope): void {
		this.content = content;
		this.scope = scope;
		this.contentChanges.next({
			newContent: content,
			scope: scope,
		});
	}

	setTranscludeContent: {(transcludeFunction: ng.ITranscludeFunction): void} = (transcludeFunction: ng.ITranscludeFunction): void => {
		let scope: ng.IScope = null;
		if (_.isFunction(transcludeFunction)) {
			transcludeFunction((clone: JQuery, transcludeScope: ng.IScope): void => {
				this.setContent(clone, transcludeScope);
			});
		} else {
			this.setContent(null);
		}
	}

	getContent(selector?: string): JQuery {
		if (selector != null) {
			return this.content.filter(selector);
		}

		return this.content;
	}
}

export interface IContentProviderServiceFactory {
	getInstance(): IContentProviderService;
}

contentProviderServiceFactory.$inject = [];
function contentProviderServiceFactory(): IContentProviderServiceFactory {
	'use strict';

	return {
		getInstance(): IContentProviderService {
			return new ContentProviderService();
		}
	};
}

ng.module(moduleName, [])
	.factory(serviceName, contentProviderServiceFactory);
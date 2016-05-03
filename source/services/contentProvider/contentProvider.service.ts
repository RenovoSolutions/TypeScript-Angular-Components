// /// <reference path="../../../typings/jquery/jquery.d.ts" />

'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';
import { Subject, Subscription } from 'rxjs';

export var moduleName: string = 'rl.utilities.services.contentProvider';
export var serviceName: string = 'contentProviderFactory';

export interface IContentChanges {
	newContent: JQuery;
	scope?: ng.IScope;
}

export interface IContentProviderService {
	contentChanges: Subject<IContentChanges>;
	setContent(content: JQuery): void;
	setTranscludeContent(transcludeFunction: ng.ITranscludeFunction): void;
	getContent(selector?: string): JQuery;
	subscribe(action: {(newText: JQuery): void}, selector?: string): Subscription;
}

class ContentProviderService implements IContentProviderService {
	constructor() {
		this.contentChanges = new Subject<IContentChanges>();
	}

	private content: JQuery;
	private scope: ng.IScope;
	contentChanges: Subject<IContentChanges>;

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

	subscribe(action: {(IContentChanges): void}): Subscription {
		if (this.content != null) {
			action({
				newContent: this.getContent(),
				scope: this.scope,
			});
		}

		return this.contentChanges.subscribe(action);
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
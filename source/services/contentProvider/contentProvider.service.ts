/// <reference path="../../../typings/jquery/jquery.d.ts" />

'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import __observable = services.observable;

export var moduleName: string = 'rl.utilities.services.contentProvider';
export var serviceName: string = 'contentProviderFactory';

export interface IContentProviderService {
	setContent(content: JQuery): void;
	setTranscludeContent(transcludeFunction: ng.ITranscludeFunction): void;
	getContent(selector?: string): JQuery;
	register(action: {(newText: JQuery): void}, selector?: string): __observable.IUnregisterFunction;
}

class ContentProviderService implements IContentProviderService {
	constructor(observableFactory: __observable.IObservableServiceFactory) {
		this.observable = observableFactory.getInstance();
	}

	private observable: __observable.IObservableService;
	private content: JQuery;

	setContent(content: JQuery): void {
		this.content = content;
		this.observable.fire('contentChanged');
	}

	setTranscludeContent: {(transcludeFunction: ng.ITranscludeFunction): void} = (transcludeFunction: ng.ITranscludeFunction): void => {
		if (_.isFunction(transcludeFunction)) {
			transcludeFunction((clone: JQuery): void => {
				this.setContent(clone);
			});
		} else {
			this.setContent(null);
		}
	}

	register(action: {(newContent: JQuery): void}, selector?: string): __observable.IUnregisterFunction {
		if (this.content != null) {
			action(this.getContent(selector));
		}

		return this.observable.register((): void => {
			action(this.getContent(selector));
		}, 'contentChanged');
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

contentProviderServiceFactory.$inject = [__observable.factoryName];
function contentProviderServiceFactory(observableFactory: __observable.IObservableServiceFactory): IContentProviderServiceFactory {
	'use strict';

	return {
		getInstance(): IContentProviderService {
			return new ContentProviderService(observableFactory);
		}
	};
}

ng.module(moduleName, [__observable.moduleName])
	.factory(serviceName, contentProviderServiceFactory);
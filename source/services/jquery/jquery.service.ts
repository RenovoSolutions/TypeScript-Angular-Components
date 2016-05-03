// /// <reference path="../../../typings/jquery/jquery.d.ts" />

'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.utilities.services.jquery';
export var serviceName: string = 'jqueryUtility';

export interface IJQueryUtility {
	getHtml(jquery: JQuery): string;
	replaceContent(contentArea: JQuery, newContents: JQuery): JQuery;
}

class JQueryUtility implements IJQueryUtility {
	getHtml(jquery: JQuery): string {
		return angular.element('<div>').append(jquery).html()
	}

	replaceContent(contentArea: JQuery, newContent: JQuery): JQuery {
		contentArea.empty();
		return contentArea.append(newContent);
	}
}

angular.module(moduleName, [])
	.service(serviceName, JQueryUtility);

'use strict';

import * as angular from 'angular';
import * as $ from 'jquery';

export var moduleName: string = 'rl.ui.services.windowWrapper';
export var serviceName: string = 'windowWrapper';

export interface IWindowService {
	resize(callback: { (event: JQueryEventObject): any }): void;
	scrollTop(): number;
}

class WindowService {
	private windowControl: JQuery = $(window);

	resize(callback: { (event: JQueryEventObject): any }): void {
		this.windowControl.resize(callback);
	}

	scrollTop(): number {
		return this.windowControl.scrollTop();
	}
}

angular.module(moduleName, [])
	.service(serviceName, WindowService);

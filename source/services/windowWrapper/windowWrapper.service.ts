// uses typings/jquery

// /// <reference path='../../typings/jquery/jquery.d.ts' />
// /// <reference path='../../typings/angularjs/angular.d.ts' />

module rl.ui.services {
	'use strict';
	
	export var moduleName: string = 'rl.ui.services.windowWrapper';
	export var serviceName: string = 'windowWrapper';
	
	export interface IWindowService {
		resize(callback: {(event: JQueryEventObject): any }): void;
	}
	
	class WindowService {
		private windowControl: JQuery = $(window);
	
		resize(callback: { (event: JQueryEventObject): any }): void {
			this.windowControl.resize(callback);
		}
	}
	
	angular.module(moduleName, [])
		.service(serviceName, WindowService);
}

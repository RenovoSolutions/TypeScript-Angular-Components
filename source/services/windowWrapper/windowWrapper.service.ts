import * as angular from 'angular';
import * as $ from 'jquery';

export var moduleName: string = 'rl.ui.services.windowWrapper';
export var serviceName: string = 'windowWrapper';

export interface IWindowService {
	resize(callback: { (event: JQueryEventObject): any }): void;
	scrollTop(): number;
	scroll(handler: IScrollHandler): void;
	height(): number;
}

export interface IScrollHandler {
	(event: JQueryEventObject): any;
}

class WindowService {
	private windowControl: JQuery = $(window);

	resize(callback: { (event: JQueryEventObject): any }): void {
		this.windowControl.resize(callback);
	}

	scrollTop(): number {
		return this.windowControl.scrollTop();
	}

	scroll(handler: IScrollHandler): void {
		this.windowControl.scroll(handler);
	}

	height(): number {
		return this.windowControl.height();
	}
}

angular.module(moduleName, [])
	.service(serviceName, WindowService);

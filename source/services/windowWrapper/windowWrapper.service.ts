import { Injectable } from '@angular/core';
import * as $ from 'jquery';

export interface IWindowService {
	resize(callback: { (event: JQueryEventObject): any }): void;
	scrollTop(): number;
	scroll(handler: IScrollHandler): void;
	height(): number;
}

export interface IScrollHandler {
	(event: JQueryEventObject): any;
}

@Injectable()
export class WindowService {
	private windowControl: JQuery;

	constructor() {
		this.windowControl = $(window);
	}

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
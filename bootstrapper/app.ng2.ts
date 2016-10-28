import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'ts-app',
	template: require('./app.html'),
})
export class App {
	constructor(router: Router) {
		router['initialNavigation']();
	}
}

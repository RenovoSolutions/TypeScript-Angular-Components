import { Component, ElementRef } from '@angular/core';

@Component({
	selector: 'rlTabHeader',
	template: require('./tabHeader.component.html')
})

export class TabHeaderComponent {

	constructor(private el: ElementRef) {
	}

	get innerHTML(): string {
		return this.el.nativeElement.innerHTML;
	}
}
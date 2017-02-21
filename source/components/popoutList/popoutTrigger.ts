import { Directive, HostListener } from '@angular/core';

import { PopoutListService } from './popoutList.service';

@Directive({
	selector: '[rlPopoutTrigger]',
})
export class PopoutTriggerDirective {
	@HostListener('keyup.arrowdown') downArrow = () => this.next();
	@HostListener('keyup.arrowup') upArrow = () => this.previous();
	@HostListener('click') toggle = () => this.toggleList();
	@HostListener('keyup.enter') onEnter = () => this.select();

	popoutListService: PopoutListService<any>;

	constructor(popoutListService: PopoutListService<any>) {
		this.popoutListService = popoutListService;
	}

	toggleList(): void {
		if (this.popoutListService.showOptions) {
			this.popoutListService.close();
		} else {
			this.popoutListService.open();
		}
	}

	next(): void {
		if (this.popoutListService.showOptions) {
			this.popoutListService.focusNext();
		}
	}

	previous(): void {
		if (this.popoutListService.showOptions) {
			this.popoutListService.focusPrevious();
		}
	}

	select(): void {
		if (this.popoutListService.current) {
			this.popoutListService.selectCurrent();
		} else {
			this.popoutListService.close();
		}
	}
}

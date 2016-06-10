import { Directive, Host, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Directive({
	selector: '[offClick]',
	host: {
		'(click)': 'onClick($event)',
	},
})
export class OffClickDirective implements OnInit, OnDestroy {
	@Output('offClick') offClick: EventEmitter<any> = new EventEmitter();

	listener: { ($event: MouseEvent): void } = ($event) => this.offClick.emit($event);

	ngOnInit() {
		setTimeout(() => {
			document.addEventListener('click', this.listener);
		}, 0);
	}

	ngOnDestroy() {
		document.removeEventListener('click', this.listener);
	}

	onClick($event) {
		$event.stopPropagation();
	}
}
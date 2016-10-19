import { AnimationEntryMetadata, trigger, state, style, transition, animate } from '@angular/core';

export const slide = trigger('slide', [
	state('hide', style({
		opacity: 0,
		transform: 'translateY(100%)',
	})),
	state('show', style({
		opacity: 1,
		transform: 'translateY(0)',
	})),
	transition('hide <=> show', animate('250ms ease')),
]);
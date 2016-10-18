import { AnimationEntryMetadata, trigger, state, style, transition, animate } from '@angular/core';

export const labelSlide = trigger('labelSlide', [
	state('hideLabel', style({
		opacity: 0,
		transform: 'translateY(100%)',
	})),
	state('showLabel', style({
		opacity: 1,
		transform: 'translateY(0)',
	})),
	transition('hideLabel <=> showLabel', animate('250ms ease')),
]);
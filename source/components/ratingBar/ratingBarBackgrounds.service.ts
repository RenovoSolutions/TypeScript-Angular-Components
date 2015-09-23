module rl.ui.components.ratingBar {
	'use strict';

	export interface IRatingBarBackgroundsService {
		standard: IBackgroundType;
		dark: IBackgroundType;
		transparent: IBackgroundType;
		getBackground(type: string): string;
	}

	export interface IBackgroundType {
		type: string;
		class: string;
	}

	export class RatingBarBackgroundService implements IRatingBarBackgroundsService {
		standard: IBackgroundType = {
			type: 'standard',
			class: 'background',
		};
		dark: IBackgroundType = {
			type: 'dark',
			class: 'background-dark',
		};
		transparent: IBackgroundType = {
			type: 'transparent',
			class: 'background-transparent',
		};

		getBackground(type: string): string {
			if (type === this.dark.type) {
				return this.dark.class;
			} else if (type === this.transparent.type) {
				return this.transparent.class;
			} else {
				return this.standard.class;
			}
		}
	}
}

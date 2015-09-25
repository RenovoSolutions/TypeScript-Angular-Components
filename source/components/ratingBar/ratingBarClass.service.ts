'use strict';

export interface IRatingBarClassService {
	getClass(confidence: number): string;
}

export class RatingBarClassService implements IRatingBarClassService {
	getClass(confidence: number): string {
		if (confidence >= 0.8) {
			return 'very-high';
		} else if (confidence >= 0.6) {
			return 'high';
		} else if (confidence >= 0.4) {
			return 'medium';
		} else if (confidence >= 0.2) {
			return 'low';
		} else {
			return 'very-low';
		}
	}
}

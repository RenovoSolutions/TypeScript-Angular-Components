import { Component, Input } from '@angular/core';

import { filters } from 'typescript-angular-utilities';

@Component({
	selector: 'rlStringWithWatermark',
	template: require('./stringWithWatermark.html'),
	pipes: [filters.isEmpty.IsEmptyPipe],
})
export class StringWithWatermarkComponent {
	@Input() string: string;
	@Input() watermark: string;
}

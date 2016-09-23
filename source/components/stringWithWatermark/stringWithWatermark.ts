import { Component, Input } from '@angular/core';

@Component({
	selector: 'rlStringWithWatermark',
	template: require('./stringWithWatermark.html'),
})
export class StringWithWatermarkComponent {
	@Input() string: string;
	@Input() watermark: string;
}

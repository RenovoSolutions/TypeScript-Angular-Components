import { RatingBarComponent } from './ratingBar';

import { RatingBarBackgroundService } from './ratingBarBackgrounds.service';
import { RatingBarClassService } from './ratingBarClass.service';

describe('RatingBarComponent', () => {
	let ratingBar: RatingBarComponent;
	let ratingBarBackgrounds: RatingBarBackgroundService;
	let ratingBarClass: RatingBarClassService;

	beforeEach(() => {
		ratingBarBackgrounds = new RatingBarBackgroundService();
		ratingBarClass = new RatingBarClassService();
		ratingBar = new RatingBarComponent({ useDefaultTheme: true });
	});

	describe('background', (): void => {
		it('should set the background to dark', (): void => {
			ratingBar.background = ratingBarBackgrounds.dark.type;
			ratingBar.ngOnInit();
			expect(ratingBar.backgroundClass).to.equal(ratingBarBackgrounds.dark.class);
		});

		it('should set the background to transparent', (): void => {
			ratingBar.background = ratingBarBackgrounds.transparent.type;
			ratingBar.ngOnInit();
			expect(ratingBar.backgroundClass).to.equal(ratingBarBackgrounds.transparent.class);
		});

		it('should use the default background', (): void => {
			ratingBar.ngOnInit();
			expect(ratingBar.backgroundClass).to.equal(ratingBarBackgrounds.standard.class);
		});
	});

	describe('dimensions', (): void => {
		it('should set the dimensions to tne number passed in plus 2 pixels on each size', (): void => {
			ratingBar.height = 20;
			ratingBar.width = 30;
			ratingBar.ngOnInit();

			expect(ratingBar.dimensions.height).to.equal(22);
			expect(ratingBar.dimensions.width).to.equal(32);

			// only the width can be updated dynamically from outside the directive
			ratingBar.ngOnChanges({
				width: <any>{ currentValue: 40 },
			});

			expect(ratingBar.dimensions.width).to.equal(42);
		});
	});

	describe('confidence', (): void => {
		it('should default to 0 if no value is provided', (): void => {
			ratingBar.ngOnInit();
			expect(ratingBar.value).to.equal(0);
		});

		it('should set the width to the confidence score multiplied by the total width', (): void => {
			const value = 20;
			const maxValue = 40;
			const width = 20;

			ratingBar.value = value;
			ratingBar.min = 0;
			ratingBar.max = maxValue;
			ratingBar.width = width;

			const confidence = value / maxValue; // 20 / 40 = 0.5
			const calculatedWidth = confidence * width; // 0.5 * 20 = 10

			ratingBar.ngOnInit();

			expect(ratingBar.calculatedWidth).to.equal(calculatedWidth);
			expect(ratingBar.calculatedWidth).to.equal(10);
		});

		describe('class', (): void => {
			beforeEach((): void => {
				ratingBar.min = 0;
				ratingBar.max = 100;
			});

			it('should set the class to very high if the confidence is equal to or above 80%', (): void => {
				ratingBar.value = 80;
				ratingBar.ngOnInit();
				expect(ratingBar.barClass).to.equal('very-high');
			});

			it('should set the class to high if the confidence is between 60% and 80%', (): void => {
				ratingBar.value = 60;
				ratingBar.ngOnInit();
				expect(ratingBar.barClass).to.equal('high');
			});

			it('should set the class to high if the confidence is between 40% and 60%', (): void => {
				ratingBar.value = 40;
				ratingBar.ngOnInit();
				expect(ratingBar.barClass).to.equal('medium');
			});

			it('should set the class to high if the confidence is between 20% and 40%', (): void => {
				ratingBar.value = 20;
				ratingBar.ngOnInit();
				expect(ratingBar.barClass).to.equal('low');
			});

			it('should set the class to very high if the confidence is equal to or below 20%', (): void => {
				ratingBar.value = 0;
				ratingBar.ngOnInit();
				expect(ratingBar.barClass).to.equal('very-low');
			});

			it('should update the confidence when the value changes', (): void => {
				ratingBar.value = 0;
				ratingBar.ngOnInit();

				ratingBar.ngOnChanges({
					value: <any>{ currentValue: 20 },
				});

				expect(ratingBar.barClass).to.equal('low');
			});
		});
	});
});

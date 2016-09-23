import { services } from 'typescript-angular-utilities';
import __object = services.object;

import { IsEmptyPipe } from './isEmpty.pipe';

describe('isEmpty', () => {
	let isEmpty: IsEmptyPipe;

	beforeEach(() => {
		isEmpty = new IsEmptyPipe(__object.objectUtility);
	});

	it('should return true if the array is null or empty', (): void => {
		expect(isEmpty.transform(null)).to.be.true;
		expect(isEmpty.transform([])).to.be.true;
	});

	it('should return false if the array has items', (): void => {
		expect(isEmpty.transform([1, 2, 3])).to.be.false;
		expect(isEmpty.transform(['1', '2', '3'])).to.be.false;
	});

	it('should invert the result if trueIfEmpty is specified as false', (): void => {
		expect(isEmpty.transform(null, false)).to.be.false;
		expect(isEmpty.transform([1, 2, 3], false)).to.be.true;
	});
});

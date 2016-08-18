import { SizeForBreakpoints } from './sizeForBreakpoints';

import { services } from 'typescript-angular-utilities';
import __string = services.string;
import __object = services.object;

describe('SizeForBreakpoints', () => {
	let sizeForBreakpoints: SizeForBreakpoints;

	beforeEach(() => {
		sizeForBreakpoints = new SizeForBreakpoints(__string.stringUtility, __object.objectUtility);
	});

	it('should convert an object of breakpoint sizes into a class string', () => {
		const sizes = {
			lg: 4,
			md: 3,
			sm: 2,
			xs: 1,
		};
		expect(sizeForBreakpoints.getClass(sizes, '')).to.equal('col-xs-1 col-sm-2 col-md-3 col-lg-4 ');
	});

	it('should specify hidden for sizes that are not present', () => {
		const sizes = {
			lg: 4,
			md: 3,
			sm: 0,
			xs: 0,
		};
		expect(sizeForBreakpoints.getClass(sizes, '')).to.equal('hidden-xs hidden-sm col-md-3 col-lg-4 ');
	});

	it('should append custom styling to the end of the class string', () => {
		const sizes = {
			lg: 1,
			md: 1,
			sm: 1,
			xs: 1,
		};
		expect(sizeForBreakpoints.getClass(sizes, 'my-class')).to.equal('col-xs-1 col-sm-1 col-md-1 col-lg-1 my-class');
	});

	it('should cascade smaller sizes up', () => {
		const sizes = {
			xs: 1,
			md: 3,
		};
		const builtSizes = sizeForBreakpoints.buildSizes(sizes);

		expect(builtSizes.xs).to.equal(1);
		expect(builtSizes.sm).to.equal(1);
		expect(builtSizes.md).to.equal(3);
		expect(builtSizes.lg).to.equal(3);
	});

	it('should fill empty sizes with 0', () => {
		const builtSizes = sizeForBreakpoints.buildSizes({});

		expect(builtSizes.xs).to.equal(0);
		expect(builtSizes.sm).to.equal(0);
		expect(builtSizes.md).to.equal(0);
		expect(builtSizes.lg).to.equal(0);
	});

	it('should use a constant size for all breakpoints', () => {
		const builtSizes = sizeForBreakpoints.buildSizes(2);

		expect(builtSizes.xs).to.equal(2);
		expect(builtSizes.sm).to.equal(2);
		expect(builtSizes.md).to.equal(2);
		expect(builtSizes.lg).to.equal(2);
	});
});
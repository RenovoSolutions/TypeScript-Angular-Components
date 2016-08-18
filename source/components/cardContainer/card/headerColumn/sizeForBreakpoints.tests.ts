import { SizeForBreakpoints } from './sizeForBreakpoints';

import { services } from 'typescript-angular-utilities';
import __string = services.string;

describe('SizeForBreakpoints', () => {
	let sizeForBreakpoints: SizeForBreakpoints;

	beforeEach(() => {
		sizeForBreakpoints = new SizeForBreakpoints(__string.stringUtility);
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
});
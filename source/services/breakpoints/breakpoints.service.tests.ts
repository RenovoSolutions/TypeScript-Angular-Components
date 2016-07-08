import {
	IBreakpointService,
	xs,
	sm,
	md,
	lg,
	moduleName,
	breakpointServiceName,
} from './breakpoints.module';

import { services } from 'typescript-angular-utilities';
import {BreakpointService } from './breakpoints.service';

import test = services.test;

interface IVisibleBreakpointsMock {
	isVisible(breakpoint: string): boolean;
}

interface IWindowServiceMock {
	resize(callback: { (event: JQueryEventObject): any }): void;
}

describe('breakpoints', () => {
	var breakpoints: IBreakpointService;

	var visibleBreakpoint: string;
	var triggerResize: { (): void };

	beforeEach((): void => {
		angular.mock.module(moduleName);
	});

	it('should have visible breakpoint marked as current', (): void => {
		visibleBreakpoint = md;

		buildService();

		expect(breakpoints.currentBreakpoint).to.equal(md);
		expect(breakpoints.isBreakpoint(md)).to.be.true;
		expect(breakpoints.isBreakpoint(lg)).to.be.false;
		expect(breakpoints.isBreakpoint(sm)).to.be.false;
		expect(breakpoints.isBreakpoint(xs)).to.be.false;
	});

	it('should signal subscribed listeners when the breakpoint changes', (): void => {
		var breakpointChangeSpy: Sinon.SinonSpy = sinon.spy();

		visibleBreakpoint = sm;

		buildService();

		breakpoints.breakpointChanges.subscribe(breakpointChangeSpy);

		visibleBreakpoint = md;
		triggerResize();

		expect(breakpoints.currentBreakpoint).to.equal(md);
		expect(breakpoints.isBreakpoint(md)).to.be.true;
		expect(breakpoints.isBreakpoint(lg)).to.be.false;
		expect(breakpoints.isBreakpoint(sm)).to.be.false;
		expect(breakpoints.isBreakpoint(xs)).to.be.false;

		sinon.assert.calledOnce(breakpointChangeSpy);
	});

	function buildService(): void {
		var mockVisibleBreakpointService: IVisibleBreakpointsMock = {
			isVisible: (breakpoint: string): boolean => {
				return breakpoint === visibleBreakpoint;
			},
		};

		var mockWindowControl: IWindowServiceMock = {
			resize: (callback: { (): void }): void => {
				triggerResize = callback;
			},
		};

		breakpoints = new BreakpointService(mockVisibleBreakpointService, 1000, <any>mockWindowControl);
	}
});

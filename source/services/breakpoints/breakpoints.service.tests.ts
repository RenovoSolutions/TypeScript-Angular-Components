import {
	IBreakpointService,
	xs,
	sm,
	md,
	lg,
	moduleName,
	breakpointServiceName,
} from './breakpoints.module';

import {BreakpointService } from './breakpoints.service';


interface IVisibleBreakpointsMock {
	isVisible(breakpoint: string): boolean;
}

interface IWindowServiceMock {
	resize(callback: { (event: JQueryEventObject): any }): void;
}

describe('breakpoints', () => {
	let breakpoints: IBreakpointService;

	let visibleBreakpoint: string;
	let triggerResize: { (): void };

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
		let breakpointChangeSpy: sinon.SinonSpy = sinon.spy();

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
		let mockVisibleBreakpointService: IVisibleBreakpointsMock = {
			isVisible: (breakpoint: string): boolean => {
				return breakpoint === visibleBreakpoint;
			},
		};

		let mockWindowControl: IWindowServiceMock = {
			resize: (callback: { (): void }): void => {
				triggerResize = callback;
			},
		};

		breakpoints = new BreakpointService(<any>mockVisibleBreakpointService, <any>mockWindowControl);
	}
});

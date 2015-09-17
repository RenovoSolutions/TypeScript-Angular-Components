// /// <reference path='../../typings/angularjs/angular.d.ts' />

/// <reference path='visibleBreakpoint.service.ts' />

module rl.ui.services.breakpoints {
	export var moduleName: string = 'rl.ui.services.breakpoints';
	
	angular.module(moduleName, [
		
	])
		.service(visibleBreakpointServiceName, VisibleBreakpointService);
}

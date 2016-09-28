import * as ng from 'angular';

declare module 'angular' {
	interface ITranscludeFunction {
		// If the scope is provided, then the cloneAttachFn must be as well.
		(scope: ng.IScope, cloneAttachFn: ng.ICloneAttachFunction, futureParent?: ng.IAugmentedJQuery, slotName?: string): ng.IAugmentedJQuery;
		// If one argument is provided, then it's assumed to be the cloneAttachFn.
		(cloneAttachFn?: ng.ICloneAttachFunction, futureParent?: ng.IAugmentedJQuery, slotName?: string): ng.IAugmentedJQuery;

		isSlotFilled(slotName: string): boolean;
	}
}
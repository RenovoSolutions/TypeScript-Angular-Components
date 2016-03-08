/// <reference path="angularjs/angular.d.ts" />

declare module angular {
	interface ITranscludeFunction {
		// If the scope is provided, then the cloneAttachFn must be as well.
		(scope: IScope, cloneAttachFn: ICloneAttachFunction, futureParent?: IAugmentedJQuery, slotName?: string): IAugmentedJQuery;
		// If one argument is provided, then it's assumed to be the cloneAttachFn.
		(cloneAttachFn?: ICloneAttachFunction, futureParent?: IAugmentedJQuery, slotName?: string): IAugmentedJQuery;
	}
}

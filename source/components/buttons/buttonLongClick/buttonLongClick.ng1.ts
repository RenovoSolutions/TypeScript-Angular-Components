import * as angular from 'angular';

import { services, downgrade } from 'typescript-angular-utilities';
import __object = services.object;
import __notification = services.notification;
import __timeout = services.timeout;

import { IPromiseUtility, serviceName as promiseServiceName, moduleName as promiseModuleName} from '../../../services/promise/promise.service';


import { buildButton } from '../button/button.ng1';
import { ButtonAsyncController } from '../buttonAsync/buttonAsync.ng1';

export let moduleName: string = 'rl.ui.components.longClickButton';
export let componentName: string = 'rlLongClickButton';
export let controllerName: string = 'LongClickButtonController';

export class LongClickButtonController extends ButtonAsyncController {
	// bindings
	warning: string;
	text: string;
	onShortClickText: string;
	icon: string;

	duration: number = 2000; // Should match the CSS animation time
	active: boolean;
	private timer: __timeout.ITimeout;

	static $inject: string[] = ['$scope', downgrade.timeoutServiceName, downgrade.objectServiceName, promiseServiceName, downgrade.notificationServiceName];
	constructor(private $scope: angular.IScope
			, private timeoutService: __timeout.TimeoutService
			, private objectUtility: __object.IObjectUtility
			, promise: IPromiseUtility
			, private notification: __notification.INotificationService) {
		super(promise);
	}

	startAction(): void {
		if (this.active || this.busy) {
			return;
		}

		this.active = true;

		this.timer = this.timeoutService.setTimeout((): void => {
			this.cleanup();
			this.trigger();
			this.$scope.$apply();
		}, this.duration).catch(() => null);
	}

	stopAction(): void {
		if (this.active) {
			if (this.timer != null) {
				this.warn();
			}

			this.cleanup();
		}
	}

	private cleanup(): void {
		this.timer.cancel();
		this.timer = null;
		this.active = false;
	}

	private warn(): void {
		const warning: string = this.warning || this.onShortClickText || 'Press and hold to complete this action';
		this.notification.warning(warning);
	}
}

let longClickButton: angular.IComponentOptions = buildButton({
	template: require('./buttonLongClick.ng1.html'),
	controller: controllerName,
	bindings: {
		warning: '@',
		busy: '<?',
		// deprecated
		onShortClickText: '@',
		icon: '@',
		text: '@',
	},
});

angular.module(moduleName, [downgrade.moduleName, promiseModuleName])
	.component(componentName, longClickButton)
	.controller(controllerName, LongClickButtonController)
	.directive('myTouchstart', [function () {
		return function(scope, element, attr) {

			element.on('touchstart', function(event) {
				scope.$apply(function() {
					scope.$eval(attr.myTouchstart);
				});

				event.preventDefault();
			});
		};
	}]).directive('myTouchend', [function() {
		return function(scope, element, attr) {

			element.on('touchend', function(event) {
				scope.$apply(function() {
					scope.$eval(attr.myTouchend);
				});

				event.preventDefault();
			});
		};
	}]);

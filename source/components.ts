/// <reference path="../typings/angularjs/angular.d.ts" />

export var name: string = 'rl.components';

import __autosaveComponent = require('./autosaveComponent/autosaveComponent.module');
import __autosaveDialog = require('./autosaveDialog/autosaveDialog.module');
import __button = require('./button/button.module');
import __dialog = require('./dialog/dialog.module');
import __userRating = require('./userRating/userRating.module');

angular.module(name, [
	__autosaveComponent.name,
	__autosaveDialog.name,
	__button.name,
	__dialog.name,
	__userRating.name,
]);
'use strict';

export var name: string = 'rl21.components.dialog';

import __dialog = require('./dialog');

import __objectUtility = require('../../services/objectUtility/objectUtility.module');

angular.module(name, [__objectUtility.name])
	.directive(__dialog.directiveName, __dialog.dialog)
	.controller(__dialog.controllerName, __dialog.DialogController);

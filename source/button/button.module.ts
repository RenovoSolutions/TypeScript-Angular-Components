'use strict';

export var name: string = 'rl21.components.button';

import buttonDirective = require('./button');

import __promiseUtility = require('../../services/promiseUtility/promiseUtility.module');

angular.module(name, [__promiseUtility.name])
	.directive(buttonDirective.directiveName, buttonDirective.button)
	.controller(buttonDirective.controllerName, buttonDirective.ButtonController);

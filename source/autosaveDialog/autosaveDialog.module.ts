'use strict';

export var name: string = 'rl21.components.autosaveDialog';

import __autosaveDialog = require('./autosaveDialog');

import __parentChildBehavior = require('../../services/parentChildBehavior/parentChildBehavior.module');

angular.module(name, [__parentChildBehavior.name])
	.directive(__autosaveDialog.directiveName, __autosaveDialog.AutosaveDialog.instance)
	.controller(__autosaveDialog.controllerName, __autosaveDialog.AutosaveDialogController);

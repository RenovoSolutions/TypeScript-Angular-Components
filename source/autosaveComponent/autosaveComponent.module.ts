'use strict';

export var name: string = 'rl21.components.autosaveComponent';

import __autosaveComponent = require('./autosaveComponent');

import __parentChildBehavior = require('../../services/parentChildBehavior/parentChildBehavior.module');
import __objectUtility = require('../../services/objectUtility/objectUtility.module');
import __autosave = require('../../services/autosave/autosave.module');

angular.module(name, [__parentChildBehavior.name, __objectUtility.name, __autosave.name])
	.directive(__autosaveComponent.directiveName, __autosaveComponent.autosaveComponent)
	.controller(__autosaveComponent.controllerName, __autosaveComponent.AutosaveComponentController);

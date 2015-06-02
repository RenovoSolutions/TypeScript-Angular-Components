'use strict';

export var name: string = 'rl21.components.userRating';

import __userRating = require('./userRating');

angular.module(name, [])
	.directive(__userRating.directiveName, __userRating.userRating)
	.controller(__userRating.controllerName, __userRating.UserRatingController);

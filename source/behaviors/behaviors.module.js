"use strict";
var angular = require('angular');
var alias = require('./alias/alias');
exports.alias = alias;
var autosave = require('./autosave/autosave');
exports.autosave = autosave;
var popover = require('./popover/popover');
exports.popover = popover;
var required = require('./required/required');
exports.required = required;
exports.moduleName = 'rl.ui.behaviors';
angular.module(exports.moduleName, [
    alias.moduleName,
    autosave.moduleName,
    popover.moduleName,
    required.moduleName,
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJlaGF2aW9ycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLElBQVksS0FBSyxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBSzlCLGFBQUs7QUFKZCxJQUFZLFFBQVEsV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBSWhDLGdCQUFRO0FBSHhCLElBQVksT0FBTyxXQUFNLG1CQUFtQixDQUFDLENBQUE7QUFHbkIsZUFBTztBQUZqQyxJQUFZLFFBQVEsV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBRWIsZ0JBQVE7QUFFaEMsa0JBQVUsR0FBVyxpQkFBaUIsQ0FBQztBQUVsRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUU7SUFDMUIsS0FBSyxDQUFDLFVBQVU7SUFDaEIsUUFBUSxDQUFDLFVBQVU7SUFDbkIsT0FBTyxDQUFDLFVBQVU7SUFDbEIsUUFBUSxDQUFDLFVBQVU7Q0FDbkIsQ0FBQyxDQUFDIn0=
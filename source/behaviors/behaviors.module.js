"use strict";
var angular = require('angular');
var alias = require('./alias/alias');
exports.alias = alias;
var alternatingClass = require('./alternatingClass/alternatingClass');
var autosave = require('./autosave/autosave');
exports.autosave = autosave;
var popover = require('./popover/popover');
exports.popover = popover;
var required = require('./required/required');
exports.required = required;
exports.moduleName = 'rl.ui.behaviors';
angular.module(exports.moduleName, [
    alias.moduleName,
    alternatingClass.moduleName,
    autosave.moduleName,
    popover.moduleName,
    required.moduleName,
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJlaGF2aW9ycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLElBQVksS0FBSyxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBTTlCLGFBQUs7QUFMZCxJQUFZLGdCQUFnQixXQUFNLHFDQUFxQyxDQUFDLENBQUE7QUFDeEUsSUFBWSxRQUFRLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQUloQyxnQkFBUTtBQUh4QixJQUFZLE9BQU8sV0FBTSxtQkFBbUIsQ0FBQyxDQUFBO0FBR25CLGVBQU87QUFGakMsSUFBWSxRQUFRLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQUViLGdCQUFRO0FBRWhDLGtCQUFVLEdBQVcsaUJBQWlCLENBQUM7QUFFbEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFO0lBQzFCLEtBQUssQ0FBQyxVQUFVO0lBQ2hCLGdCQUFnQixDQUFDLFVBQVU7SUFDM0IsUUFBUSxDQUFDLFVBQVU7SUFDbkIsT0FBTyxDQUFDLFVBQVU7SUFDbEIsUUFBUSxDQUFDLFVBQVU7Q0FDbkIsQ0FBQyxDQUFDIn0=
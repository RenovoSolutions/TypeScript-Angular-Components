"use strict";
var angular = require('angular');
var date = require('./date/date.filter');
exports.date = date;
var localizeStringDates = require('./localizeStringDates/localizeStringDates.filter');
exports.localizeStringDates = localizeStringDates;
exports.moduleName = 'rl.ui.filters';
angular.module(exports.moduleName, [
    date.moduleName,
    localizeStringDates.moduleName
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWx0ZXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsSUFBWSxJQUFJLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUVsQyxZQUFJO0FBRGIsSUFBWSxtQkFBbUIsV0FBTSxrREFBa0QsQ0FBQyxDQUFBO0FBRS9FLDJCQUFtQjtBQUVqQixrQkFBVSxHQUFXLGVBQWUsQ0FBQztBQUVoRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUU7SUFDMUIsSUFBSSxDQUFDLFVBQVU7SUFDZixtQkFBbUIsQ0FBQyxVQUFVO0NBQzlCLENBQUMsQ0FBQyJ9
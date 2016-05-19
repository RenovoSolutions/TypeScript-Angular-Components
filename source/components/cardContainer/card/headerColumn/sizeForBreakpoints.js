"use strict";
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var breakpoint_1 = require('../../../../services/breakpoints/breakpoint');
exports.sizeForBreakpointsName = 'rlSizeForBreakpoints';
sizeForBreakpoints.$inject = ['$parse', typescript_angular_utilities_1.downgrade.stringServiceName];
function sizeForBreakpoints($parse, stringUtility) {
    'use strict';
    return {
        restrict: 'A',
        link: linkDirective
    };
    function linkDirective(scope, element, attributes) {
        var sizes = $parse(attributes.rlSizeForBreakpoints)(scope);
        var styling = $parse(attributes.styling)(scope);
        var classes = [];
        classes.push(getColumnClass(sizes, breakpoint_1.xs));
        classes.push(getColumnClass(sizes, breakpoint_1.sm));
        classes.push(getColumnClass(sizes, breakpoint_1.md));
        classes.push(getColumnClass(sizes, breakpoint_1.lg));
        element.addClass(classes.join(' '));
        if (styling != null) {
            element.addClass(styling);
        }
    }
    function getColumnClass(columnSizes, attribute) {
        var value = columnSizes[attribute];
        if (value > 0 && value !== 'hidden') {
            return stringUtility.substitute('col-{0}-{1}', attribute, value);
        }
        else {
            return 'hidden-' + attribute;
        }
    }
}
exports.sizeForBreakpoints = sizeForBreakpoints;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZUZvckJyZWFrcG9pbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2l6ZUZvckJyZWFrcG9pbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSw2Q0FBb0MsOEJBQThCLENBQUMsQ0FBQTtBQUduRSwyQkFBK0IsNkNBQTZDLENBQUMsQ0FBQTtBQUdsRSw4QkFBc0IsR0FBVyxzQkFBc0IsQ0FBQztBQU9uRSxrQkFBa0IsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsd0NBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JFLDRCQUFtQyxNQUE2QixFQUFFLGFBQXNDO0lBQ3ZHLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxHQUFHO1FBQ2IsSUFBSSxFQUFFLGFBQWE7S0FDbkIsQ0FBQztJQUVGLHVCQUF1QixLQUFxQixFQUN6QyxPQUFpQyxFQUNqQyxVQUFtQztRQUNyQyxJQUFJLEtBQUssR0FBb0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVFLElBQUksT0FBTyxHQUFXLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxPQUFPLEdBQVUsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxlQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxlQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxlQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxlQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUVGLENBQUM7SUFFRCx3QkFBd0IsV0FBNEIsRUFBRSxTQUFpQjtRQUN0RSxJQUFJLEtBQUssR0FBb0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBVSxLQUFLLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM5QixDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUM7QUFqQ2UsMEJBQWtCLHFCQWlDakMsQ0FBQSJ9
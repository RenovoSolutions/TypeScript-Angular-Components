'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __string = typescript_angular_utilities_1.services.string;
var breakpoint_1 = require('../../../../services/breakpoints/breakpoint');
exports.sizeForBreakpointsName = 'rlSizeForBreakpoints';
sizeForBreakpoints.$inject = ['$parse', __string.serviceName];
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
//# sourceMappingURL=sizeForBreakpoints.js.map
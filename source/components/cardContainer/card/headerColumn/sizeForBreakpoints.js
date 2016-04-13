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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZUZvckJyZWFrcG9pbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2l6ZUZvckJyZWFrcG9pbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUliLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBRWxDLDJCQUErQiw2Q0FBNkMsQ0FBQyxDQUFBO0FBR2xFLDhCQUFzQixHQUFXLHNCQUFzQixDQUFDO0FBT25FLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDOUQsNEJBQW1DLE1BQTZCLEVBQUUsYUFBNkM7SUFDOUcsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDO1FBQ04sUUFBUSxFQUFFLEdBQUc7UUFDYixJQUFJLEVBQUUsYUFBYTtLQUNuQixDQUFDO0lBRUYsdUJBQXVCLEtBQXFCLEVBQ3pDLE9BQWlDLEVBQ2pDLFVBQW1DO1FBQ3JDLElBQUksS0FBSyxHQUFvQixNQUFNLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUUsSUFBSSxPQUFPLEdBQVcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCxJQUFJLE9BQU8sR0FBVSxFQUFFLENBQUM7UUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFeEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixDQUFDO0lBRUYsQ0FBQztJQUVELHdCQUF3QixXQUE0QixFQUFFLFNBQWlCO1FBQ3RFLElBQUksS0FBSyxHQUFvQixXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFVLEtBQUssQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzlCLENBQUM7SUFDRixDQUFDO0FBQ0YsQ0FBQztBQWpDZSwwQkFBa0IscUJBaUNqQyxDQUFBIn0=
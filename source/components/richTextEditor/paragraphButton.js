// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
exports.paragraphButtonDirectiveName = 'rlParagraphButton';
function paragraphButton() {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<button type=\"button\" class=\"nw-button paragraph\" ng-click=\"trigger()\" ng-disabled=\"editMode || isDisabled\" title=\"paragraph\"></button>\n\t\t",
        link: function (scope) {
            scope.trigger = function () {
                scope.execCommand('formatblock', 'p');
            };
        },
    };
}
exports.paragraphButton = paragraphButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYWdyYXBoQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyYWdyYXBoQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7QUFJRixvQ0FBNEIsR0FBVyxtQkFBbUIsQ0FBQztBQU90RTtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxHQUFHO1FBQ2IsUUFBUSxFQUFFLGlLQUVUO1FBQ0QsSUFBSSxZQUFDLEtBQTRCO1lBQ2hDLEtBQUssQ0FBQyxPQUFPLEdBQUc7Z0JBQ2YsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDO1FBQ0gsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBYmUsdUJBQWUsa0JBYTlCLENBQUEifQ==
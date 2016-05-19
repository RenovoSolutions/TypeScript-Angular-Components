"use strict";
exports.headerButtonDirectiveName = 'rlHeaderButton';
function headerButton() {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<button type=\"button\" class=\"nw-button header\" ng-click=\"trigger()\" ng-disabled=\"editMode || isDisabled\" title=\"Header 1\"></button>\n\t\t",
        link: function (scope) {
            scope.trigger = function () {
                scope.execCommand('formatblock', 'h1');
            };
        },
    };
}
exports.headerButton = headerButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVhZGVyQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFVyxpQ0FBeUIsR0FBVyxnQkFBZ0IsQ0FBQztBQU9oRTtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxHQUFHO1FBQ2IsUUFBUSxFQUFFLDZKQUVUO1FBQ0QsSUFBSSxZQUFDLEtBQXlCO1lBQzdCLEtBQUssQ0FBQyxPQUFPLEdBQUc7Z0JBQ2YsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDO1FBQ0gsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBYmUsb0JBQVksZUFhM0IsQ0FBQSJ9
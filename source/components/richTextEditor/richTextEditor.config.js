"use strict";
exports.providerName = 'richTextEditor';
richTextEditorProvider.$inject = ['ngWigToolbarProvider'];
function richTextEditorProvider(ngWigToolbarProvider) {
    'use strict';
    return {
        addCustomButton: function (name, component) {
            ngWigToolbarProvider.addCustomButton(name, component);
        },
        addStandardButton: function (name, tooltip, command, icon) {
            ngWigToolbarProvider.addStandardButton(name, toolbar, command, 'fa-' + icon);
        },
        $get: function () {
            ngWigToolbarProvider.addCustomButton('paragraph', 'rl-paragraph-button');
            ngWigToolbarProvider.addCustomButton('h1', 'rl-header-button');
            ngWigToolbarProvider.addStandardButton('underline', 'Underline', 'underline', 'fa-underline');
            ngWigToolbarProvider.addStandardButton('indent', 'Indent', 'indent', 'fa-indent');
            ngWigToolbarProvider.addStandardButton('outdent', 'Outdent', 'outdent', 'fa-outdent');
        },
    };
}
exports.richTextEditorProvider = richTextEditorProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljaFRleHRFZGl0b3IuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmljaFRleHRFZGl0b3IuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBVyxvQkFBWSxHQUFXLGdCQUFnQixDQUFDO0FBUW5ELHNCQUFzQixDQUFDLE9BQU8sR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDMUQsZ0NBQXVDLG9CQUF5QjtJQUMvRCxZQUFZLENBQUM7SUFFYixNQUFNLENBQUM7UUFDTixlQUFlLFlBQUMsSUFBWSxFQUFFLFNBQWlCO1lBQzlDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNELGlCQUFpQixZQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsT0FBZSxFQUFFLElBQVk7WUFDN0Usb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFDRCxJQUFJO1lBQ0gsb0JBQW9CLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3pFLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUMvRCxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUM5RixvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNsRixvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN2RixDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFsQmUsOEJBQXNCLHlCQWtCckMsQ0FBQSJ9
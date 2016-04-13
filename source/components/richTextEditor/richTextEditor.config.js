'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljaFRleHRFZGl0b3IuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmljaFRleHRFZGl0b3IuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUVGLG9CQUFZLEdBQVcsZ0JBQWdCLENBQUM7QUFRbkQsc0JBQXNCLENBQUMsT0FBTyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUMxRCxnQ0FBdUMsb0JBQXlCO0lBQy9ELFlBQVksQ0FBQztJQUViLE1BQU0sQ0FBQztRQUNOLGVBQWUsWUFBQyxJQUFZLEVBQUUsU0FBaUI7WUFDOUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0QsaUJBQWlCLFlBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxPQUFlLEVBQUUsSUFBWTtZQUM3RSxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUNELElBQUk7WUFDSCxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLHFCQUFxQixDQUFDLENBQUM7WUFDekUsb0JBQW9CLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQy9ELG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQzlGLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ2xGLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQWxCZSw4QkFBc0IseUJBa0JyQyxDQUFBIn0=
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
            ngWigToolbarProvider.addStandartButton(name, toolbar, command, 'fa-' + icon);
        },
        $get: function () {
            ngWigToolbarProvider.addCustomButton('paragraph', 'rl-paragraph-button');
            ngWigToolbarProvider.addCustomButton('h1', 'rl-header-button');
            ngWigToolbarProvider.addStandartButton('underline', 'Underline', 'underline', 'fa-underline');
            ngWigToolbarProvider.addStandartButton('indent', 'Indent', 'indent', 'fa-indent');
            ngWigToolbarProvider.addStandartButton('outdent', 'Outdent', 'outdent', 'fa-outdent');
        },
    };
}
exports.richTextEditorProvider = richTextEditorProvider;
//# sourceMappingURL=richTextEditor.config.js.map
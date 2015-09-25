'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

export var moduleName: string = 'rl.ui.components.richTextEditor';
export var directiveName: string = 'rlRichTextEditor';
export var controllerName: string = 'RichTextEditorController';

export interface IRichTextEditorBindings {
	ngModel: string;
	customButtons: string[];
}

export class RichTextEditorController {
	// bindings
	ngModel: string;
	customButtons: string[];

	toolbar: string[][];

	constructor() {
		this.toolbar = [
			['h1', 'bold', 'italics', 'underline', 'ul', 'ol', 'indent', 'outdent'],
			['html'],
		];

		_.each(this.customButtons, (button: string): void => {
			this.toolbar[1].push(button);
		});
	}
}

export function richTextEditor(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: `
			<div class="rich-text-editor">
				<text-angular ng-model="editor.ngModel" ta-toolbar="editor.toolbar"></text-angular>
			</div>
		`,
		controller: controllerName,
		controllerAs: 'editor',
		scope: {},
		bindToController: {
			ngModel: '=',
			customButtons: '=',
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, richTextEditor)
	.controller(controllerName, RichTextEditorController);

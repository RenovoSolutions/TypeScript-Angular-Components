import { Directive, Input, TemplateRef, ViewContainerRef, EmbeddedViewRef } from '@angular/core';

export interface ITemplateContext {
	$implicit: any;
}

// Renders the specified template on this element's host
// Also assigns the given model as an implicit local
@Directive({
	selector: 'rlTemplateRenderer',
})
export class TemplateRenderer {
	@Input() set template(value: TemplateRef<any>) {
		// Clear any previously rendered template
		if (this._view) {
			this._viewContainer.clear();
			this._view = null;
		}

		// If template exists, render
		if (value != null) {
			this._view = this._viewContainer.createEmbeddedView(value);

			// If model is present, set as implicit local
			if (this._model) {
				this.setLocal();
			}
		}
	}
	@Input() set model(value: any) {
		this._model = value;

		// If a template has already been rendered, set as implicit local
		if (this._view != null) {
			this.setLocal();
		}
	}

	_view: EmbeddedViewRef<ITemplateContext>;
	_model: any;

	constructor(private _viewContainer: ViewContainerRef) { }

	private setLocal() {
		this._view.context.$implicit = this._model;
	}
}

import * as angular from 'angular';
import * as $ from 'jquery';

export var moduleName: string = 'rl.ui.services.documentWrapper';
export var serviceName: string = 'documentWrapper';

export interface IDocumentService {
	height(): number;
}

class DocumentService {
	private documentControl: JQuery = $(document);

	height(): number {
		return this.documentControl.height();
	}
}

angular.module(moduleName, [])
	.service(serviceName, DocumentService);

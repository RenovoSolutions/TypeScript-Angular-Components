import { Injectable } from '@angular/core';
import * as $ from 'jquery';

export interface IDocumentService {
	height(): number;
}

@Injectable()
export class DocumentService {
	private documentControl: JQuery;

	constructor() {
		this.documentControl = $(document);
	}

	height(): number {
		return this.documentControl.height();
	}
}
import { ValueProvider } from '@angular/core';

export abstract class DocumentWrapper { }

export const DOCUMENT_PROVIDER: ValueProvider = {
	provide: DocumentWrapper,
	useValue: document,
};

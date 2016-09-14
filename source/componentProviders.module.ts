import { NgModule } from '@angular/core';

import { CARD_CONTAINER_PROVIDERS } from'./components/cardContainer/index';
import { DIALOG_PROVIDERS } from'./components/dialog/index';

@NgModule({
	providers: [CARD_CONTAINER_PROVIDERS, DIALOG_PROVIDERS],
})
export class ComponentProvidersModule { }

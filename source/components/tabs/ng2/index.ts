import { TabsetComponent } from './tabset';
import { TabComponent } from './tab/tab';
import { TabHeaderComponent } from './tab/tabHeader/index';
import { TabContentComponent } from './tab/tabContent/index';
import { TabFooterComponent } from './tab/tabFooter/index';


export const TABS_COMPONENT: any[] = [
	TabComponent,
	TabHeaderComponent,
	TabContentComponent,
	TabFooterComponent,
	TabsetComponent,
];

export * from './tab/tab';
export * from './tabset';
export * from './tab/tabHeader/index';
export * from './tab/tabContent/index';
export * from './tab/tabFooter/index';
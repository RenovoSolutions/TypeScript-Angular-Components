import { ColumnContentTemplate } from './columnContent.template';
import { ColumnHeaderTemplate } from './columnHeader.template';
import { ContainerHeaderTemplate } from './containerHeader.template';
import { ContainerFooterTemplate } from './containerFooter.template';
import { CARD_TEMPLATE_DIRECTIVES } from '../../cards/index';

export const TEMPLATE_DIRECTIVES: any[] = [CARD_TEMPLATE_DIRECTIVES, ColumnContentTemplate, ColumnHeaderTemplate, ContainerHeaderTemplate, ContainerFooterTemplate];

export * from './columnContent.template';
export * from './columnHeader.template';
export * from './containerHeader.template';
export * from './containerFooter.template';

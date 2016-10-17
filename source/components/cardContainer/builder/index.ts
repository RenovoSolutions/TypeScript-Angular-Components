import { CardContainerBuilderOld } from './cardContainerBuilderOld.service';
import { DataSourceBuilderOld } from './dataSourceBuilderOld.service';
import { FilterBuilderOld } from './filterBuilderOld.service';

export const BUILDER_PROVIDERS: any[] = [CardContainerBuilderOld, DataSourceBuilderOld, FilterBuilderOld];

export * from './cardContainerBuilderOld.service';
export * from './dataSourceBuilderOld.service';
export * from './filterBuilderOld.service';

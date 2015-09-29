import * as angular from 'angular';
import { IDataSource } from '../dataSources/dataSources.module';
export declare var moduleName: string;
export declare var directiveName: string;
export interface IItemCountScope extends angular.IScope {
    source: IDataSource<any>;
}
export declare function itemCount(): angular.IDirective;

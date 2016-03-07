import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __guid = services.guid;
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IPopoverAttributes extends angular.IAttributes {
    rlPopover: string;
    textOnly: string;
}
export declare class PopoverController {
    private $attrs;
    private $element;
    private $compile;
    private $scope;
    private $parse;
    private $templateCache;
    private guid;
    static $inject: string[];
    constructor($attrs: IPopoverAttributes, $element: angular.IAugmentedJQuery, $compile: angular.ICompileService, $scope: angular.IScope, $parse: angular.IParseService, $templateCache: angular.ITemplateCacheService, guid: __guid.IGuidService);
    $onInit(): void;
}
export declare function popover(): angular.IDirective;

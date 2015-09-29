import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import { IResponsiveCardGridController } from './responsiveCardGrid';
import { IJQueryUtility } from '../../services/jquery/jquery.service';
import { IAutosaveBehavior } from '../../behaviors/autosave/autosave';
export declare var directiveName: string;
export declare var controllerName: string;
import __parentChildBehavior = services.parentChildBehavior;
import __promiseUtility = services.promise;
export interface ICardHeader {
    name: string;
    summary?: {
        (): string;
    };
    summaryLength?: number;
    icon?: string;
    iconTooltip?: string;
    showIcon?: {
        (): boolean;
    };
    count?: {
        (): number;
    };
    status?: {
        (): string;
    };
}
export interface ICardBehavior {
    autosave(): boolean;
    close(): void;
    open(): void;
    hoverIn(): void;
    hoverOut(): void;
    updateEndOfRowStatus(): void;
}
export interface IResponsiveCardController {
    autosaveLink: __parentChildBehavior.IChild<IAutosaveBehavior>;
    showDetails: boolean;
    isHovering: boolean;
    cardGridController: IResponsiveCardGridController;
    toggle(): void;
    triggerHoverIn(): void;
    triggerHoverOut(): void;
}
export interface IResponsiveCardBindings {
    header: ICardHeader;
    validate(): boolean;
    save(): angular.IPromise<void>;
}
export declare class ResponsiveCardController implements IResponsiveCardController {
    private $scope;
    private $q;
    private $element;
    private parentChildBehavior;
    private promiseUtility;
    header: ICardHeader;
    validate: {
        (): boolean;
    };
    save: {
        (): angular.IPromise<void>;
    };
    static $inject: string[];
    constructor($scope: angular.IScope, $q: angular.IQService, $element: angular.IAugmentedJQuery, parentChildBehavior: __parentChildBehavior.IParentChildBehaviorService, promiseUtility: __promiseUtility.IPromiseUtility);
    private behavior;
    cardGridController: IResponsiveCardGridController;
    autosaveLink: __parentChildBehavior.IChild<IAutosaveBehavior>;
    showDetails: boolean;
    isHovering: boolean;
    isEndOfRow: boolean;
    summary: {
        (): string;
    };
    summaryLength: number;
    showIcon: {
        (): boolean;
    };
    private unregister;
    toggle(): void;
    triggerHoverIn(): void;
    triggerHoverOut(): void;
    private autosave;
    private close;
    private open;
    private hoverIn;
    private hoverOut;
    private updateEndOfRowStatus;
}
export declare function responsiveCard(jqueryHelper: IJQueryUtility): angular.IDirective;

import 'ng-wig/dist/css/ng-wig.css';
import 'ng-wig/dist/ng-wig';
import './editorButtons.css';
import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __object = services.object;
import { InputController } from '../input/input';
import { IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
import { IRichTextEditorProvider } from './richTextEditor.config';
declare let externalProviderName: string;
export { externalProviderName as providerName, IRichTextEditorProvider };
export declare var moduleName: string;
export declare var componentName: string;
export declare var controllerName: string;
export interface IRichTextEditorBindings {
    customButtons: string[];
    ngDisabled: boolean;
}
export declare class RichTextEditorController extends InputController {
    customButtons: string;
    ngDisabled: boolean;
    toolbar: string;
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: angular.IAttributes, componentValidatorFactory: IComponentValidatorFactory, object: __object.IObjectUtility, provider: void);
}

import * as angular from 'angular';
export interface IFormValidator extends angular.IFormController {
    rlErrorMessage: string;
}
export interface INgModelValidator extends angular.INgModelController {
    rlErrorMessage: string;
}

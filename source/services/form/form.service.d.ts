import { IFormValidator } from '../../types/formValidators';
export declare let moduleName: string;
export declare let serviceName: string;
export interface IFormService {
    getAggregateError(form: IFormValidator): string;
}

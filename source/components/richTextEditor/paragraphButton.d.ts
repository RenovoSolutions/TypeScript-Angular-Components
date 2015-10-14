import * as ng from 'angular';
export declare var paragraphButtonDirectiveName: string;
export interface IParagraphButtonScope extends ng.IScope {
    trigger(): void;
    execCommand(command: string, value: string): void;
}
export declare function paragraphButton(): ng.IDirective;

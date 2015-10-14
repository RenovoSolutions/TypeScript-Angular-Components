import * as ng from 'angular';
export declare var headerButtonDirectiveName: string;
export interface IHeaderButtonScope extends ng.IScope {
    trigger(): void;
    execCommand(command: string, value: string): void;
}
export declare function headerButton(): ng.IDirective;

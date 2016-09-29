declare module 'angular-ui-router' {
	export interface IStateService{
		includes(value: any): boolean;
		go(name: string): Promise<void>;
	}
}
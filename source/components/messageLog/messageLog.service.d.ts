import * as ng from 'angular';
export declare var factoryName: string;
export declare var defaultPageSize: number;
export interface IMessage {
    message: string;
}
export interface IGetMessagesResult {
    messages: IMessage[];
    hasMoreMessages: boolean;
}
export interface IMessageLogDataService {
    saveMessage(message: string): ng.IPromise<void>;
    getMessages(startFrom: number, quantity: number): ng.IPromise<IGetMessagesResult>;
}
export interface IMessageLog {
    addMessage(message: string): ng.IPromise<void>;
    visibleMessages: IMessage[];
    getNextPage(): ng.IPromise<void>;
    getPreviousPage(): ng.IPromise<void>;
    getTopPage(): ng.IPromise<void>;
    refresh(): ng.IPromise<void>;
    hasForwardMessages: boolean;
    hasBackwardMessages: boolean;
    pageSize: number;
    dataService: IMessageLogDataService;
    busy: boolean;
}
export declare class MessageLog {
    private currentStartingMessage;
    private _hasForwardMessages;
    private _hasBackwardMessages;
    private _pageSize;
    private _dataService;
    busy: boolean;
    visibleMessages: IMessage[];
    pageSize: number;
    hasForwardMessages: boolean;
    hasBackwardMessages: boolean;
    dataService: IMessageLogDataService;
    addMessage(message: string): ng.IPromise<void>;
    getNextPage(): ng.IPromise<void>;
    getPreviousPage(): ng.IPromise<void>;
    getTopPage(): ng.IPromise<void>;
    refresh(): ng.IPromise<void>;
    private updateCurrentPage();
}
export interface IMessageLogFactory {
    getInstance(): IMessageLog;
}
export declare function messageLogFactory(): IMessageLogFactory;

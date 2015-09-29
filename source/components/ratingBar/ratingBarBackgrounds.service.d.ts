export interface IRatingBarBackgroundsService {
    standard: IBackgroundType;
    dark: IBackgroundType;
    transparent: IBackgroundType;
    getBackground(type: string): string;
}
export interface IBackgroundType {
    type: string;
    class: string;
}
export declare class RatingBarBackgroundService implements IRatingBarBackgroundsService {
    standard: IBackgroundType;
    dark: IBackgroundType;
    transparent: IBackgroundType;
    getBackground(type: string): string;
}

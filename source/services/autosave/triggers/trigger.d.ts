export interface ITrigger<TSettings> {
    setTrigger(autosave: {
        (): void;
    }): void;
    hasMatch(triggers: string): boolean;
    configure(settings: TSettings): void;
    aliases: string[];
}
export declare class Trigger<TSettings> implements ITrigger<TSettings> {
    private triggerAction;
    protected settings: TSettings;
    aliases: string[];
    constructor(aliases: string, triggerAction?: {
        (settings: TSettings): void;
    });
    setTrigger(autosave: {
        (): void;
    }): void;
    hasMatch(triggers: string): boolean;
    configure(settings: TSettings): void;
}

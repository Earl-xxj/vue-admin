import { Observable } from "rxjs"

export type WysliderStyle = {
    width?: string;
    height?: string;
    left?: string;
    bottom?: string;
}

export type SilderEventObserverConfig = {
    start: string;
    move: string;
    end: string;
    filter: (e: Event) => boolean,
    pluckKey: string[];
    startPlucked$?: Observable<number>;
    moveResolve$?: Observable<number>;
    end$?: Observable<Event>;
}
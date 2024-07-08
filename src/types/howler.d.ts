declare module "howler" {
  export class Howl {
    constructor(options: HowlOptions);
    play(spriteOrId?: string | number): number;
    pause(id?: number): void;
    stop(id?: number): void;
    mute(muted?: boolean, id?: number): void;
    volume(volume?: number, id?: number): number;
    rate(rate?: number, id?: number): number;
    seek(seek?: number, id?: number): number;
    playing(id?: number): boolean;
    duration(id?: number): number;
    state(): string;
    load(): void;
    unload(): void;
    on(event: string, callback: (id?: number) => void, id?: number): this;
    off(event: string, callback?: (id?: number) => void, id?: number): this;
  }

  export interface HowlOptions {
    src: string[];
    format?: string[];
    volume?: number;
    rate?: number;
    mute?: boolean;
    loop?: boolean;
    autoplay?: boolean;
    preload?: boolean | "metadata" | "auto" | "none";
    sprite?: { [name: string]: [number, number] };
    onload?: () => void;
    onloaderror?: (id: number, error: any) => void;
    onplay?: (id: number) => void;
    onend?: (id: number) => void;
    onpause?: (id: number) => void;
    onstop?: (id: number) => void;
    onmute?: (id: number) => void;
    onvolume?: (id: number) => void;
    onrate?: (id: number) => void;
    onseeking?: (id: number) => void;
    onseeked?: (id: number) => void;
  }
}

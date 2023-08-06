import { Options } from 'plyr';
import { Ref } from 'vue';

export type RegisterFn = (playerRef: HTMLElement, uid: string) => void;

export type UsePlayerReturnType = [RegisterFn, Ref<PlyrVueInstance>];

export interface PlyrVueOptions extends Options {}

export interface PlyrVueInstance extends Plyr {}

export type Nullable<T> = T | null;

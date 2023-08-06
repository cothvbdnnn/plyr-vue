import Plyr from 'plyr';
import { getCurrentInstance, ref, unref } from 'vue';

import { PlyrVueInstance, PlyrVueOptions, UsePlayerReturnType, Nullable } from './types';
import { tryOnUnmounted } from './helper';

export function usePlyrVue(props?: PlyrVueOptions): UsePlayerReturnType {
  if (!getCurrentInstance()) {
    throw new Error('useVuePlyr() can only be used inside setup() or functional components!');
  }
  const playerInstance = ref<PlyrVueInstance>({} as PlyrVueInstance);
  const playerElement = ref<Nullable<HTMLElement>>(null);
  const loaded = ref<Nullable<boolean>>(false);
  const uid = ref<string>('');

  function register(playerRef: HTMLElement, uuid: string): void {
    tryOnUnmounted(() => {
      playerInstance.value?.destroy();
      loaded.value = null;
    });

    if (unref(loaded) && playerRef === unref(playerElement)) {
      return;
    }
    uid.value = uuid;
    playerElement.value = playerRef;
    playerInstance.value = new Plyr(playerRef, props);
    loaded.value = true;
  }

  return [register, playerInstance];
}

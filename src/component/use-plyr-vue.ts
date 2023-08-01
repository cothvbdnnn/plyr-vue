import Plyr from 'plyr';
import { getCurrentInstance, ref, unref } from 'vue';

import { PlyrVueInstance, PlyrVueProps, UsePlayerReturnType, Nullable } from './types';
import { tryOnUnmounted, deepMerge } from './helper';

export function usePlyrVue(props?: PlyrVueProps): UsePlayerReturnType {
  if (!getCurrentInstance()) {
    throw new Error('usePlayer() can only be used inside setup() or functional components!');
  }
  const player = ref<Nullable<PlyrVueInstance>>(null);
  const playerElement = ref<Nullable<HTMLElement>>(null);
  const loaded = ref<Nullable<boolean>>(false);
  const uid = ref<string>('');
  const propsRef = ref<Partial<PlyrVueProps>>({
    options: {
      tooltips: {
        controls: true
      }
    }
  });

  function register(playerInstance: HTMLElement, uuid: string): void {
    tryOnUnmounted(() => {
      player.value?.destroy();
      player.value = null;
      loaded.value = null;
    });

    if (unref(loaded) && playerInstance === unref(playerElement)) {
      return;
    }
    uid.value = uuid;
    propsRef.value = deepMerge(unref(propsRef), props);
    playerElement.value = playerInstance;
    player.value = new Plyr(playerInstance, unref(propsRef).options);
    loaded.value = true;
  }

  return [register, player];
}

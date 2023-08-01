<script setup lang="ts">
import "plyr/dist/plyr.css";

import { getCurrentInstance, onMounted, Ref, ref, unref } from "vue";
import { Nullable } from "./types";

defineOptions({
  name: "PlyrVue",
});
const emit = defineEmits(["register"]);

const containerRef = ref<Nullable<Ref<HTMLElement>>>(null);
const player = ref<Nullable<Ref<HTMLElement>>>(null);
const instance = getCurrentInstance();

onMounted(() => {
  if (!unref(containerRef)?.children[0]) return;
  player.value = unref(containerRef)?.children[0] as HTMLElement;
  instance && emit("register", unref(player), instance.uid);
});
</script>

<template>
  <div class="plyr-vue" ref="containerRef">
    <slot>
      <video />
    </slot>
  </div>
</template>

<style lang="scss" scoped></style>

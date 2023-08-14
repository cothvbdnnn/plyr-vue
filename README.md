# Import

```js
import { usePlyrVue, PlyrVue } from "plyr-vue";
import type { PlyrVueOptions, PlyrVueInstance } from "plyr-vue";
import "plyr-vue/dist/plyr-vue.css";
```

# Usage

## usePlyrVue

You can pass options to the hook, and the hook will return an initial callback function and a player instance

```js
usePlyrVue(options: PlyrVueOptions): [RegisterFunction, Ref<PlyrVueInstance>]
```

You can see more about [PlyrVueOptions](https://github.com/sampotts/plyr#initializing) and [PlyrVueInstance](https://github.com/sampotts/plyr#initializing)

## Video

### Instance

```ts
<script setup lang="ts">
const [registerVideoPlayer, videoPlayerInstance] = usePlyrVue({
  loop: { active: true },
});

onMounted(() => {
  initVideoPlayer();
});

const initVideoPlayer = () => {
  videoPlayerInstance.value.source = {
    type: "video",
    title: "Example title",
    sources: [
      {
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
        type: "video/mp4",
        size: 576,
      },
    ],
    poster:
      "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
    tracks: [
      {
        kind: "captions",
        label: "English",
        srcLang: "en",
        src: "",
        default: true,
      },
      {
        kind: "captions",
        label: "Vietnamese",
        srcLang: "vi",
        src: "",
      },
    ],
  };
  videoPlayerInstance.value.play();
};
</script>

<template>
  <plyr-vue @register="registerVideoPlayer" />
</template>
```

### Template

```ts
<script setup lang="ts">
const [registerVideoPlayer] = usePlyrVue();
</script>

<template>
  <plyr-vue @register="registerVideoPlayer">
    <video
      controls
      playsinline
      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
    >
      <source
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
        type="video/mp4"
        size="576"
      />
      <track
        kind="captions"
        label="English"
        srcLang="en"
        src=""
        default
      />
      <track
        kind="captions"
        label="Français"
        srcLang="fr"
        src=""
      />
    </video>
  </plyr-vue>
</template>
```

## Iframe

### Instance

```ts
<script setup lang="ts">
const [registerIframePlayer, iframePlayerInstance] = usePlyrVue();

onMounted(() => {
  initIframePlayer();
});

const initIframePlayer = () => {
  iframePlayerInstance.value.source = {
    type: "video",
    sources: [
      {
        src: "https://www.youtube.com/embed/bTqVqk7FSmY?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1",
        provider: "youtube",
      },
    ],
  };
};

<template>
  <plyr-vue @register="registerIframePlayer" />
</template>
```

### Template

```ts
<script setup lang="ts">
const [registerIframePlayer] = usePlyrVue();
</script>

<template>
  <plyr-vue @register="registerIframePlayer">
    <!-- We have to wrap a div to use with an iframe -->
    <div>
      <iframe
        src="https://www.youtube.com/embed/bTqVqk7FSmY?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
        allowfullscreen
        allowtransparency
        allow="autoplay"
      />
    </div>
  </plyr-vue>
</template>
```

## Audio

### Instance

```ts
<script setup lang="ts">
const [registerAudioPlayer, iframeAudioInstance] = usePlyrVue();

onMounted(() => {
  initAudioPlayer();
});

const initAudioPlayer = () => {
  iframeAudioInstance.value.source = {
    type: "audio",
    title: "Example title",
    sources: [
      {
        src: "/path/to/audio.mp3",
        type: "audio/mp3",
      },
      {
        src: "/path/to/audio.ogg",
        type: "audio/ogg",
      },
    ],
  };
};

<template>
  <plyr-vue @register="registerAudioPlayer" />
</template>
```

### Template

```ts
<script setup lang="ts">
const [registerAudioPlayer] = usePlyrVue();
</script>

<template>
  <plyr-vue @register="registerAudioPlayer">
    <audio>
      <source src="/path/to/audio.mp3" type="audio/mp3" />
      <source src="/path/to/audio.ogg" type="audio/ogg" />
    </audio>
  </plyr-vue>
</template>
```

# Plyr related options

See plyr [documentation](https://github.com/sampotts/plyr#initializing) for all possible options & methods.

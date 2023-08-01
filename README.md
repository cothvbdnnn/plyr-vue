# Example

```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { usePlyrVue, PlyrVue } from "plyr-vue";
import "plyr-vue/dist/plyr-vue.css";

const [registerVideoPlayer, videoPlayerInstance] = usePlyrVue({
  options: {
    loop: { active: true },
  },
});
const [registerIframePlayer, iframePlayerInstance] = usePlyrVue();
const [registerAudioPlayer, iframeAudioInstance] = usePlyrVue();
const [registerVideoPlayerTemplate] = usePlyrVue();
const [registerIframePlayerTemplate] = usePlyrVue();
const [registerAudioPlayerTemplate] = usePlyrVue();

onMounted(() => {
  initVideoPlayer();
  initIframePlayer();
  initAudioPlayer();
});

const initVideoPlayer = () => {
  if (!videoPlayerInstance.value) return;
  videoPlayerInstance.value.source = {
    type: "video",
    title: "Example title",
    sources: [
      {
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
        type: "video/mp4",
        size: 576,
      },
      {
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
        type: "video/mp4",
        size: 720,
      },
      {
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
        type: "video/mp4",
        size: 1080,
      },
      {
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4",
        type: "video/mp4",
        size: 1440,
      },
    ],
    poster:
      "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
    tracks: [
      {
        kind: "captions",
        label: "English",
        srcLang: "en",
        src: "/path/to/captions.en.vtt",
        default: true,
      },
      {
        kind: "captions",
        label: "French",
        srcLang: "fr",
        src: "/path/to/captions.fr.vtt",
      },
    ],
  };
  videoPlayerInstance.value.play();
};

const initIframePlayer = () => {
  if (!iframePlayerInstance.value) return;
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

const initAudioPlayer = () => {
  if (!iframeAudioInstance.value) return;
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
</script>

<template>
  <div>
    <h1>Video</h1>
    <plyr-vue @register="registerVideoPlayer" />
    <h1>Iframe</h1>
    <plyr-vue @register="registerIframePlayer" />
    <h1>Audio</h1>
    <plyr-vue @register="registerAudioPlayer" />
    <h1>Video Template</h1>
    <plyr-vue @register="registerVideoPlayerTemplate">
      <video
        controls
        playsinline
        poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      >
        <!-- Video files -->
        <source
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          type="video/mp4"
          size="576"
        />
        <source
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
          type="video/mp4"
          size="720"
        />
        <source
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
          type="video/mp4"
          size="1080"
        />
        <source
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4"
          type="video/mp4"
          size="1440"
        />

        <!-- Caption files -->
        <track
          kind="captions"
          label="English"
          srclang="en"
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
          default
        />
        <track
          kind="captions"
          label="Français"
          srclang="fr"
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
        />
        <a
          href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          download
          >Download</a
        >
      </video>
    </plyr-vue>
    <h1>Iframe Template</h1>
    <plyr-vue @register="registerIframePlayerTemplate">
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
    <h1>Audio Template</h1>
    <plyr-vue @register="registerAudioPlayerTemplate">
      <audio>
        <source src="/path/to/audio.mp3" type="audio/mp3" />
        <source src="/path/to/audio.ogg" type="audio/ogg" />
      </audio>
    </plyr-vue>
  </div>
</template>
```

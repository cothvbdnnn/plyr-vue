# Import

```js
import { usePlyrVue, PlyrVue } from "plyr-vue";
import type { PlyrVueOptions, PlyrVueInstance } from "plyr-vue";
import "plyr-vue/dist/plyr-vue.css";
```

# Hook

```js
usePlyrVue(options: PlyrVueOptions): [RegisterFunction, Ref<PlyrVueInstance>]
```

# Example

## Video

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

##

```ts
<script setup lang="ts">
import { onMounted } from "vue";
import { usePlyrVue, PlyrVue } from "plyr-vue";

const [registerIframePlayer, iframePlayerInstance] = usePlyrVue();
const [registerAudioPlayer, iframeAudioInstance] = usePlyrVue();
const [registerVideoPlayerTemplate] = usePlyrVue();
const [registerIframePlayerTemplate] = usePlyrVue();
const [registerAudioPlayerTemplate] = usePlyrVue();

onMounted(() => {
  initIframePlayer();
  initAudioPlayer();
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
</script>

<template>
  <div>
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
        <source
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          type="video/mp4"
          size="576"
        />
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

## Option

| Option               | Type                       | Default                                                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`            | Boolean                    | `true`                                                                                                                         | Completely disable Plyr. This would allow you to do a User Agent check or similar to programmatically enable or disable Plyr for a certain UA. Example below.                                                                                                                                                                                                                                                                           |
| `debug`              | Boolean                    | `false`                                                                                                                        | Display debugging information in the console                                                                                                                                                                                                                                                                                                                                                                                            |
| `controls`           | Array, Function or Element | `['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']` | If a function is passed, it is assumed your method will return either an element or HTML string for the controls. Three arguments will be passed to your function; `id` (the unique id for the player), `seektime` (the seektime step in seconds), and `title` (the media title). See [CONTROLS.md](CONTROLS.md) for more info on how the html needs to be structured.                                                                  |
| `settings`           | Array                      | `['captions', 'quality', 'speed', 'loop']`                                                                                     | If the default controls are used, you can specify which settings to show in the menu                                                                                                                                                                                                                                                                                                                                                    |
| `i18n`               | Object                     | See [defaults.js](/src/js/config/defaults.js)                                                                                  | Used for internationalization (i18n) of the text within the UI.                                                                                                                                                                                                                                                                                                                                                                         |
| `loadSprite`         | Boolean                    | `true`                                                                                                                         | Load the SVG sprite specified as the `iconUrl` option (if a URL). If `false`, it is assumed you are handling sprite loading yourself.                                                                                                                                                                                                                                                                                                   |
| `iconUrl`            | String                     | `null`                                                                                                                         | Specify a URL or path to the SVG sprite. See the [SVG section](#svg) for more info.                                                                                                                                                                                                                                                                                                                                                     |
| `iconPrefix`         | String                     | `plyr`                                                                                                                         | Specify the id prefix for the icons used in the default controls (e.g. "plyr-play" would be "plyr"). This is to prevent clashes if you're using your own SVG sprite but with the default controls. Most people can ignore this option.                                                                                                                                                                                                  |
| `blankVideo`         | String                     | `https://cdn.plyr.io/static/blank.mp4`                                                                                         | Specify a URL or path to a blank video file used to properly cancel network requests.                                                                                                                                                                                                                                                                                                                                                   |
| `autoplay`&sup2;     | Boolean                    | `false`                                                                                                                        | Autoplay the media on load. If the `autoplay` attribute is present on a `<video>` or `<audio>` element, this will be automatically set to true.                                                                                                                                                                                                                                                                                         |
| `autopause`&sup1;    | Boolean                    | `true`                                                                                                                         | Only allow one player playing at once.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `playsinline`&sup3;  | Boolean                    | `true`                                                                                                                         | Allow inline playback on iOS. Note this has no effect on iPadOS.                                                                                                                                                                                                                                                                                                                                                                        |
| `seekTime`           | Number                     | `10`                                                                                                                           | The time, in seconds, to seek when a user hits fast forward or rewind.                                                                                                                                                                                                                                                                                                                                                                  |
| `volume`             | Number                     | `1`                                                                                                                            | A number, between 0 and 1, representing the initial volume of the player.                                                                                                                                                                                                                                                                                                                                                               |
| `muted`              | Boolean                    | `false`                                                                                                                        | Whether to start playback muted. If the `muted` attribute is present on a `<video>` or `<audio>` element, this will be automatically set to true.                                                                                                                                                                                                                                                                                       |
| `clickToPlay`        | Boolean                    | `true`                                                                                                                         | Click (or tap) of the video container will toggle play/pause.                                                                                                                                                                                                                                                                                                                                                                           |
| `disableContextMenu` | Boolean                    | `true`                                                                                                                         | Disable right click menu on video to <em>help</em> as very primitive obfuscation to prevent downloads of content.                                                                                                                                                                                                                                                                                                                       |
| `hideControls`       | Boolean                    | `true`                                                                                                                         | Hide video controls automatically after 2s of no mouse or focus movement, on control element blur (tab out), on playback start or entering fullscreen. As soon as the mouse is moved, a control element is focused or playback is paused, the controls reappear instantly.                                                                                                                                                              |
| `resetOnEnd`         | Boolean                    | false                                                                                                                          | Reset the playback to the start once playback is complete.                                                                                                                                                                                                                                                                                                                                                                              |
| `keyboard`           | Object                     | `{ focused: true, global: false }`                                                                                             | Enable [keyboard shortcuts](#shortcuts) for focused players only or globally                                                                                                                                                                                                                                                                                                                                                            |
| `tooltips`           | Object                     | `{ controls: false, seek: true }`                                                                                              | `controls`: Display control labels as tooltips on `:hover` & `:focus` (by default, the labels are screen reader only). `seek`: Display a seek tooltip to indicate on click where the media would seek to.                                                                                                                                                                                                                               |
| `duration`           | Number                     | `null`                                                                                                                         | Specify a custom duration for media.                                                                                                                                                                                                                                                                                                                                                                                                    |
| `displayDuration`    | Boolean                    | `true`                                                                                                                         | Displays the duration of the media on the "metadataloaded" event (on startup) in the current time display. This will only work if the `preload` attribute is not set to `none` (or is not set at all) and you choose not to display the duration (see `controls` option).                                                                                                                                                               |
| `invertTime`         | Boolean                    | `true`                                                                                                                         | Display the current time as a countdown rather than an incremental counter.                                                                                                                                                                                                                                                                                                                                                             |
| `toggleInvert`       | Boolean                    | `true`                                                                                                                         | Allow users to click to toggle the above.                                                                                                                                                                                                                                                                                                                                                                                               |
| `listeners`          | Object                     | `null`                                                                                                                         | Allows binding of event listeners to the controls before the default handlers. See the `defaults.js` for available listeners. If your handler prevents default on the event (`event.preventDefault()`), the default handler will not fire.                                                                                                                                                                                              |
| `captions`           | Object                     | `{ active: false, language: 'auto', update: false }`                                                                           | `active`: Toggles if captions should be active by default. `language`: Sets the default language to load (if available). 'auto' uses the browser language. `update`: Listen to changes to tracks and update menu. This is needed for some streaming libraries, but can result in non-selectable language options).                                                                                                                      |
| `fullscreen`         | Object                     | `{ enabled: true, fallback: true, iosNative: false, container: null }`                                                         | `enabled`: Toggles whether fullscreen should be enabled. `fallback`: Allow fallback to a full-window solution (`true`/`false`/`'force'`). `iosNative`: whether to use native iOS fullscreen when entering fullscreen (no custom controls) - note this has no effect on iPadOS. `container`: A selector for an ancestor of the player element, allows contextual content to remain visual in fullscreen mode. Non-ancestors are ignored. |
| `ratio`              | String                     | `null`                                                                                                                         | Force an aspect ratio for all videos. The format is `'w:h'` - e.g. `'16:9'` or `'4:3'`. If this is not specified then the default for HTML5 and Vimeo is to use the native resolution of the video. As dimensions are not available from YouTube via SDK, 16:9 is forced as a sensible default.                                                                                                                                         |
| `storage`            | Object                     | `{ enabled: true, key: 'plyr' }`                                                                                               | `enabled`: Allow use of local storage to store user settings. `key`: The key name to use.                                                                                                                                                                                                                                                                                                                                               |
| `speed`              | Object                     | `{ selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] }`                                                              | `selected`: The default speed for playback. `options`: The speed options to display in the UI. YouTube and Vimeo will ignore any options outside of the 0.5-2 range, so options outside of this range will be hidden automatically.                                                                                                                                                                                                     |
| `quality`            | Object                     | `{ default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] }`                                           | `default` is the default quality level (if it exists in your sources). `options` are the options to display. This is used to filter the available sources.                                                                                                                                                                                                                                                                              |
| `loop`               | Object                     | `{ active: false }`                                                                                                            | `active`: Whether to loop the current video. If the `loop` attribute is present on a `<video>` or `<audio>` element, this will be automatically set to true This is an object to support future functionality.                                                                                                                                                                                                                          |
| `ads`                | Object                     | `{ enabled: false, publisherId: '', tagUrl: '' }`                                                                              | `enabled`: Whether to enable advertisements. `publisherId`: Your unique [vi.ai](https://vi.ai/publisher-video-monetization/?aid=plyrio) publisher ID. `tagUrl` is a URL for a custom VAST tag if you're not using Vi.                                                                                                                                                                                                                   |
| `urls`               | Object                     | See source.                                                                                                                    | If you wish to override any API URLs then you can do so here. You can also set a custom download URL for the download button.                                                                                                                                                                                                                                                                                                           |
| `vimeo`              | Object                     | `{ byline: false, portrait: false, title: false, speed: true, transparent: false }`                                            | See [Vimeo embed options](https://github.com/vimeo/player.js/#embed-options). Some are set automatically based on other config options, namely: `loop`, `autoplay`, `muted`, `gesture`, `playsinline`                                                                                                                                                                                                                                   |
| `youtube`            | Object                     | `{ noCookie: false, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 }`                                               | See [YouTube embed options](https://developers.google.com/youtube/player_parameters#Parameters). The only custom option is `noCookie` to use an alternative to YouTube that doesn't use cookies (useful for GDPR, etc). Some are set automatically based on other config options, namely: `autoplay`, `hl`, `controls`, `disablekb`, `playsinline`, `cc_load_policy`, `cc_lang_pref`, `widget_referrer`                                 |
| `previewThumbnails`  | Object                     | `{ enabled: false, src: '' }`                                                                                                  | `enabled`: Whether to enable the preview thumbnails (they must be generated by you). `src` must be either a string or an array of strings representing URLs for the VTT files containing the image URL(s). Learn more about [preview thumbnails](#preview-thumbnails) below.                                                                                                                                                            |
| `mediaMetadata`      | Object                     | `{ title: '', artist: '', album: '', artwork: [] }`                                                                            | The [MediaMetadata](https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata) interface of the Media Session API allows a web page to provide rich media metadata for display in a platform UI.                                                                                                                                                                                                                                   |
| `markers`            | Object                     | `{ enabled: false, points: [] }`                                                                                               | `enabled`: Whether to enable markers. `points` is an array of `{ time: number; label: string; }` objects where `time` represents the marker position in seconds and `label` is the HTML string to be displayed.                                                                                                                                                                                                                         |

## Method

| Method                                                   | Parameters       | Description                                                                                                |
| -------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `play()`&sup1;                                           | -                | Start playback.                                                                                            |
| `pause()`                                                | -                | Pause playback.                                                                                            |
| `togglePlay(toggle)`&sup1;                               | Boolean          | Toggle playback, if no parameters are passed, it will toggle based on current status.                      |
| `stop()`                                                 | -                | Stop playback and reset to start.                                                                          |
| `restart()`                                              | -                | Restart playback.                                                                                          |
| `rewind(seekTime)`                                       | Number           | Rewind playback by the specified seek time. If no parameter is passed, the default seek time will be used. |
| `forward(seekTime)`                                      | Number           | Fast forward by the specified seek time. If no parameter is passed, the default seek time will be used.    |
| `increaseVolume(step)`                                   | Number           | Increase volume by the specified step. If no parameter is passed, the default step will be used.           |
| `decreaseVolume(step)`                                   | Number           | Increase volume by the specified step. If no parameter is passed, the default step will be used.           |
| `toggleCaptions(toggle)`                                 | Boolean          | Toggle captions display. If no parameter is passed, it will toggle based on current status.                |
| `fullscreen.enter()`                                     | -                | Enter fullscreen. If fullscreen is not supported, a fallback "full window/viewport" is used instead.       |
| `fullscreen.exit()`                                      | -                | Exit fullscreen.                                                                                           |
| `fullscreen.toggle()`                                    | -                | Toggle fullscreen.                                                                                         |
| `airplay()`                                              | -                | Trigger the airplay dialog on supported devices.                                                           |
| `setPreviewThumbnails(source: PreviewThumbnailsOptions)` | -                | Sets the preview thumbnails for the current source.                                                        |
| `toggleControls(toggle)`                                 | Boolean          | Toggle the controls (video only). Takes optional truthy value to force it on/off.                          |
| `on(event, function)`                                    | String, Function | Add an event listener for the specified event.                                                             |
| `once(event, function)`                                  | String, Function | Add an event listener for the specified event once.                                                        |
| `off(event, function)`                                   | String, Function | Remove an event listener for the specified event.                                                          |
| `supports(type)`                                         | String           | Check support for a mime type.                                                                             |
| `destroy()`                                              | -                | Destroy the instance and garbage collect any elements.                                                     |

## Property

| Property             | Getter | Setter | Description                                                                                                                                                                                                                                                                                                                            |
| -------------------- | ------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHTML5`            | ✓      | -      | Returns a boolean indicating if the current player is HTML5.                                                                                                                                                                                                                                                                           |
| `isEmbed`            | ✓      | -      | Returns a boolean indicating if the current player is an embedded player.                                                                                                                                                                                                                                                              |
| `playing`            | ✓      | -      | Returns a boolean indicating if the current player is playing.                                                                                                                                                                                                                                                                         |
| `paused`             | ✓      | -      | Returns a boolean indicating if the current player is paused.                                                                                                                                                                                                                                                                          |
| `stopped`            | ✓      | -      | Returns a boolean indicating if the current player is stopped.                                                                                                                                                                                                                                                                         |
| `ended`              | ✓      | -      | Returns a boolean indicating if the current player has finished playback.                                                                                                                                                                                                                                                              |
| `buffered`           | ✓      | -      | Returns a float between 0 and 1 indicating how much of the media is buffered                                                                                                                                                                                                                                                           |
| `currentTime`        | ✓      | ✓      | Gets or sets the currentTime for the player. The setter accepts a float in seconds.                                                                                                                                                                                                                                                    |
| `seeking`            | ✓      | -      | Returns a boolean indicating if the current player is seeking.                                                                                                                                                                                                                                                                         |
| `duration`           | ✓      | -      | Returns the duration for the current media.                                                                                                                                                                                                                                                                                            |
| `volume`             | ✓      | ✓      | Gets or sets the volume for the player. The setter accepts a float between 0 and 1.                                                                                                                                                                                                                                                    |
| `muted`              | ✓      | ✓      | Gets or sets the muted state of the player. The setter accepts a boolean.                                                                                                                                                                                                                                                              |
| `hasAudio`           | ✓      | -      | Returns a boolean indicating if the current media has an audio track.                                                                                                                                                                                                                                                                  |
| `speed`              | ✓      | ✓      | Gets or sets the speed for the player. The setter accepts a value in the options specified in your config. Generally the minimum should be 0.5.                                                                                                                                                                                        |
| `quality`&sup1;      | ✓      | ✓      | Gets or sets the quality for the player. The setter accepts a value from the options specified in your config.                                                                                                                                                                                                                         |
| `loop`               | ✓      | ✓      | Gets or sets the current loop state of the player. The setter accepts a boolean.                                                                                                                                                                                                                                                       |
| `source`             | ✓      | ✓      | Gets or sets the current source for the player. The setter accepts an object. See [source setter](#the-source-setter) below for examples.                                                                                                                                                                                              |
| `poster`             | ✓      | ✓      | Gets or sets the current poster image for the player. The setter accepts a string; the URL for the updated poster image.                                                                                                                                                                                                               |
| `previewThumbnails`  | ✓      | ✓      | Gets or sets the current preview thumbnail source for the player. The setter accepts a string                                                                                                                                                                                                                                          |
| `autoplay`           | ✓      | ✓      | Gets or sets the autoplay state of the player. The setter accepts a boolean.                                                                                                                                                                                                                                                           |
| `currentTrack`       | ✓      | ✓      | Gets or sets the caption track by index. `-1` means the track is missing or captions is not active                                                                                                                                                                                                                                     |
| `language`           | ✓      | ✓      | Gets or sets the preferred captions language for the player. The setter accepts an ISO two-letter language code. Support for the languages is dependent on the captions you include. If your captions don't have any language data, or if you have multiple tracks with the same language, you may want to use `currentTrack` instead. |
| `fullscreen.active`  | ✓      | -      | Returns a boolean indicating if the current player is in fullscreen mode.                                                                                                                                                                                                                                                              |
| `fullscreen.enabled` | ✓      | -      | Returns a boolean indicating if the current player has fullscreen enabled.                                                                                                                                                                                                                                                             |
| `pip`&sup1;          | ✓      | ✓      | Gets or sets the picture-in-picture state of the player. The setter accepts a boolean. This currently only supported on Safari 10+ (on MacOS Sierra+ and iOS 10+) and Chrome 70+.                                                                                                                                                      |
| `ratio`              | ✓      | ✓      | Gets or sets the video aspect ratio. The setter accepts a string in the same format as the `ratio` option.                                                                                                                                                                                                                             |
| `download`           | ✓      | ✓      | Gets or sets the URL for the download button. The setter accepts a string containing a valid absolute URL.                                                                                                                                                                                                                             |

| Property                  | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                    | String | Either `video` or `audio`. _Note:_ YouTube and Vimeo are currently not supported as audio sources.                                                                                                                                                                                                                                                                                                             |
| `title`                   | String | _Optional._ Title of the new media. Used for the `aria-label` attribute on the play button, and outer container. YouTube and Vimeo are populated automatically.                                                                                                                                                                                                                                                |
| `sources`                 | Array  | This is an array of sources. For HTML5 media, the properties of this object are mapped directly to HTML attributes so more can be added to the object if required.                                                                                                                                                                                                                                             |
| `poster`&sup1;            | String | The URL for the poster image (HTML5 video only).                                                                                                                                                                                                                                                                                                                                                               |
| `tracks`&sup1;            | String | An array of track objects. Each element in the array is mapped directly to a track element and any keys mapped directly to HTML attributes so as in the example above, it will render as `<track kind="captions" label="English" srclang="en" src="https://cdn.selz.com/plyr/1.0/example_captions_en.vtt" default>` and similar for the French version. Booleans are converted to HTML5 value-less attributes. |
| `previewThumbnails`&sup1; | Object | The same object like in the `previewThumbnails` constructor option. This means you can either change the thumbnails vtt via the `src` key or disable the thumbnails plugin for the next video by passing `{ enabled: false }`.                                                                                                                                                                                 |

## Standard Media Events

| Event Type         | Description                                                                                                                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `progress`         | Sent periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element's `buffered` attribute. |
| `playing`          | Sent when the media begins to play (either for the first time, after having been paused, or after ending and then restarting).                                                                                         |
| `play`             | Sent when playback of the media starts after having been paused; that is, when playback is resumed after a prior `pause` event.                                                                                        |
| `pause`            | Sent when playback is paused.                                                                                                                                                                                          |
| `timeupdate`       | The time indicated by the element's `currentTime` attribute has changed.                                                                                                                                               |
| `volumechange`     | Sent when the audio volume changes (both when the volume is set and when the `muted` state is changed).                                                                                                                |
| `seeking`          | Sent when a seek operation begins.                                                                                                                                                                                     |
| `seeked`           | Sent when a seek operation completes.                                                                                                                                                                                  |
| `ratechange`       | Sent when the playback speed changes.                                                                                                                                                                                  |
| `ended`            | Sent when playback completes. _Note:_ This does not fire if `autoplay` is true.                                                                                                                                        |
| `enterfullscreen`  | Sent when the player enters fullscreen mode (either the proper fullscreen or full-window fallback for older browsers).                                                                                                 |
| `exitfullscreen`   | Sent when the player exits fullscreen mode.                                                                                                                                                                            |
| `captionsenabled`  | Sent when captions are enabled.                                                                                                                                                                                        |
| `captionsdisabled` | Sent when captions are disabled.                                                                                                                                                                                       |
| `languagechange`   | Sent when the caption language is changed.                                                                                                                                                                             |
| `controlshidden`   | Sent when the controls are hidden.                                                                                                                                                                                     |
| `controlsshown`    | Sent when the controls are shown.                                                                                                                                                                                      |
| `ready`            | Triggered when the instance is ready for API calls.                                                                                                                                                                    |

### HTML5 only

| Event Type       | Description                                                                                                                                                                                                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `loadstart`      | Sent when loading of the media begins.                                                                                                                                                                                                                                                                                                         |
| `loadeddata`     | The first frame of the media has finished loading.                                                                                                                                                                                                                                                                                             |
| `loadedmetadata` | The media's metadata has finished loading; all attributes now contain as much useful information as they're going to.                                                                                                                                                                                                                          |
| `qualitychange`  | The quality of playback has changed.                                                                                                                                                                                                                                                                                                           |
| `canplay`        | Sent when enough data is available that the media can be played, at least for a couple of frames. This corresponds to the `HAVE_ENOUGH_DATA` `readyState`.                                                                                                                                                                                     |
| `canplaythrough` | Sent when the ready state changes to `CAN_PLAY_THROUGH`, indicating that the entire media can be played without interruption, assuming the download rate remains at least at the current level. _Note:_ Manually setting the `currentTime` will eventually fire a `canplaythrough` event in firefox. Other browsers might not fire this event. |
| `stalled`        | Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.                                                                                                                                                                                                                                              |
| `waiting`        | Sent when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek).                                                                                                                                                                                                                  |
| `emptied`        | he media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the `load()` method is called to reload it.                                                                                                                                                                         |
| `cuechange`      | Sent when a `TextTrack` has changed the currently displaying cues.                                                                                                                                                                                                                                                                             |
| `error`          | Sent when an error occurs. The element's `error` attribute contains more information.                                                                                                                                                                                                                                                          |

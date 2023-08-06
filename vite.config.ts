import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.ts', // Change this to the correct entry point
      name: 'plyr-vue', // Replace with your library name
      fileName: 'plyr-vue',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue', // External dependency name and corresponding global variable
        },
        assetFileNames: 'plyr-vue.[ext]',
      },
    },
  },
});

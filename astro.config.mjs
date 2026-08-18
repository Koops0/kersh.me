// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  build: {
    inlineStylesheets: 'always'
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin'],
      stretch: '62% 125%',
      display: 'swap',
      fallbacks: ['Arial Black', 'sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'Red Hat Mono',
      cssVariable: '--font-red-hat-mono',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['SFMono-Regular', 'Consolas', 'monospace']
    }
  ]
});

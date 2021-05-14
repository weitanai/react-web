import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  publicPath: '/',
  base: '/',
  outputPath: './doc',
  alias: {
    '@': resolve(__dirname, 'src'),
  },
});

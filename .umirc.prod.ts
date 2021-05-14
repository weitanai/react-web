import { defineConfig } from 'umi';

export default defineConfig({
  devtool: 'source-map',
  alias: {
    'react-dom$': 'react-dom/profiling',
    'scheduler/tracing': 'scheduler/tracing-profiling',
  },
  dynamicImport: {},
});

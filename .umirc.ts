import { defineConfig } from 'umi';
import pjson from './package.json';

const getDependencies = () => {
  const keys = [];

  for (const key in pjson.dependencies) {
    keys.push(key);
  }

  return keys;
};

export default defineConfig({
  antd: false,
  hash: true,
  title: '批改后台',
  publicPath: '/',
  base: '/',
  outputPath: './build',
  ignoreMomentLocale: true,
 

  nodeModulesTransform: {
    type: 'all',
    /** 阻止编译第三方依赖 */
    exclude: [...getDependencies()],
  },
  dynamicImport: {},
 
 
});

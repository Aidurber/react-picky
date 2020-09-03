import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import css from 'rollup-plugin-css-only';
import filesize from 'rollup-plugin-filesize';
const name = require('./package.json').main.replace(/\.js$/, '');

const ext = format =>
  format === 'dts' ? 'd.ts' : format === 'cjs' ? 'js' : 'mjs';

const plugins = [css({ output: 'dist/picky.css' })];
const bundle = format => ({
  input: 'src/index.ts',
  output: {
    file: `${name}.${ext(format)}`,
    format: format === 'cjs' ? 'cjs' : 'es',
    sourcemap: format !== 'dts',
  },
  plugins:
    format === 'dts'
      ? [...plugins, dts()]
      : [...plugins, esbuild(), filesize()],
  external: ['react', 'react-dom'],
});

export default [bundle('es'), bundle('cjs'), bundle('dts')];

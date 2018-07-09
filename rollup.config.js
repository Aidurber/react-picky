// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import css from 'rollup-plugin-css-only';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  external: [
    'react',
    'prop-types',
    'react-dom',
    'lodash.debounce',
    'lodash.includes',
    'lodash.isequal',
    'simple-format'
  ],
  plugins: [
    css({ output: 'dist/picky.css' }),
    babel({
      exclude: 'node_modules/**'
    }),
    // resolve(),
    // commonjs(),
    isProduction && uglify(),
    isProduction && filesize()
  ]
};

import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import css from 'rollup-plugin-css-only';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  external: ['react', 'prop-types', 'react-dom', 'lodash.isequal'],
  plugins: [
    css({ output: 'dist/picky.css' }),
    resolve(),
    babel({
      exclude: 'node_modules/**',
      externalHelpers: true,
    }),
    commonjs({
      ignore: ['node_modules/prop-types'],
    }),
    isProduction && uglify(),
    isProduction && filesize(),
  ],
};

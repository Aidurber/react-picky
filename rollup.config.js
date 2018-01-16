// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import fs from 'fs';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  external: ['react', 'prop-types', 'react-dom'],
  plugins: [
    sass({
      output(styles) {
        fs.writeFileSync('dist/picky.css', styles);
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    // resolve(),
    // commonjs(),
    isProduction && uglify(),
    isProduction && filesize()
  ]
};

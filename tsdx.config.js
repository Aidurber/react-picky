const css = require('rollup-plugin-css-only');
const filesize = require('rollup-plugin-filesize');

module.exports = {
  rollup(config, options) {
    config.plugins.push(css({ output: 'dist/picky.css' }));
    config.plugins.push(filesize());

    return config;
  },
};

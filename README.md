# Boilerplate for creating React-component npm package with ES2015

Starter point for creating [React](https://facebook.github.io/react/) components that you can published on Npm.

* Bundled with [Webpack](https://webpack.js.org/)
* Develop with Hot Module Replacement [(HMR)](https://webpack.js.org/concepts/hot-module-replacement/)
* Includes linting with [ESLint](http://eslint.org/)
* Testing with [Jest](http://facebook.github.io/jest/).

## Usage

1. Install modules 
    > yarn

2. Check **_package.json_** so that the information is correct.
3. Start example and start coding! 
    > yarn start

4. Bundle with `yarn build`
5. To test if it works correctly in another project you can use npm `npm install -S ../react-npm-component-boilerplate` Note the relative path

E.g. this folder structure
```
    ./workspace/
        MyProject
        react-npm-boilerplate
```
### Extra
* If you want to run tests: 
    > yarn test

* You need to write tests in `__tests__` folder or as `.test.js`.
* It you want to keep watch run: 
    > yarn test-watch

* If you want coverage run: 
    > yarn test-coverage

* If you want to run eslint: 
    > yarn lint

* If you want to automatically fix lint problems run :
    > yarn lint-fix

Adjust your `.eslintrc` config file to your own preference.

## NPM equivalent
yarn | npm
---- | ---
`yarn` | `npm install`
`yarn test` | `npm run test`
`yarn build` | `npm run build`
`yarn test-watch` | `npm run test-watch`
`yarn test-coverage` | `npm run test-coverage`
`yarn lint` | `npm run lint`
`yarn lint-fix` | `npm run lint-fix`
____
### Resources

* http://kloc.io/setting-up-react-workflow-babel-webpack/
* https://facebook.github.io/jest/docs/webpack.html
* https://webpack.js.org/guides/code-splitting-libraries/#manifest-file
____
### Credit
Documentation is inspired by [Julian Ćwirko](https://github.com/juliancwirko) and the [https://github.com/juliancwirko/react-npm-boilerplate](https://github.com/juliancwirko/react-npm-boilerplate) package.
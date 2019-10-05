# Contributing

1. Fork the repository
2. Clone the repository
```bash
git clone https://github.com/[YourUserName]/react-picky.git
```
3. `yarn install` you can use NPM if you wish but don't commit the `package.lock`
4. `yarn global add commitizen`
5. Write a failing test
6. Write your fix/optimisation
7. Stage your changes
8. Run `yarn commit` or `npm run commit` we use [Sematic Release](https://github.com/semantic-release/semantic-release) and [Commitizen](https://github.com/commitizen/cz-cli)
9. Create your Pull Request stating a reason for the PR and how your code resolves the issue. 
10. Put your feet up, I'm normally fairly quick to respond to issues and PRs.


# Running the component locally

It's on my todo list to add an example directory where the component lives and manual testing can be done. In the mean time you can follow these steps to manually test: 
1. In the Picky directory run: 
```bash
yarn link
```
This will create a [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link) to Picky, we'll use that link in an upcoming step.

2. Create a React app in another directory, I personally use Create React App and call it "sandbox". 
```bash
yarn create react-app my-app
```
3. In the new sandbox project run
```bash
yarn link "react-picky"
```
4. You can copy & paste the contents of `index.js` from this [CodeSandbox](https://codesandbox.io/s/747z71zpxj) into the `App.tsx`
5. In your terminal inside Picky run
```bash
yarn run dev
```
This will compile the package and watch for changes
6. Start the Sandbox project, if you used Create React App you can run `yarn start`

The code should be linked and any changes you make to Picky will be reflected in the sandbox.

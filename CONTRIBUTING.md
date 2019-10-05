# Contributing

1. Fork the repository
1. Clone the repository: `git clone https://github.com/[YourUserName]/react-picky.git`
1. `yarn install` you can use NPM if you wish but don't commit the `package.lock`
1. Write a failing test
1. Write your fix/optimisation
1. Stage your changes
1. We use conventional commits to help generate change logs and manage releases. For example you're making a bug fix, you commit message would be: `fix: added aria-role to button`. This is enforced by [commitlint](https://commitlint.js.org/#/). For more information regarding conventional commits [see here](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary)
1. Create your Pull Request stating a reason for the PR and how your code resolves the issue.

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

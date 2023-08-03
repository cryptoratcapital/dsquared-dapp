# Dsquared Dapp

## Getting Started

First, remove the default suffix from the `.vscode/settings.json` from the `.vscode/settings.json.default` file.

Then, in VSCode, open your command palette (`cmd + shift + p` on mac or `ctrl + shift + p` on windows) and search for and navigate to "show recommended extensions". Then, install the recommended extensions.

Then install the project dependencies,

```
npm install

```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Code is automatically checked when a commit is made. The commit won't succeed unless checks pass. To run all checks manually,

```bash
npm run check
```

## Testing

Cypress is used for component and e2e testing.

To run tests,

```
npm run test
npm run test:e2e // e2e tests only
npm run test:component // component tests only
```
# DSQ_dApp

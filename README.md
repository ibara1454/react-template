# React template

## Development Setup

### Prerequisites

- Install [Node.js](https://nodejs.org/en/) with version `14.y.z` or above.
- Install package manager [Yarn](https://yarnpkg.com/) with version `1.y.z`.

### Setting up the project

Install all dependencies and Git hooks:

```bash
yarn install
```

Run application in development environment:

```bash
yarn dev
# Start a dev server running at:
# http://localhost:3000/
```

Process a production build:

```bash
yarn build
# This will generates files under `/dist` directory
```

## Changelog

[CHANGELOG.md](./CHANGELOG.md)

## Contributing

### Commit Message Format

Your commit messages should satisfy the [AngularJS commit message format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).
Please take a look at it.

In most cases, you don't need to check whether your commit messages follow the rules or not.
Since we registered a [`commit-msg`](./.husky/commit-msg) hook to trigger [commitlint](https://commitlint.js.org/), which will check your commit messages automatically.

## Releasing

Since we are using [semantic-release](https://github.com/semantic-release/semantic-release) to automatically create release pages, git tags, and bump versions after merging a commit to master branch, no manual tasks are needed.

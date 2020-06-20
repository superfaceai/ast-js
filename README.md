# language

## Install

To install the package, first create `.npmrc` file in your project root and put the following line into it.

```
@superindustries:registry=https://npm.pkg.github.com
```

Then authenticate to github npm package registry. Use your github name as your login. Use your github token with `repo` and `read:packages` as your password.

```
npm login --registry=https://npm.pkg.github.com
```

After doing this, you shuold be able to install the package by calling:

```
yarn add @superindustries/language
```

## Publishing a new version

Package publishing is done through GitHub release functionality.

[Draft a new release](https://github.com/superindustries/language/releases/new) to publish a new version of the package.

Use semver for the version tag. It must be in format of `v<major>.<minor>.<patch>`.

Github Actions workflow will pick up the release and publish it as one of the [packages](https://github.com/superindustries/language/packages).

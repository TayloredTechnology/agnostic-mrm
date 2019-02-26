## Development

These instructions will get you a copy of the project up and running on your local machine for _development and testing_ purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Node 8.x.x or higher (LTS when development commenced)

### Installing

A step by step series of examples that tell you how to get a development env running

```
git clone git@github.com:sotekton/.git
cd cloud-native-internal
npm install
```

## Running the tests

[TAP](https://testanything.org/) is used for all tests

```
# Execute all application tests
npm test
```

Code Coverage is provided by [CodeCov](https://codecov.io).

### And coding style tests

[XO](https://github.com/sindresorhus/xo) is used with [Prettier](https://github.com/prettier/prettier) for linting & code style.

```
npm run lint
```

%~ -3%

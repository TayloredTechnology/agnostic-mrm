## Deployment

Quickstart overview of getting this template deployed and ready to be extended / built upon.

### Essentials

### ENV's

No Environmental variables are necessary for this process to operate

### Installing

Designed to be used as a Git SubModule with [Agnostic Software Development](https://github.com/sotekton/agnostic)

### NPM Scripts

- `shell`: clean development environment (NPM still used to manage packages)
- `shell:prod`: clean production like environment (NPM still used to manage packages)
- `doc`: generates documentation as per [documentary](https://github.com/artdecocode/documentary)
- `update`: updates package.json dependencies (all) to the latest available versions found on NPM
- `commit`: ensures all linting and hooks run appropriately before commits are accepted.

### Commits

Enter the development environment and run `npm run commit` this will make use of conventionalcommits and all the necessary pre and post git hooks to maintain code quality

%~ -3%

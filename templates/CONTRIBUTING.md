# Contributing to \${project}

From all the existing team currently contributing to ${project}. Thank you for joining the journey of making${project} even more awesome. Feel welcome as we all have all gone through the same process at one point.

We all can agree that its your code that speaks on your behalf in this project. As such all community interactions abide by our simple and easy to follow [Code of Merit (Conduct)](CONDUCT.md) guidelines. By following these standard code-centric guidelines it ensures a two way messaging of respect between current maintainers and any issues or changes you are addressing with the project.

## First Time Contributors

We follow the [Sane Labelling Scheme](https://medium.com/@dave_lunny/sane-github-labels-c5d2e6004b63) tailored for Kanban where _complexity_ labels identify the difficulty of the task.

**Kanban Labels**

- S ~ Under a day's worth of work
- M ~ 3 days or less worth of work
- L ~ 3 days to a Week worth of effort

The difference between _XS_ and _S_ is complexity, where _X_ identifies work would be more suited to those familar with the project or a lot of experience in the space.

> Working on your first Pull Request? You can learn how from this _free_ series, [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

> At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first :smile_cat:
>
> If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

Pull Request & Issue Templates are selected from https://www.talater.com/open-source-templates/#

# Getting started

Ensure that you have followed the Development steps in the README to get your local development environment up and running.

This project uses the [OneFlow](https://www.npmjs.com/package/%40tayloredtechnology%2Foneflow) tooling and workflow, allowing the core maintainers to schedule releases appropriately and new contributors to always have access to the latest stable version of the code.

Additionally [Conventional Commits](https://conventionalcommits.org) is used for all commit messages to ensure SemVer versioning is correctly implemented between releases.

We are striving for [100% code coverage](https://medium.com/@taddgiles/100-code-coverage-is-the-bare-minimum-6525990c02e1) and as such any opportunity to release a `HotFix / Patch` to increase code coverage is always welcome.

## Test Structure

Tests reside in the same directory as source code and are dynamically filtered to execute based on the environment. This follows the micro and nanoservice model to ensure external dependencies operate as expected:

- _spec_: are traditional unit tests. Executed only in CI & Development environments
- _api_: are external REST API calls, they operate in a dual loop, `nocked` the first execution and then executed directly against the external API to ensure eternal dependencies fail fast when breaking changes occur. Executed when Development & Production environments where possible
- _sanity_: are minimal critical path Production environment tests.

## Code Updates (Features)

1.  Create your own fork of the code
2.  Switch to the `develop` branch
3.  If you are working on a new feature run the `OneFlow` new feature command: `oneflow new feature {ID}` where ID is the GitHub Issue Number.
4.  If changing code, ensure that your modifying the respective spec|sanity|api.js test file so the unit tests pass.
5.  Complete your changes, commit as often as you need to but only commit running the command `npm run commit` or `redrun commit` instead of `git commit`. Ensure that `git add {files}` has been run first
6.  Create a pull request

Bugfixes can occur:

- as part of feature development,
- as preparation for release
- or dedicated as a hotfix as they are all automatically tracked in the changelog.

> Where possible, HotFix's should be prioritized over new features, unless as part of development the feature can address one or many HotFix's at the same time.

## Code Updates (HotFix / Patch)

1.  Create your own fork of the code
2.  Switch to the `develop` branch
3.  If you are working on a new feature run the `OneFlow` new hotfix command: `oneflow new hotfix`.
4.  Ensure that your modifying the respective spec|sanity|api.js test file so the unit tests pass.
5.  Commit by running the command `npm run commit` or `redrun commit` instead of `git commit`. Ensure that `git add {files}` has been run first
6.  Create a pull request

# Code review process

Pull Requests are reviewed using the following process:

- (company process for reviewing code)

# Bump Action 

Bump allows you to..well...bump an npm package version using a commit message, and push the package.json update back to the repository.   
[![](https://github.com/tool3/bump/workflows/bump/badge.svg)](https://github.com/tool3/bump/actions)

# Create an action from this template
Click the `Use this Template` and provide the new repo details for your action


# Options
### inputs: 
- *github_token* (required) - github access token.
- user (optional) - user name (default: the user of the current push).
- email (optional) - user email. (default: current user email).
- branch (optional) - branch to work against. (default: `master`).

### outputs:
- version - the version being tagged and pushed.

# Bump strategy
If your head (latest) commit has the keywords `#patch`, `#minor` or `#major` - this action will use that to perform the bump.
Defaults to `patch`.

## Usage
You can consume the action by referencing the v1 branch

```yaml
bump:
  runs-on: ubuntu-latest
  steps:
  - uses: tool3/bump@v1
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      user: 'First Last'
      email: 'user.email@gmail.com'
```
## :warning: Important usage notes
- this action requires `@actions/checkout` to be defined in a previous step. e.g:   
```yaml
bump:
  runs-on: ubuntu-latest
  steps:
  - uses: actions/checkout@master
  - uses: tool3/bump@v1
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      user: 'First Last'
      email: 'user.email@gmail.com'
```
- this action pushes the package.json version update back to the repo (defaults to master).

See the [actions tab](https://github.com/tool3/bump/actions) for runs of this action! :rocket:

# Example 
This is a full example workflow of patching using Bump Action and publishing to github registry and npm.   
```yaml
name: release

on:
  push:
    branches:
    - release
  
jobs:
  version_tag:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: tool3/bump@master
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
  
  publish-npm:
    needs: version_tag
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
          scope: '@username'
      - run: npm ci
      - run: git pull origin master --tags
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
  
  publish-gpr:
    needs: version_tag
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: actions/setup-node@v1
      with:
        node-version: 12
        registry-url: https://npm.pkg.github.com/
        scope: '@username'
    - run: npm ci
    - run: git pull origin master --tags
    - run: npm publish
      env:
        NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```
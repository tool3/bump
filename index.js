const core = require('@actions/core');
// const exec = require('@actions/exec');
const github = require('@actions/github');

async function run() {
  try {
    const user = core.getInput('user');
    const email = core.getInput('email');
    const token = core.getInput('github_token');

    // exec.exec('git pull origin master --tags');
    // const ver = exec.exec('npm view version .');
    // const version = JSON.stringify(ver).version;
    // exec.exec('npm version --no-commit-hooks patch --dry-run');
    const context = github.context;
    console.log(context);
    const { repository: { git_url }, sender: { login } } = github.context.payload;
    core.setOutput('user', user)
    core.setOutput('email', email)
    core.setOutput('token', token)
    core.setOutput('git_url', git_url)
    core.setOutput('context', context);
    core.setOutput(`from ${login}`)

  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()

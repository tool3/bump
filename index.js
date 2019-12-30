const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try { 
    const user = core.getInput('user');
    const email = core.getInput('email');
    const token = core.getInput('github_token');

    exec.exec('git pull origin master --tags');
    const version = exec.exec('npm view version .').version;
    exec.exec('npm version --no-commit-hooks patch');
    core.setOutput(version);
    core.setOutput(user);
    core.setOutput(email);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()

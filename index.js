const core = require('@actions/core');
const { exec } = require('@actions/exec');
const github = require('@actions/github');

async function run() {
  try {
    const user = core.getInput('user');
    const email = core.getInput('email');
    const token = core.getInput('github_token');

    const package = JSON.stringify(exec('npm view version .'));
    const version = package.version;
    const context = github.context;
    
    const { repository: { git_url }, sender: { login } } = github.context.payload;
    exec('git', ['pull', 'origin', 'master', '--tags']);
    exec('npm', ['version', '--no-commit-hooks', 'patch', '--dry-run']);
    console.log('user', user);
    console.log('package', package);
    console.log('version', version);
    console.log('token', token);
    console.log('email', email);
    console.log('git_url', git_url);
    console.log('context', context);
    console.log(`from ${login}`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()

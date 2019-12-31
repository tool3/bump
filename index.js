const core = require('@actions/core');
const { exec } = require('@actions/exec');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit');

Toolkit.run(async tools => {
  {
    try {

      const pkg = tools.getPackageJSON();
      const event = tools.context.payload;
      const context = github.context;

      const { repository: { git_url }, sender: { login }, pusher: { email, name } } = github.context.payload;
      // exec('git', ['pull', 'origin', 'master', '--tags']);s
      exec('git', ['login', '--local', 'user.name', name]);
      exec('git', ['login', '--local', 'user.email', email]);
      exec('npm', ['version', '--no-commit-hooks', 'patch', '--dry-run']);
      exec('git', ['version', '--no-commit-hooks', 'patch', '--dry-run']);

      console.log(pkg);
      console.log(event);
      console.log(login);
      console.log('git_url', git_url);
      console.log('context', context);
    }
    catch (error) {
      core.setFailed(error.message);
    }
  }

});
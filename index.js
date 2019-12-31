const core = require('@actions/core');
const { exec } = require('@actions/exec');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit');

const STRATEGIES = [
  '#patch',
  '#minor',
  '#major'
];

Toolkit.run(async tools => {
  {
    try {
      // get input credentials
      const inputUser = core.getInput('user');
      const inputEmail = core.getInput('email');
      const inputBranch = core.getInput('branch');
      // get current repo
      const pkg = tools.getPackageJSON();
      const event = tools.context.payload;
      const context = github.context;

      const { repository: { git_url }, sender: { login }, pusher: { email, name }, head_commit: { message } } = github.context.payload;

      const strategy = STRATEGIES.filter(strat => message.includes(strat))[0].replace('#', '') || "patch";
      console.log('strategy is: ', strategy);

      // git login and pull
      exec('git', ['config', '--local', 'user.name', inputUser || name]);
      exec('git', ['config', '--local', 'user.email', inputEmail || email]);
      exec('git', ['pull', 'origin', 'master', '--tags']);

      // version by strategy
      exec('npm', ['version', '--no-commit-hooks', strategy, '--dry-run']);
      // /git push "${remote_repo}" HEAD:${INPUT_BRANCH} --follow-tags $_FORCE_OPTION;

      exec('git', ['push', 'origin', `HEAD:${inputBranch}`, '--tags', '--dry-run'])

      console.log(pkg.version);
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
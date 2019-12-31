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

      const { pusher: { email, name }, head_commit: { message } } = github.context.payload;

      const strategy = STRATEGIES.filter(strat => message.includes(strat))[0].replace('#', '') || "patch";
      console.log('strategy is: ', strategy);

      // git login and pull
      exec('git', ['config', '--local', 'user.name', inputUser || name]);
      exec('git', ['config', '--local', 'user.email', inputEmail || email]);
      exec('git', ['pull', 'origin', inputBranch, '--tags']);

      // version by strategy
      exec('npm', ['version', '--no-commit-hooks', strategy, '--dry-run']);

      // push new version and tag
      exec('git', ['push', 'origin', `HEAD:${inputBranch}`, '--tags', '--dry-run'])

    }
    catch (error) {
      core.setFailed(error.message);
    }
  }

});
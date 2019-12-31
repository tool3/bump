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
      // get context
      const { pusher: { email, name }, head_commit: { message } } = github.context.payload;

      // commit message has version regex
      const reg = new RegExp(/(?<=^v?|\sv?)(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*)(?:\.(?:[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*))*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?(?=$|\s)/ig);
      if (reg.test(message)) {
        return core.warning(`build loop safeguard - not running because commit message has a version in it`)
      }

      // get input credentials
      const inputUser = core.getInput('user');
      const inputEmail = core.getInput('email');
      const inputBranch = core.getInput('branch');

      const userName = inputUser || name;
      const userEmail = inputEmail || email;

      const defaultStrategy = STRATEGIES.filter(strat => message.includes(strat))[0] || STRATEGIES[0];
      const strategy = defaultStrategy.replace('#', '');

      tools.log(`running with ${userName} ${userName} and bumping strategy ${strategy}`);
      tools.log(`branch is ${inputBranch}`);
      // git login and pull
      exec('git', ['config', '--local', 'user.name', userName]);
      exec('git', ['config', '--local', 'user.email', userEmail]);
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
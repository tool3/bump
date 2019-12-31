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

      const pkg = tools.getPackageJSON();
      const event = tools.context.payload;
      const context = github.context;

      const { repository: { git_url }, sender: { login }, pusher: { email, name }, head_commit: { message } } = github.context.payload;

      const strategy = STRATEGIES.filter(strat => message.includes(strat))[0] || "#patch";
      console.log('strategy is: ', strategy);

      exec('git', ['config', '--local', 'user.name', name]);
      exec('git', ['config', '--local', 'user.email', email]);
      exec('git', ['pull', 'origin', 'master', '--tags']);
      exec('npm', ['version', '--no-commit-hooks', strategy.replace('#', ''), '--dry-run']);

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
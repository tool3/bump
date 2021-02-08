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
      console.log(github.context);
      // const { head_commit: { message, committer: { email, username } } } = github.context.payload;

      // // get input credentials
      // const inputUser = core.getInput('user');
      // const inputEmail = core.getInput('email');
      // const inputBranch = core.getInput('branch');
      // const unrelated = core.getInput('unrelated');

      // const userName = inputUser || username;
      // const userEmail = inputEmail || email;

      // const defaultStrategy = STRATEGIES.filter(strat => message.includes(strat))[0] || STRATEGIES[0];
      // const strategy = defaultStrategy.replace('#', '');
      // const commitMessage = message.replace(defaultStrategy, '');

      // tools.log(`Latest commit message: ${commitMessage}`);
      // tools.log(`Running with ${userName} ${userEmail} and bumping strategy ${strategy}`);
      // tools.log(`Branch is ${inputBranch}`);


      // // git login and pull
      // const pullArgs = ['pull', 'origin', inputBranch, '--tags'];
      // if (unrelated) {
      //   pullArgs.push('--allow-unrelated-histories');
      // }

      // await exec('git', ['config', '--local', 'user.name', userName]);
      // await exec('git', ['config', '--local', 'user.email', userEmail]);
      // await exec('git', pullArgs);

      // // version by strategy
      
      // await exec('npm', ['version', strategy, '--no-commit-hooks', '-m', `${commitMessage} %s`]);

      // const version = tools.getPackageJSON().version;
      // core.info(`version is ${version}`);
      
      // // push new version and tag
      // await exec('git', ['push', 'origin', `HEAD:${inputBranch}`, '--tags'])

      // // set output version
      // core.setOutput('version', version);
    }
    catch (error) {
      core.setFailed(error.message);

    }
  }
});
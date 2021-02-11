require('dotenv').config();
const inquirer = require('inquirer');
const yargs = require('yargs/yargs');
const api = require('./api');
const utils = require('./utils');
const { execSync } = require('child_process');

const argv = yargs(process.argv).argv;

const handleGitScript = ({ version, name }) => {
  utils.updateConfig({ version, name });
  console.log('version', version);
  execSync(utils.getGitScript(version));
  api.openPR({
    title: `PR from CLI: ${version}`,
    branchName: utils.getNewGitBranch(version),
  });
};

if (argv.i)
  return (
    inquirer
      .prompt(utils.cliPromptQuestions)
      .then(handleGitScript)
      //TODO: Handle error
      .catch((e) => {})
  );

handleGitScript({ name: argv.name, version: argv.vers });

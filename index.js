require('dotenv').config();
const inquirer = require('inquirer');
const { execSync } = require('child_process');
const yargs = require('yargs/yargs');
const api = require('./api');
const utils = require('./utils');

const argv = yargs(process.argv).argv;

const handleGitScript = ({ version, name }) => {
  utils.updateConfig({ version, name });
  execSync(utils.getGitScript(version));
  api
    .openPR({
      title: `PR from CLI: ${version}`,
      branchName: utils.getNewGitBranch(version),
    })
    .then(() => console.log('PR has been successfully opened'))
    //TODO: Handle error
    .catch((e) => {});
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

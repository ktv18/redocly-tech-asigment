const fs = require('fs');
const packageJSONConfig = require('./package.json');

const updateConfig = ({ name, version }) => {
  const { name: oldName, version: oldVersion, ...rest } = packageJSONConfig;
  const newPackageConfig = {
    name,
    version,
    ...rest,
  };

  try {
    fs.writeFileSync(
      './package.json',
      JSON.stringify(newPackageConfig, null, 2)
    );
    console.log('Package.json has been successfully updated');
  } catch (e) {
    //TODO: Handle error
  }
};

const getNewGitBranch = (version) => `new-update-${version}`;

const getGitScript = (version) =>
  `git checkout -b ${getNewGitBranch(
    version
  )} && git add package.json && git commit -m 'Update package with version ${version}' && git push origin ${getNewGitBranch(
    version
  )} && git checkout main`;

const cliPromptQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the new name?',
  },
  {
    type: 'input',
    name: 'version',
    message: 'What is the new version?',
  },
];

module.exports = {
  cliPromptQuestions,
  getNewGitBranch,
  updateConfig,
  getGitScript,
};

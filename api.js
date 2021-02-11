const fetch = require('node-fetch');

const openPR = ({ title, branchName }) => {
  fetch(
    'https://api.bitbucket.org/2.0/repositories/fifuck18/test-1/pullrequests',
    {
      body: `{"title": "${title}", "source": {"branch": {"name": "${branchName}"}}}`,
      headers: {
        Authorization: `Basic ${process.env.AUTORIZATION}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );
};

module.exports = {
  openPR,
};

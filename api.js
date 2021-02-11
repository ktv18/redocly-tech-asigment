const fetch = require('node-fetch');

const openPR = async ({ title, branchName }) => {
  const res = await fetch(
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

  const finalRes = await res.text();
  console.log(';finalRes', finalRes);
};

module.exports = {
  openPR,
};

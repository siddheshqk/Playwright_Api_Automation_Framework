require('dotenv').config();

module.exports = {
  reqresBaseUrl: "https://reqres.in/api",
  githubBaseUrl: "https://api.github.com",

  githubToken: process.env.GITHUB_TOKEN,
  githubUsername: process.env.GITHUB_USERNAME,
  githubRepo: process.env.GITHUB_REPO
};

function validateEnvironment() {
  const requiredVariables = [
    "GITHUB_TOKEN",
    "GITHUB_USERNAME"
  ];

  for (const variable of requiredVariables) {
    if (!process.env[variable]) {
      throw new Error(
        `Missing required environment variable: ${variable}`
      );
    }
  }
}

module.exports = { validateEnvironment };

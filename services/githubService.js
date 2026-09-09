const ApiClient = require("../apiClient/ApiClient");
const env = require("../config/environment");

class GithubService {
  constructor(request) {
    this.apiClient = new ApiClient(request);
  }

  async getRepository() {
    return await this.apiClient.get(
      `${env.githubBaseUrl}/repos/${env.githubUsername}/${env.githubRepo}`,
      {
        headers: {
          Authorization: `Bearer ${env.githubToken}`,
          Accept: "application/vnd.github+json"
        }
      }
    );
  }
}

module.exports = GithubService;

const ApiClient = require("../apiClient/ApiClient");
const env = require("../config/environment");
const logMessage = require("../utils/loggerutil.js");

// const repoName = `dummy-${Date.now()}`;
class GithubService {
  constructor(request) {
    this.apiClient = new ApiClient(request);
  }
  async getRepository() {
    return await this.apiClient.get(`${env.githubBaseUrl}/repos/${env.githubUsername}/${env.githubRepo}`, {
      headers: {
        Authorization: `Bearer ${env.githubToken}`,
        Accept: "application/vnd.github+json"
      }
    }
    );
  }
  async getRepositorycurrent(repoName) {
    logMessage(`getting Repository: ${repoName}`);
    return await this.apiClient.get(`${env.githubBaseUrl}/repos/${env.githubUsername}/${repoName}`, {
      headers: {
        Authorization: `Bearer ${env.githubToken}`,
        Accept: "application/vnd.github+json"
      }
    }
    );
  }

  async createRepository(repoName) {
    logMessage(`Repository Created: ${repoName}`);
    return await this.apiClient.post(`${env.githubBaseUrl}/user/repos`, {
      headers: {
        Authorization: `Bearer ${env.githubToken}`,
        Accept: "application/vnd.github+json"
      },
      data: {
        name: repoName,
        description: "This repository was automatically created using Playwright.",
        private: true,
        auto_init: true
      }
    });
  }

  async DeleteRepository(repoName) {
    logMessage(`Deleting Repository: ${repoName}`);
    return await this.apiClient.delete(`${env.githubBaseUrl}/repos/${env.githubUsername}/${repoName}`, {
      headers: {
        Authorization: `Bearer ${env.githubToken}`,
        Accept: "application/vnd.github+json"
      }
    }
    );
  }
  async getAllRepos() {
    logMessage("Fetching all repositories...");
    const response = await this.apiClient.get(
      `${env.githubBaseUrl}/user/repos?per_page=100&affiliation=owner`, // Add params
      {
        headers: {
          Authorization: `Bearer ${env.githubToken}`,
          Accept: "application/vnd.github+json"
        }
      }
    );

    if (!response.ok) {
      logMessage(`ERROR: Failed to fetch repos - ${response.status}`);
    }

    return response;
  }
}

module.exports = { GithubService }

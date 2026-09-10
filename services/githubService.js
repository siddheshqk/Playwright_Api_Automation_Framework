const ApiClient = require("../apiClient/ApiClient");
const env = require("../config/environment");
const now = new Date();

const repoName =
  `dummy-${now.getFullYear()
  }${String(now.getMonth() + 1).padStart(2, "0")
  }${String(now.getDate()).padStart(2, "0")
  }-${Date.now().toString().slice(-5)
  }`;
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
  async getRepositorycurrent() {
    return await this.apiClient.get(`${env.githubBaseUrl}/repos/${env.githubUsername}/${repoName}`, {
      headers: {
        Authorization: `Bearer ${env.githubToken}`,
        Accept: "application/vnd.github+json"
      }
    }
    );
  }

  async createRepository() {
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

  async DeleteRepository() {
    return await this.apiClient.delete(`${env.githubBaseUrl}/repos/${env.githubUsername}/${repoName}`, {
      headers: {
        Authorization: `Bearer ${env.githubToken}`,
        Accept: "application/vnd.github+json"
      }
    }
    );
  }
}

module.exports = { GithubService, repoName }

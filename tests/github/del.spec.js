require('dotenv').config();
const { test, expect } = require("@playwright/test");
const { GithubService } = require("../../services/githubService");
const logMessage = require("../../utils/loggerutil.js"); // Add this

console.log("Token:", process.env.GITHUB_TOKEN);
console.log("Username:", process.env.GITHUB_USERNAME);
console.log("Repo:", process.env.GITHUB_REPO);

test("Cleanup Dummy Repositories", async ({ request }) => {
  const githubService = new GithubService(request);

  try {
    const response = await githubService.getAllRepos();
    if (!response.ok) {
      throw new Error(`Failed to fetch repos: ${response.status}`);
    }
    const repos = await response.json();
    logMessage(`Found ${repos.length} repositories`);
    repos.forEach(repo => {
      logMessage(`Repository: ${repo.name} (starts with dummy-: ${repo.name.startsWith("dummy-")})`);
    });
    for (const repo of repos) {
      if (repo.name.startsWith("dummy-")) {
        logMessage(`Attempting to delete: ${repo.name}`);
        const deleteResponse = await githubService.DeleteRepository(repo.name);
        if (deleteResponse.ok) {
          logMessage(`✓ Successfully deleted ${repo.name}`);
        } else {
          logMessage(`✗ Failed to delete ${repo.name}: ${deleteResponse.status}`);
        }
      }
    }
  } catch (error) {
    logMessage(`Error: ${error.message}`);
    console.error(error);
  }
});

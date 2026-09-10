const { test, expect } = require("@playwright/test");
const { GithubService } = require("../../services/githubService");
const { generateRepoName } = require("../../utils/repoNameGenerator");

test.describe.serial("GitHub Repository Flow", () => {
  test("Verify GitHub Repo Exists", async ({ request }) => {
    const githubService = new GithubService(request);
    const repoName = generateRepoName("Verify");
    console.log(repoName);
    try {
      const createResponse = await githubService.createRepository(repoName);
      expect(createResponse.status()).toBe(201);
      const response = await githubService.getRepositorycurrent(repoName);
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      //console.log(response.status());
      //console.log(await response.text());
      expect(responseBody.name).toBe(repoName);
    } finally {
      await githubService.DeleteRepository(repoName);
    }
  });

  test("Create Repository with today's date", async ({ request }) => {
    const githubService = new GithubService(request);
    const repoName = generateRepoName("Create");
    console.log(repoName);
    try {
      const response = await githubService.createRepository(repoName);
      expect(response.status()).toBe(201);
      const responseBody = await response.json();
      //console.log(response.status());
      //console.log(await response.text());
      expect(responseBody.name).toBe(repoName);
    } finally {
      await githubService.DeleteRepository(repoName);
    }
  });

  test("Delete Created Repository ", async ({ request }) => {
    const githubService = new GithubService(request);
    const repoName = generateRepoName("Delete");
    console.log(repoName);

    const createResponse = await githubService.createRepository(repoName);
    expect(createResponse.status()).toBe(201);
    const response = await githubService.DeleteRepository(repoName);
    expect(response.status()).toBe(204);
    //console.log(response.status());
    //console.log(await response.text());
  });

});

const { test, expect } = require("@playwright/test");
const env = require("../../config/environment");
const GithubService = require("../../services/githubService");
test("Verify GitHub Repo Exists", async ({ request }) => {

  const githubService = new GithubService(request);
  const response = await githubService.getRepository();

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.name).toBe(env.githubRepo);
});

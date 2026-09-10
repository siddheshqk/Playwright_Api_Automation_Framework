const { test, expect } = require("@playwright/test");
const env = require("../../config/environment");
const { GithubService, repoName } = require("../../services/githubService");
const logMessage = require("../../utils/loggerutil.js");

test("Verify GitHub Repo Exists", async ({ request }) => {

  const githubService = new GithubService(request);
  const response = await githubService.getRepository();

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log(response.status());
  console.log(await response.text());

  expect(responseBody.name).toBe(env.githubRepo);
});

test("Create Repository with today's date", async ({ request }) => {
  const githubService = new GithubService(request);
  const response = await githubService.createRepository();

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  console.log(response.status());
  console.log(await response.text());

  expect(responseBody.name).toBe(repoName);

  logMessage(`Repository Created: ${repoName}`);
});

test("Verify Created GitHub Repo Exists", async ({ request }) => {

  const githubService = new GithubService(request);
  const response = await githubService.getRepositorycurrent();

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log(response.status());
  console.log(await response.text());

  expect(responseBody.name).toBe(repoName);

  logMessage(`Repository Verified: ${repoName}`);
});

test("Delete Created Repository ", async ({ request }) => {

  const githubService = new GithubService(request);
  const response = await githubService.DeleteRepository();

  expect(response.status()).toBe(204);
  logMessage(`Repository Deleted: ${repoName}`);
  console.log(response.status());
  console.log(await response.text());
});

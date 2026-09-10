const { test, expect } = require("@playwright/test");
const { GithubService } = require("../../services/githubService");
const { validateSchema } = require("../../utils/schemaValidator");
const { repositorySchema } = require("../../schemas/repoSchema");
const { generateRepoName } = require("../../utils/repoNameGenerator");

test("Create repository and validate schema", async ({ request }) => {
  const githubService = new GithubService(request);
  const repoName = generateRepoName("Schema");
  console.log(repoName);
  try {
    const createResponse = await githubService.createRepository(repoName);
    expect(createResponse.status()).toBe(201);
    const repo = await createResponse.json();
    expect(repo.name).toBe(repoName);
    const isValid = validateSchema(repo, repositorySchema, "Created Repository");
    expect(isValid).toBe(true);
  } finally {
    await githubService.DeleteRepository(repoName);
  }
});

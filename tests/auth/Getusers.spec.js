const { test, expect } = require('@playwright/test');
const UserService = require('../../services/UserService');

test('Get users', async ({ request }) => {
  const userService = new UserService(request);

  const response = await userService.getUsers();

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data.length).toBeGreaterThan(0);
});

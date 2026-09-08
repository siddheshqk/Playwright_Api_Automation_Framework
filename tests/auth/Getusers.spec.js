const { test, expect } = require('@playwright/test');

test('Get users', async ({ request }) => {
  const response = await request.get(
    'https://reqres.in/api/users?page=2'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data.length).toBeGreaterThan(0);
});

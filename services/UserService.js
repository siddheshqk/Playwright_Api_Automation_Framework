import { defineConfig, devices } from '@playwright/test';
const ApiClient = require('../apiClient/ApiClient');
const config = require('../config/environment');

class UserService {
  constructor(request) {
    this.apiClient = new ApiClient(request);
  }

  async getUsers() {
    return await this.apiClient.get(
      `${config.reqresBaseUrl}/users?page=2`
    );
  }
}

module.exports = UserService;

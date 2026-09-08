const ApiClient = require('../apiClient/ApiClient');

class UserService {
  constructor(request) {
    this.apiClient = new ApiClient(request);
  }

  async getUsers() {
    return await this.apiClient.get(
      'https://reqres.in/api/users?page=2'
    );
  }
}

module.exports = UserService;

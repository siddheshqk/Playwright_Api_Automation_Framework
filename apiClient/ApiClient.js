class ApiClient {
  constructor(request) {
    this.request = request;
  }

  async get(url, options = {}) {
    return await this.request.get(url, options);
  }

  async post(url, options = {}) {
    return await this.request.post(url, options);
  }

  async put(url, options = {}) {
    return await this.request.put(url, options);
  }

  async delete(url, options = {}) {
    return await this.request.delete(url, options);
  }
}

module.exports = ApiClient;


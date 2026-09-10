module.exports = {
  repositorySchema: {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      private: { type: "boolean" },
      owner: {
        type: "object",
        properties: {
          login: { type: "string" },
          id: { type: "number" }
        },
        required: ["login", "id"]
      }
    },
    required: ["id", "name", "private", "owner"]
  }
};

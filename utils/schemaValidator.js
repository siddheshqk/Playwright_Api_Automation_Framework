const Ajv = require("ajv");
const logMessage = require("./loggerutil");

const ajv = new Ajv();

function validateSchema(data, schema, schemaName) {
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  if (!isValid) {
    const errors = validate.errors.map(
      error => `${error.instancePath || "root"} ${error.message}`
    ).join(", ");
    logMessage(`Schema validation failed for ${schemaName}: ${errors}`);
    return false;
  }
  logMessage(`Schema validation passed for ${schemaName}`);
  return true;
}
module.exports = { validateSchema };

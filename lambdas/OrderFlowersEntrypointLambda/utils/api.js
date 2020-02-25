
/**
 * Generate an API Gateway response object
 * @param {any} data
 * @param {number} statusCode
 * @param {{[key: string]: string}} headers
 */
module.exports.response = function(data, statusCode = 200, headers = {}) {
  headers['Content-Type'] = typeof data === 'string'
    ? 'text/plain'
    : 'application/json'
  return {
    "isBase64Encoded": false,
    "statusCode": statusCode,
    "headers": headers,
    "body": typeof data === 'string'
      ? data
      : JSON.stringify(data),
  };
}
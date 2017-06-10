/**
 * Checks the request object for the specified body fields
 * @param {Object} req Express request object
 * @param {Array.<string>} fields Array of fields to check for
 */
module.exports = function (req, fields) {
  if (!req.hasOwnProperty('body')) return false

  var missingFields = fields.some(function(field) {
    return !req.body.hasOwnProperty(field)
  })

  return !missingFields
}
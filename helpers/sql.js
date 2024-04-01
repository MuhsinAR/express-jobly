const { BadRequestError } = require("../expressError");

/**
  *
 * This function constructs the SET clause of an SQL UPDATE statement,
 * allowing the calling function to selectively update specific fields.
 *
 * @param dataToUpdate {Object} An object containing fields to be updated along with their new values.
 *   Example: { field1: newVal, field2: newVal, ... }
 * @param jsToSql {Object} A mapping of JavaScript-style data fields to database column names.
 *   Example: { firstName: "first_name", age: "age" }
 *
 * @returns {Object} An object containing the SQL SET clause and corresponding values.
 *   Example: { setCols: '"first_name"=$1, "age"=$2', values: ['Aliya', 32] }
 *
 * @throws {BadRequestError} Thrown if the dataToUpdate object is empty.
 *
 * @example
 *   const dataToUpdate = { firstName: 'Aliya', age: 32 };
 *   const jsToSql = { firstName: 'first_name' };
 *   const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
 *   // Result: { setCols: '"first_name"=$1, "age"=$2', values: ['Aliya', 32] }
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // Constructing SQL SET clause
  const setCols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  ).join(", ");

  return {
    setCols,
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };

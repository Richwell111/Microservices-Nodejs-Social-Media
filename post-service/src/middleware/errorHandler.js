<<<<<<< HEAD
import logger  from "../utils/logger.js";
=======
const logger = require("../utils/logger");

>>>>>>> 452b70bc9fdd1bb39e19c04a001b1a1adbc18377
const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
};

<<<<<<< HEAD
export { errorHandler };


=======
module.exports = errorHandler;
>>>>>>> 452b70bc9fdd1bb39e19c04a001b1a1adbc18377

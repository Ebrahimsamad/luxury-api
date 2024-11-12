const imagekit = require("../utils/imageKit");
const CustomError = require("../utils/customError");

module.exports = (folderName) => async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  try {
    const response = await imagekit.upload({
      file: req.file.buffer,
      fileName: `${folderName}-image` + Date.now(),
      folder: folderName,
    });
    req.body.image = response.url;
    next();
  } catch (err) {
    return next(new CustomError(err.message, 500));
  }
};

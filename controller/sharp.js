const CustomError = require("../utils/customError");
const Sharp = require("../models/sharp");

exports.createSharp = async (req, res, next) => {
  const { code, image } = req.body;

  const sharpSaved = await Sharp.findOne({ code });

  if (sharpSaved) {
    return next(new CustomError("Sharp with this code already exists.", 409));
  }

  const sharp = new Sharp({ code, image });

  try {
    const savedSharp = await sharp.save();
    res
      .status(201)
      .send({ message: "Sharp created successfully", sharp: savedSharp });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.getAllSharps = async (req, res, next) => {
  try {
    const sharps = await Sharp.find();
    res.status(200).send({ message: "All Sharps", sharps });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.editSharp = async (req, res, next) => {
  try {
    const body = req.body;
    if (body.code) {
      const sharpSaved = await Sharp.findOne({ code: body.code });

      if (sharpSaved) {
        return next(
          new CustomError("Sharp with this code already exists.", 409)
        );
      }
    }
    const sharp = await Sharp.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    if (!sharp) {
      return next(new CustomError("Sharp not found.", 404));
    }

    res.status(200).send({ message: "Updated successfully", sharp });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.deleteSharp = async (req, res, next) => {
  try {
    const sharp = await Sharp.findByIdAndDelete(req.params.id);
    if (!sharp) {
      return next(new CustomError("Sharp not found.", 404));
    }
    res.status(200).send({ message: "Deleted successfully", sharp });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = (role) => async (req, res, next) => {
  if (role === req.user.isSuperAdmin) return next();
  res.status(403).send({ message: "Not authorized" });
};

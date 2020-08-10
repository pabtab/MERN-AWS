exports.read = (req, res) => {
  req.profile.hashed_passord = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile)
}
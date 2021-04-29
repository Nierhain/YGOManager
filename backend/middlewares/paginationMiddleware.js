const paginateResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const query = req.query.search || "";
    const regex = new RegExp(query, "i");
    const startIndex = (page - 1) * limit;
    const totalItems = query
      ? await model.countDocuments({ name: { $regex: regex } }).exec()
      : await model.estimatedDocumentCount().exec();

    try {
      res.paginatedResults = await model
        .find({ name: { $regex: regex } })
        .limit(limit)
        .skip(startIndex)
        .lean()
        .exec();
      res.page = page;
      res.limit = limit;
      res.totalItems = totalItems;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};

module.exports = paginateResults;

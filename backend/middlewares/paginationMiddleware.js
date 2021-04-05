
const paginateResults = (model) => {
    return async(req, res, next) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        
        const startIndex = (page - 1) * limit
        const totalItems = model.estimatedDocumentCount()
        
        try {
            res.paginatedResults = await model.find().limit(limit).skip(startIndex).exec()
            res.page = page
            res.limit = limit
            res.totalItems = totalItems
            next()
        } catch (err){
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = paginateResults
const routeNotFound = (req, res, next) => {
    res.status(404).json({ success: false, message: 'No Route Found' })
}

module.exports = routeNotFound;
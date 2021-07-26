const errorHandler = (err, req, res) => {
   res.status(500).json({ success: false, message: err.message });
};

module.exports = errorHandler;

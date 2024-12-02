function parseJSON(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            messaggio: 'JSON malformato.'
        })
    }
    next();
}

module.exports = parseJSON;
const notFound = (req, res) =>{
    return res.status(404).send('<h1>Not found 404</h1>');
}

module.exports = notFound;
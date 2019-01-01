module.exports = (router,path) => {
    router.get('/style/bootstrap', function(req, res) {
        res.sendFile(path.resolve('node_modules/bootstrap/dist/css/bootstrap.min.css'));
    });
}

module.exports = (router,path) => {
    router.get('/scripts/bootstrap', function(req, res) {
        res.sendFile(path.resolve('node_modules/bootstrap/dist/js/bootstrap.min.js'));
    });
 
    router.get('/scripts/jquery', function(req, res) {
        res.sendFile(path.resolve('node_modules/jquery/dist/jquery.min.js'));
    });

    router.get('/scripts/popper.js', function(req, res) {
        res.sendFile(path.resolve('node_modules/popper.js/dist/popper.min.js'));
    });
}
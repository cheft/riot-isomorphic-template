module.exports = function(router, model) {
    
    var handle = require('./handle')(model);
    
    router.get('/count', function(req, rep) {
        handle.doCount(req, rep);
    });

    router.get('/:id', function(req, rep) {
        handle.doGetOne(req, rep);
    });

    router.get('/', function(req, rep) {
        handle.doGetAll(req, rep);
    });

    router.post('/', function(req, rep) {
        handle.doCreate(req, rep);
    });

    router.put('/:id', function(req, rep) {
        handle.doUpdate(req, rep);
    });

    router.delete('/:id', function(req, rep) {
        handle.doRemove(req, rep);
    });
};

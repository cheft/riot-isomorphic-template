module.exports = {
    on: {
        load: function(id) {
            var self = this;
            self.done = 'news.done';
            self.page = self.page || 1;
            app.rest.get('/news/count', function(rep) {
                var count = rep ? rep.count : 0;
                self.pages = count % app.config.pageSize === 0 ? count / app.config.pageSize : parseInt(count / app.config.pageSize) + 1;
                self.update();
            });
            app.rest.get('/news?page=' + self.page, function(rep) {
                self.messages = rep;
                self.update();
                app.trigger('news.done');
            });
        }
    },

    do: {
        create: function() {
            app.router.go('/news/create')
        },
        prev: function() {
            if(this.page <= 1) {
                return;
            }
            this.page = this.page - 1;
            this.trigger('load');
        },
        next: function() {
            if(this.page >= this.pages) {
                return;
            }
            this.page = this.page + 1;
            this.trigger('load');
        }
    }
}
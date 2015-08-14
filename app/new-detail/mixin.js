var rest = require('../../lib/rest');

module.exports = {
    on: {
        init: function() {
            this.trigger('initData');
        },
        update: function() {
            if(this.news && this.news.cover) {
                this.coverPath = app.config.uploadAccess + '/' + this.news.timestamp + '/' + this.news.cover;
            }
        },
        initData: function() {
            var self = this;
            if(self.opts.params[0] === 'create') {
                self.isEdit = true;
                self.news = {};
                self.update();
                return;
            }
            self.done = 'new.done';
            app.rest.get('/news/' + self.opts.params[0], function(rep) {
                self.news = rep;
                self.update();
                app.trigger('new.done');
            });
        }
    },

    do: {
        edit: function() {
            this.isEdit = !this.isEdit;
        },
        remove: function() {
            var result = confirm('Are you ABSOLUTELY sure?');
            if(result) {
                app.rest.del('/news/' + this.news.id, function(rep) {
                    app.router.back();
                });
            }
        },
        save: function() {
            var errorMsg = "";
            if(this.id.value === "" && this['cover{_id}'].value === "") {
                errorMsg += 'cover required.<br />';
            }
            if(this['cover{_id}'].value !== "") {
                var filename = this['cover{_id}'].value;
                var ext = filename.substr(filename.lastIndexOf('.'), filename.length);
                if(ext !== '.png' && ext !== '.jpg' && ext !== '.jepg') {
                    errorMsg += 'cover only support jpg/png image.<br />';
                }
            }
            if(this['subject{_id}'].value === "") {
                errorMsg += 'subject required.<br />';
            }
            if(this['content{_id}'].value === "") {
                errorMsg += 'content required.<br />';
            }
            if(errorMsg !== "") {
                this.errorMsg = errorMsg;
                return true;
            }
            var formData = new FormData(this.news_form);
            var uploadRest = rest({apiRoot: app.config.apiRoot, contentType: false, processData: false});
            uploadRest.post('/news', formData, function(rep) {
                app.router.back();
            });
        },
        publish: function() {
            var self = this;
            app.rest.put('/news/' + this.id.value + '/publish', function(rep) {
                if(rep.error) {
                    console.log(rep.error);
                    self.errorMsg = rep.error;
                    self.update();
                }else {
                    app.router.back();
                }
            });
        },
        unpublish: function() {
            app.rest.put('/news/' + this.id.value + '/unpublish', function(rep) {
                app.router.back();
            });
        }
    }
}
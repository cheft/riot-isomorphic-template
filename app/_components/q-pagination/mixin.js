module.exports = {
    do: {
        prev: function() {
            if(this.opts.pagination.page <= 1) {
                return;
            }
            this.opts.pagination.page = this.opts.pagination.page - 1;
            this.opts.pagination.component.trigger('initData');
        },
        next: function() {
            if(this.opts.pagination.page >= this.opts.pagination.pages) {
                return;
            }
            this.opts.pagination.page = this.opts.pagination.page + 1;
            this.opts.pagination.component.trigger('initData');
        }
    }
}

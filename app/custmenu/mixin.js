module.exports = {
    on: {
        init: function() {
            var self = this;
            self.done = 'custmenu.done';
            app.rest.get('/custmenu', function(rep) {
                self.data = rep;
                self.update();
                app.trigger('custmenu.done');
            });
        },
        updated: function() {
            setTimeout(function() {
               componentHandler.upgradeAllRegistered(); 
            }, 100);
        }
    },
    do: {
        select_menu: function(e) {
            this.menu = e.item;
            return true;
        }
    }
}

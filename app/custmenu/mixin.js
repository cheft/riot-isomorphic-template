module.exports = {
    on: {
        init: function() {
            var self = this;
            self.done = 'custmenu.done';
            app.rest.get('/custmenu', function(rep) {
                self.menus = rep;
                self.update();
                app.trigger('custmenu.done');
            });
        },
        mount: function() {
            setTimeout(function() {
               componentHandler.upgradeAllRegistered(); 
            }, 50);
        }
    },
    do: {
        selectMenu: function(e) {
            this.update({item: e.item, menus: this.menus});
            e.preventUpdate = true;
            return true;
        },
        addMenu: function(e) {
            alert('最多只能创建三个一级菜单');
        },
        addSubMenu: function(e) {
            this.item = {};
            return true;
        },
        saveMenu: function(e) {
            this.item = {name: this.name.value};
            if(this.type_click.checked) {
                this.item.type = "click";
                this.item.key = this.value.value;
            }else if(this.type_view.checked) {
                this.item.type = "view";
                this.item.url = this.value.value;
            }
        },
        pushMenu: function(e) {

        }
    }
}

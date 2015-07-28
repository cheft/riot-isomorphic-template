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
            this.trigger('upgrade');
        },
        upgrade: function() {
            setTimeout(function() {
               componentHandler.upgradeAllRegistered(); 
            }, 50);
        }
    },
    do: {
        getMenuByName: function(name) {
            var btns = this.menus.menu.button;
            for(var i = 0; i < btns.length; i++) {
                if(name === btns[i].name) {
                    return btns[i];
                }
                for(var k = 0; k < btns[i].sub_button.length; k++) {
                    if(name === btns[i].sub_button[k].name) {
                        return btns[i].sub_button[k];
                    }
                }
            }
        },
        selectMenu: function(e) {
            this.update({item: e.item, menus: this.menus});
            e.preventUpdate = true;
            return true;
        },
        addMenu: function(e) {
            // alert('最多只能创建三个一级菜单');
            this.item = {};
            return true;
        },
        addSubMenu: function(e) {
            this.item = {pname: e.item.name};
            return true;
        },
        saveMenu: function(e) {
            var btns = this.menus.menu.button;
            var menu = this.getMenuByName(this.oldname.value);
            var isAdd = false;
            if(!menu) {
                status = true;
                menu = {name: this.name.value};
            }else {
                menu.name = this.name.value;
            }
            if(this.type_click.checked) {
                menu.type = "click";
                menu.key = this.value.value;
            }else if(this.type_view.checked) {
                menu.type = "view";
                menu.url = this.value.value;
            }
            if(isAdd) {
                if(this.pname.value === '') {
                    btns.push(menu);
                }else{
                    var pmenu = this.getMenuByName(this.pname.value);
                    pmenu.sub_button.push(menu);
                }
            }
            console.log(btns);
            this.trigger('upgrade');
        },
        pushMenu: function(e) {

        }
    }
}

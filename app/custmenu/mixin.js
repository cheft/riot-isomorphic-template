module.exports = {
    on: {
        init: function() {
            var self = this;
            self.done = 'custmenu.done';
            app.rest.get('/custmenu', function(rep) {
                self.menus = rep;
                self.update();
                app.trigger('custmenu.done');
                self.trigger('upgrade');
            });
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
        removeMenuByName: function(name) {
            var btns = this.menus.menu.button;
            for(var i = 0; i < btns.length; i++) {
                if(name === btns[i].name) {
                    return btns.splice(i, 1);
                }
                for(var k = 0; k < btns[i].sub_button.length; k++) {
                    if(name === btns[i].sub_button[k].name) {
                        return btns[i].sub_button.splice(k, 1);
                    }
                }
            }
        },
        removeMenuSubButton: function() {
            var btns = this.menus.menu.button;
            for(var i = 0; i < btns.length; i++) {
                if(btns[i].sub_button.length === 0) {
                    delete btns[i].sub_button;
                    continue;
                }
                for(var k = 0; k < btns[i].sub_button.length; k++) {
                    if(btns[i].sub_button[k].sub_button.length === 0) {
                        delete btns[i].sub_button[k].sub_button;
                    }
                }
            }
        },
        selectMenu: function(e) {
            this.update({item: e.item, menu: this.menus.menu});
            e.preventUpdate = true;
            e.target.parentNode.parentNode.classList.remove('is-visible');
            return true;
        },
        addMenu: function(e) {
            var btns = this.menus.menu.button;
            if(btns.length > 2) {
                return alert('最多只能创建3个一级菜单');
            }
            this.item = {};
            return true;
        },
        addSubMenu: function(e) {
            var menu = this.getMenuByName(e.item.name);
            if(menu.sub_button.length > 4) {
                return alert('最多只能创建5个一级菜单');
            }
            this.item = {pname: e.item.name};
            return true;
        },
        saveMenu: function(e) {
            var menu = this.getMenuByName(this.oldname.value);
            var isAdd = false;
            if(!menu) {
                isAdd = true;
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
                    var btns = this.menus.menu.button;
                    if(btns.length > 2) {
                        return alert('最多只能创建3个一级菜单');
                    }
                    btns.push(menu);
                }else{
                    var pmenu = this.getMenuByName(this.pname.value);
                    if(pmenu.sub_button.length > 4) {
                        return alert('最多只能创建5个一级菜单');
                    }
                    pmenu.sub_button.push(menu);
                }
            }
            e.preventUpdate = true;
            this.update({item: {}});
            this.trigger('upgrade');
        },
        removeMenu: function(e) {
            this.removeMenuByName(this.oldname.value);
            this.update({item: {}, menu: this.menus.menu});
            e.preventUpdate = true;
            return true;
        },
        pushMenu: function(e) {
            this.removeMenuSubButton();
            console.log(this.menus.menu);
            app.rest.post('/custmenu', {menu: JSON.stringify(this.menus.menu)}, function(data) {
                console.log(data);
                alert('推送成功，请于微信公众号中查看');
            });
        }
    }
}

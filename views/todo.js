var riot = require('riot');

riot.tag('todo', ' <h3>{ opts.title }</h3> <ul> <li each="{ item, i in items }">{ item }</li> </ul> <input name="title"> <button onclick="{add}">Add #{ items.length + 1 }</button> ', function(opts) {
    this.items = []

    this.add = function(e) {
      this.items.push(this.title.value)
      this.title.value = ''
    }.bind(this);
  
});
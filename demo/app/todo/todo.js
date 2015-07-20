module.exports = {
	on: {
		init: function() {
			this.title = 'TODO';
			this.items = [];     
		}
	},
	do: {
		add: function(e) {
            this.items.push(this.todo.value)
            this.todo.value = ''
        }
	}
}
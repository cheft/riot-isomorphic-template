var columns = require('./columns');

module.exports = {
	on: {
		init: function() {
			console.log(1111);
		},
		load: function() {
			this.pagination = {
				page: 1,
				pages: 3,
				component: this.tags['q-grid']
			};
			this.grid = {
				columns: columns,
				data: [
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '东门', 'seat': 'A座'},
					{property: 'ssss', name: '美丽湾公寓', status: '售', cycle: '地王大厦', 'seat': 'B座'}
				]
			};
		}
	}
}
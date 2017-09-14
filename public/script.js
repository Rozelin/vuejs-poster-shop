new Vue({
	el: '#app',
	data: {
		total: +0,
		items: [
			{ id: 1, title: "Item 1", price: 12.33 },
			{ id: 2, title: "Item 2", price: 7.67 },
			{ id: 3, title: "Item 3", price: 21.34 }
		],
		cart: [],
		search: ''
		},
	methods: {
		addItem: function(index) {
			this.total += this.items[index].price;
			var item = this.items[index];
			var found = false;
			for (var i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === item.id) {
					this.cart[i].qty++;
					found = true;
					break;
				}
			}
			if (!found) {
				this.cart.push({
					price: item.price,
					id: item.id,
					title: item.title,
					qty: 1
				});
			}
		},
		inc: function(item) {
			item.qty++;
			this.total += item.price;
		},
		dec: function(item) {
			item.qty--;
			this.total -= item.price;
			if (item.qty <= 0) {
				for (var i = 0; i < this.cart.length; i++) {
					if (this.cart[i].id === item.id) {
						this.cart.splice(i, 1);
						break;
					}
				}
			}
		},
		onSubmit: function() {
			this.$http
			.get('/search/'.concat('90s'))
			.then(function(res) {
				console.log(res);
			});
		}
	},
	filters: {
		currency: function(price) {
			return '$'.concat(price.toFixed(2));
		}
	}
});

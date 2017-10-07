var PRICE = 9.99;
var LOAD_NUM = 10;

new Vue({
	el: '#app',
	data: {
		total: +0,
		items: [],
		resultNum: null,
		cart: [],
		search: 'love',
		lastSearch: '',
		loading: false,
		price: PRICE
		},
	methods: {
		appendItems: function() {
			if (this.items.length < this.result.length) {
				var append = this.result.slice(this.items.length, this.items.length + LOAD_NUM);
				this.items = this.items.concat(append);
			}

		},
		addItem: function(index) {
			this.total += PRICE;
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
					price: PRICE,
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
			this.result = [];
			this.items = [];
			this.loading = true;
			this.$http
			.get('/search/'.concat(this.search))
			.then(function(res) {
				this.result = res.data;
				this.resultNum = res.data.length;
				this.appendItems();
				this.lastSearch = this.search;
				this.loading = false;
			}, function(res) {
				this.loading = false;
			});
		}
	},
	filters: {
		currency: function(price) {
			return '$'.concat(price.toFixed(2));
		}
	},
	mounted: function() {
		this.onSubmit();

		var vueInstance = this;
		var scrolElem = document.getElementById('product-list-bottom');
		var watcher = scrollMonitor.create(scrolElem);
		watcher.enterViewport(function() {
			vueInstance.appendItems();
		});
	}
});

var myportfolio;
(function (myportfolio) {
    var CartService = /** @class */ (function () {
        function CartService($q, $window, stockService, storageService, userService) {
            var _this = this;
            this.$q = $q;
            this.$window = $window;
            this.stockService = stockService;
            this.storageService = storageService;
            this.userService = userService;
            this.data = {
                carts: [],
                currentCart: null
            };
            this.stockService.getStocks().then(function (stocks) {
                _this.stocks = stocks;
                _this.data.carts = _this.loadFromState();
            });
        }
        CartService.prototype.getStateKey = function () {
            var user = this.userService.getCurrentUser();
            return !!user ? "myportfolio-carts-" + user.key : null;
        };
        CartService.prototype.loadFromState = function () {
            var _this = this;
            console.log('myportfolio::load from state');
            var stateKey = this.getStateKey();
            if (!stateKey) {
                return null;
            }
            var state = this.$window.localStorage.getItem(stateKey) ?
                JSON.parse(this.$window.localStorage.getItem(stateKey)) :
                [];
            var data = state.map(function (cs) { return ({
                key: cs.key,
                name: cs.name,
                items: cs.items.map(function (i) { return myportfolio._find(_this.stocks, function (s) { return s.isin === i; }); })
            }); });
            return data;
        };
        CartService.prototype.saveToState = function () {
            var _this = this;
            console.log('myportfolio::save to state');
            var stateKey = this.getStateKey();
            if (!!stateKey) {
                var state = this.data.carts.map(function (d) { return ({
                    key: d.key,
                    name: d.name,
                    items: d.items.map(function (i) { return i.isin; })
                }); });
                this.$window.localStorage.setItem(stateKey, JSON.stringify(state));
                if (!this.data.currentCart || !myportfolio._find(this.data.carts, function (c) { return c.key === _this.data.currentCart.key; })) {
                    this.data.currentCart = null;
                }
            }
        };
        CartService.prototype.refreshState = function () {
            this.data.carts = this.loadFromState();
            this.data.currentCart = null;
        };
        CartService.prototype.updateState = function () {
            this.saveToState();
        };
        CartService.prototype.store = function () {
            var stateToStore = this.data.carts.map(function (d) { return ({
                key: d.key,
                name: d.name,
                items: d.items.map(function (i) { return i.isin; })
            }); });
            return this.storageService.save(stateToStore);
        };
        CartService.prototype.retrieve = function () {
            var _this = this;
            return this.storageService.load().then(function (state) {
                _this.data.carts = state.map(function (cs) { return ({
                    key: cs.key,
                    name: cs.name,
                    items: cs.items.map(function (i) { return myportfolio._find(_this.stocks, function (s) { return s.isin === i; }); })
                }); });
                _this.saveToState();
            });
        };
        CartService.prototype.getState = function () {
            return this.data;
        };
        CartService.prototype.getCarts = function () {
            return this.data.carts;
        };
        CartService.prototype.getCart = function (cartKey) {
            return myportfolio._find(this.data.carts, function (c) { return c.key === cartKey; });
        };
        CartService.prototype.addCart = function (cart) {
            this.data.carts.push(cart);
            this.saveToState();
        };
        CartService.prototype.removeCart = function (cartKey) {
            var cart = this.getCart(cartKey);
            if (cart != null) {
                this.data.carts.splice(this.data.carts.indexOf(cart), 1);
                this.saveToState();
            }
        };
        CartService.prototype.setCurrentCart = function (cartKey) {
            this.data.currentCart = this.getCart(cartKey);
        };
        CartService.prototype.getCartItems = function (cartKey) {
            var cart = this.getCart(cartKey);
            if (cart != null) {
                return cart.items;
            }
            return [];
        };
        CartService.prototype.getCartItem = function (cartKey, isin) {
            var cart = this.getCart(cartKey);
            if (cart != null) {
                return myportfolio._find(cart.items, function (s) { return s.isin === isin; });
            }
            return null;
        };
        CartService.prototype.addCartItem = function (cartKey, isin) {
            var cart = this.getCart(cartKey);
            if (cart != null) {
                var exists = myportfolio._find(cart.items, function (i) { return i.isin === isin; });
                if (!exists) {
                    var stock = myportfolio._find(this.stocks, function (s) { return s.isin === isin; });
                    if (stock != null) {
                        cart.items.push(stock);
                        this.saveToState();
                    }
                }
            }
        };
        CartService.prototype.removeCartItem = function (cartKey, isin) {
            var cart = this.getCart(cartKey);
            if (cart != null) {
                var cartItem = myportfolio._find(cart.items, function (s) { return s.isin === isin; });
                if (cartItem != null) {
                    cart.items.splice(cart.items.indexOf(cartItem), 1);
                    this.saveToState();
                }
            }
        };
        CartService.$inject = ['$q', '$window', 'stockService', 'storageService', 'userService'];
        return CartService;
    }());
    myportfolio.CartService = CartService;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=cart-service.js.map
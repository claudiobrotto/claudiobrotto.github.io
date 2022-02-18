module myportfolio {

    export class CartService {

        public static $inject = ['$q', '$window', 'stockService', 'storageService', 'userService'];

        private data: ICartServiceState;
        private stocks: IStock[];

        constructor(
            private $q: ng.IQService,
            private $window: ng.IWindowService,
            private stockService: StockService,
            private storageService: StorageService,
            private userService: UserService) {

            this.data = {
                carts: [],
                currentCart: null
            };
            this.stockService.getStocks().then(stocks => {
                this.stocks = stocks;
                this.data.carts = this.loadFromState();
            })
        }

        private getStateKey(): string {
            const user = this.userService.getCurrentUser();
            return !!user ? `myportfolio-carts-${user.key}` : null;
        }

        private loadFromState(): ICart[] {
            console.log('myportfolio::load from state');
            const stateKey = this.getStateKey();
            if (!stateKey) {
                return null;
            }
            let state = this.$window.localStorage.getItem(stateKey) ?
                <ICartState[]>JSON.parse(this.$window.localStorage.getItem(stateKey)) :
                [];
            let data = state.map(cs => <ICart>{
                key: cs.key,
                name: cs.name,
                items: cs.items.map(i => _find(this.stocks, s => s.isin === i))
            });
            return data;
        }

        private saveToState() {
            console.log('myportfolio::save to state');
            const stateKey = this.getStateKey();
            if (!!stateKey) {
                let state = this.data.carts.map(d => <ICartState>{
                    key: d.key,
                    name: d.name,
                    items: d.items.map(i => i.isin)
                });
                this.$window.localStorage.setItem(stateKey, JSON.stringify(state));
                if (!this.data.currentCart || !_find(this.data.carts, c => c.key === this.data.currentCart.key)) {
                    this.data.currentCart = null;
                }
            }
        }

        refreshState() {
            this.data.carts = this.loadFromState();
            this.data.currentCart = null;
        }

        updateState() {
            this.saveToState();
        }

        store(): ng.IPromise<ICartState[]> {
            let stateToStore = this.data.carts.map(d => <ICartState>{
                key: d.key,
                name: d.name,
                items: d.items.map(i => i.isin)
            });
            return this.storageService.save(stateToStore);
        }

        retrieve(): ng.IPromise<unknown> {
            return this.storageService.load<ICartState[]>().then(state => {
                this.data.carts = state.map(cs => <ICart>{
                    key: cs.key,
                    name: cs.name,
                    items: cs.items.map(i => _find(this.stocks, s => s.isin === i))
                });
                this.saveToState();
            });
        }

        getState(): ICartServiceState {
            return this.data;
        }

        getCarts(): ICart[] {
            return this.data.carts;
        }

        getCart(cartKey: string): ICart {
            return _find(this.data.carts, c => c.key === cartKey);
        }

        addCart(cart: ICart) {
            this.data.carts.push(cart);
            this.saveToState();
        }

        removeCart(cartKey: string) {
            let cart = this.getCart(cartKey);
            if (cart != null) {
                this.data.carts.splice(this.data.carts.indexOf(cart), 1);
                this.saveToState();
            }
        }

        setCurrentCart(cartKey: string) {
            this.data.currentCart = this.getCart(cartKey);
        }

        getCartItems(cartKey: string): IStock[] {
            let cart = this.getCart(cartKey);
            if (cart != null) {
                return cart.items;
            }
            return [];
        }

        getCartItem(cartKey: string, isin: string): IStock {
            let cart = this.getCart(cartKey);
            if (cart != null) {
                return _find(cart.items, s => s.isin === isin);
            }
            return null;
        }

        addCartItem(cartKey: string, isin: string) {
            let cart = this.getCart(cartKey);
            if (cart != null) {
                let exists = _find(cart.items, i => i.isin === isin);
                if (!exists) {
                    let stock = _find(this.stocks, s => s.isin === isin);
                    if (stock != null) {
                        cart.items.push(stock);
                        this.saveToState();
                    }
                }
            }
        }

        removeCartItem(cartKey: string, isin: string) {
            let cart = this.getCart(cartKey);
            if (cart != null) {
                let cartItem = _find(cart.items, s => s.isin === isin);
                if (cartItem != null) {
                    cart.items.splice(cart.items.indexOf(cartItem), 1);
                    this.saveToState();
                }
            }
        }
    }
}
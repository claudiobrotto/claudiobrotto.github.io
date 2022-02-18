module myportfolio {
    interface ICartControllerScope extends IBaseStockListControllerScope {
        newCartName: string;
    }

    export class CartController extends BaseStockListController {
        public static $inject = ['$q', 'stockService', 'cartService', 'config', '$routeParams', '$scope'];

        constructor(
            $q: angular.IQService,
            stockService: StockService,
            cartService: CartService,
            config: IConfiguration,
            private $routeParams: any,
            $scope: ICartControllerScope) {

            super($q, stockService, cartService, config, $scope)
            this.initialize();
        }

        getCartListSettings(): any {
            return angular.extend({}, this.getListSettings(), {
                stateStoring: {
                    enabled: true,
                    type: 'localStorage',
                    storageKey: "myportfolio_stocklist_cart"
                },
                export: {
                    enabled: true,
                    fileName: 'myportfolio_stocklist_cart',
                    allowExportSelectedData: true
                },
                editing: {
                    mode: 'row',
                    allowDeleting: true
                },
                rowDragging: {
                    allowReordering: true,
                    showDragIcons: true,
                    onReorder: e => {
                        let items = this.$scope.cartsState.currentCart.items,
                            visibleRows = e.component.getVisibleRows(),
                            toIndex = items.indexOf(visibleRows[e.toIndex].data),
                            fromIndex = items.indexOf(e.itemData);
                        items.splice(fromIndex, 1);
                        items.splice(toIndex, 0, e.itemData);
                        e.component.refresh();
                        this.cartService.updateState();
                    }
                },
                onRowRemoving: e => {
                    this.cartService.removeCartItem(this.$scope.cartsState.currentCart.key, e.data.isin);
                },
                bindingOptions: {
                    dataSource: 'cartsState.currentCart.items'
                }
            });
        }

        initialize() {
            this.$scope.cartsState = this.cartService.getState();
            this.$q.all([
                this.stockService.getStocks(),
                this.stockService.getDividends()
            ]).then((data: [IStock[], IDividend[]]) => {
                const [stocks, dividends] = data;
                this.$scope.stocks = stocks;
                this.$scope.dividends = dividends;
                this.cartService.setCurrentCart(this.$routeParams.cartId);
            })
        }
    }
}
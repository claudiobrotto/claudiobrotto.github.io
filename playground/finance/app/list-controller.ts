module myportfolio {
    interface IListControllerScope extends IBaseStockListControllerScope {
    }

    export class ListController extends BaseStockListController {
        public static $inject = ['$q', 'stockService', 'cartService', 'config', '$scope'];

        constructor(
            $q: angular.IQService,
            stockService: StockService,
            cartService: CartService,
            config: IConfiguration,
            $scope: IListControllerScope) {

            super($q, stockService, cartService, config, $scope)
            this.initialize();
        }

        getStockListSettings(): any {
            const settings = this.$scope.stocks && this.$scope.stocks.length > 0 ?
                angular.extend({}, super.getListSettings(), {
                    //dataSource: this.$scope.stocks.sort((a, b) => a.name.localeCompare(b.name)),
                    dataSource: this.$scope.stocks.sort((a, b) => a.isin.localeCompare(b.isin)),
                    stateStoring: {
                        enabled: true,
                        type: 'localStorage',
                        storageKey: "myportfolio_stocklist"
                    },
                    export: {
                        enabled: true,
                        fileName: 'myportfolio_stocklist',
                        allowExportSelectedData: true
                    },
                    onSelectionChanged: selectedItems => {
                        var data = selectedItems.selectedRowsData[0];
                        if (data) {
                            console.log(data.isin);
                            this.cartService.addCartItem(this.$scope.cartsState.currentCart.key, data.isin);
                        }
                    }
                }) : null;
            if (!!settings) {
                settings.columns.unshift({
                    type: "buttons",
                    width: 110,
                    sortIndex: 0,
                    visible: true,
                    buttons: [{
                        hint: "add to list",
                        icon: "repeat",
                        showInColumnChooser: false,
                        onClick: e => {
                            var data = e.row.data;
                            if (data) {
                                if (!!this.$scope.cartsState.currentCart) {
                                    this.cartService.addCartItem(this.$scope.cartsState.currentCart.key, data.isin);
                                    DevExpress.ui.notify('Item added to list', 'success', 600);
                                }
                                else {
                                    DevExpress.ui.notify('Please select a list', 'error', 600);
                                }
                            }
                        }
                    }]
                });
            }
            return settings;
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
            })
        }
    }
}
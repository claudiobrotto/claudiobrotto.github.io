var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var myportfolio;
(function (myportfolio) {
    var ListController = /** @class */ (function (_super) {
        __extends(ListController, _super);
        function ListController($q, stockService, cartService, config, $scope) {
            var _this = _super.call(this, $q, stockService, cartService, config, $scope) || this;
            _this.initialize();
            return _this;
        }
        ListController.prototype.getStockListSettings = function () {
            var _this = this;
            var settings = this.$scope.stocks && this.$scope.stocks.length > 0 ?
                angular.extend({}, _super.prototype.getListSettings.call(this), {
                    //dataSource: this.$scope.stocks.sort((a, b) => a.name.localeCompare(b.name)),
                    dataSource: this.$scope.stocks.sort(function (a, b) { return a.isin.localeCompare(b.isin); }),
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
                    onSelectionChanged: function (selectedItems) {
                        var data = selectedItems.selectedRowsData[0];
                        if (data) {
                            console.log(data.isin);
                            _this.cartService.addCartItem(_this.$scope.cartsState.currentCart.key, data.isin);
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
                            onClick: function (e) {
                                var data = e.row.data;
                                if (data) {
                                    if (!!_this.$scope.cartsState.currentCart) {
                                        _this.cartService.addCartItem(_this.$scope.cartsState.currentCart.key, data.isin);
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
        };
        ListController.prototype.initialize = function () {
            var _this = this;
            this.$scope.cartsState = this.cartService.getState();
            this.$q.all([
                this.stockService.getStocks(),
                this.stockService.getDividends()
            ]).then(function (data) {
                var stocks = data[0], dividends = data[1];
                _this.$scope.stocks = stocks;
                _this.$scope.dividends = dividends;
            });
        };
        ListController.$inject = ['$q', 'stockService', 'cartService', 'config', '$scope'];
        return ListController;
    }(myportfolio.BaseStockListController));
    myportfolio.ListController = ListController;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=list-controller.js.map
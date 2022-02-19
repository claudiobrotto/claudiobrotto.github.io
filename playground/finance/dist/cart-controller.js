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
    var CartController = /** @class */ (function (_super) {
        __extends(CartController, _super);
        function CartController($q, stockService, cartService, config, $routeParams, $scope) {
            var _this = _super.call(this, $q, stockService, cartService, config, $scope) || this;
            _this.$routeParams = $routeParams;
            _this.initialize();
            return _this;
        }
        CartController.prototype.getCartListSettings = function () {
            var _this = this;
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
                    onReorder: function (e) {
                        var items = _this.$scope.cartsState.currentCart.items, visibleRows = e.component.getVisibleRows(), toIndex = items.indexOf(visibleRows[e.toIndex].data), fromIndex = items.indexOf(e.itemData);
                        items.splice(fromIndex, 1);
                        items.splice(toIndex, 0, e.itemData);
                        e.component.refresh();
                        _this.cartService.updateState();
                    }
                },
                onRowRemoving: function (e) {
                    _this.cartService.removeCartItem(_this.$scope.cartsState.currentCart.key, e.data.isin);
                },
                bindingOptions: {
                    dataSource: 'cartsState.currentCart.items'
                }
            });
        };
        CartController.prototype.initialize = function () {
            var _this = this;
            this.$scope.cartsState = this.cartService.getState();
            this.$q.all([
                this.stockService.getStocks(),
                this.stockService.getDividends()
            ]).then(function (data) {
                var stocks = data[0], dividends = data[1];
                _this.$scope.stocks = stocks;
                _this.$scope.dividends = dividends;
                _this.cartService.setCurrentCart(_this.$routeParams.cartId);
            });
        };
        CartController.$inject = ['$q', 'stockService', 'cartService', 'config', '$routeParams', '$scope'];
        return CartController;
    }(myportfolio.BaseStockListController));
    myportfolio.CartController = CartController;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=cart-controller.js.map
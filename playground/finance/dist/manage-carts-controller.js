var myportfolio;
(function (myportfolio) {
    var ManageCartsController = /** @class */ (function () {
        function ManageCartsController(cartService, userService, $scope) {
            this.cartService = cartService;
            this.userService = userService;
            this.$scope = $scope;
            this.initialize();
        }
        ManageCartsController.prototype.getGridOptions = function () {
            var _this = this;
            return {
                'bindingOptions': {
                    'dataSource': 'cartsState.carts'
                },
                'columns': [
                    {
                        dataField: 'key',
                        caption: 'Key',
                        allowEditing: false
                    },
                    'name'
                ],
                'editing': {
                    'mode': 'row',
                    'allowDeleting': true,
                    'allowUpdating': true,
                    'allowAdding': true
                },
                onRowInserting: function (e) {
                    e.data.key = new Date().getTime().toString();
                    e.data.items = [];
                },
                onRowInserted: function () { return _this.cartService.updateState(); },
                onRowUpdated: function () { return _this.cartService.updateState(); },
                onRowRemoved: function () { return _this.cartService.updateState(); },
            };
        };
        ManageCartsController.prototype.saveToStorage = function () {
            this.cartService.store();
        };
        ManageCartsController.prototype.loadFromStorage = function () {
            this.cartService.retrieve();
        };
        ManageCartsController.prototype.initialize = function () {
            this.user = this.userService.getCurrentUser();
            this.$scope.cartsState = this.cartService.getState();
        };
        ManageCartsController.$inject = ['cartService', 'userService', '$scope'];
        return ManageCartsController;
    }());
    myportfolio.ManageCartsController = ManageCartsController;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=manage-carts-controller.js.map
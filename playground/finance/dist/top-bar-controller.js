var myportfolio;
(function (myportfolio) {
    var TopBarController = /** @class */ (function () {
        function TopBarController(cartService, userService, $location, $scope) {
            this.cartService = cartService;
            this.userService = userService;
            this.$location = $location;
            this.$scope = $scope;
            this.initialize();
        }
        TopBarController.prototype.getUser = function () {
            return this.userService.getCurrentUser();
        };
        TopBarController.prototype.selectCart = function (cart) {
            this.cartService.setCurrentCart(cart.key);
        };
        TopBarController.prototype.initialize = function () {
            this.$scope.user = this.userService.getCurrentUser();
            this.$scope.cartsState = this.cartService.getState();
        };
        TopBarController.prototype.signout = function () {
            var _this = this;
            this.userService.signout().then(function () {
                _this.$scope.$apply(function () {
                    _this.$location.path('/');
                });
            });
        };
        TopBarController.$inject = ['cartService', 'userService', '$location', '$scope'];
        return TopBarController;
    }());
    myportfolio.TopBarController = TopBarController;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=top-bar-controller.js.map
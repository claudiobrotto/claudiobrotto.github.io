var myportfolio;
(function (myportfolio) {
    var NavigationController = /** @class */ (function () {
        function NavigationController(cartService, userService, $scope) {
            this.cartService = cartService;
            this.userService = userService;
            this.$scope = $scope;
            this.initialize();
        }
        NavigationController.prototype.getUser = function () {
            return this.userService.getCurrentUser();
        };
        NavigationController.prototype.initialize = function () {
            this.$scope.user = this.userService.getCurrentUser();
            this.$scope.cartsState = this.cartService.getState();
        };
        NavigationController.$inject = ['cartService', 'userService', '$scope'];
        return NavigationController;
    }());
    myportfolio.NavigationController = NavigationController;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=navigation-controller.js.map
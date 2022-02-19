var myportfolio;
(function (myportfolio) {
    'use strict';
    angular
        .module('myportfolio', ['dx', 'ngRoute'])
        .service('cacheService', myportfolio.CacheService)
        .service('stockService', myportfolio.StockService)
        .service('cartService', myportfolio.CartService)
        .service('storageService', myportfolio.StorageService)
        .service('userService', myportfolio.UserService)
        .controller('list', myportfolio.ListController)
        .controller('cart', myportfolio.CartController)
        .controller('navigation', myportfolio.NavigationController)
        .controller('topBar', myportfolio.TopBarController)
        .controller('manageCarts', myportfolio.ManageCartsController)
        .constant('config', myportfolio.config)
        .directive('stateWatch', function (userService, cartService) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                scope.$watch(function () { return userService.getCurrentUser(); }, function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        console.log(newVal, oldVal);
                        cartService.refreshState();
                    }
                });
            }
        };
    })
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(false);
            $routeProvider
                .when("/carts/:cartId", {
                templateUrl: "view-cart.html",
                controller: 'cart',
                controllerAs: 'ctrl'
            })
                .when("/manage-carts", {
                templateUrl: "view-manage-carts.html",
                controller: 'manageCarts',
                controllerAs: 'ctrl'
            })
                .otherwise({
                templateUrl: "view-list.html",
                controller: 'list',
                controllerAs: 'ctrl'
            });
        }]);
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=app.js.map
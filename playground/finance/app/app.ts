module myportfolio {
  'use strict';
  angular
    .module('myportfolio', ['dx', 'ngRoute'])
    .service('cacheService', CacheService)
    .service('stockService', StockService)
    .service('cartService', CartService)
    .service('storageService', StorageService)
    .service('userService', UserService)
    .controller('list', ListController)
    .controller('cart', CartController)
    .controller('navigation', NavigationController)
    .controller('topBar', TopBarController)
    .controller('manageCarts', ManageCartsController)
    .constant('config', config)
    .directive('stateWatch', (userService: UserService, cartService: CartService) => {
      return {
        restrict: 'A',
        link: (scope, elem, attrs) => {
          scope.$watch(
            () => userService.getCurrentUser(),
            (newVal, oldVal) => {
              if(newVal != oldVal) {
                console.log(newVal, oldVal);
                cartService.refreshState();
              }            
            }
          );
        }
      }
    })
    .config(["$routeProvider", "$locationProvider", ($routeProvider, $locationProvider) => {
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
}


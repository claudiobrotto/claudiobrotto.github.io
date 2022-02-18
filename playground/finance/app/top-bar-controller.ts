module myportfolio {
    interface ITopBarControllerScope extends ng.IScope {
        cartsState: ICartServiceState;
        user: IUser;
    }

    export class TopBarController {
        public static $inject = ['cartService', 'userService', '$location', '$scope' ];

        constructor(
            private cartService: CartService,
            private userService: UserService,
            private $location: ng.ILocationService,
            private $scope: ITopBarControllerScope) {

            this.initialize();
        }

        getUser(): IUser {
            return this.userService.getCurrentUser();
        }

        selectCart(cart: ICart) {
            this.cartService.setCurrentCart(cart.key);
        }

        initialize() {
            this.$scope.user = this.userService.getCurrentUser();
            this.$scope.cartsState = this.cartService.getState();
        }
        
        signout() {
            this.userService.signout().then(() => {
                this.$scope.$apply(() => {
                    this.$location.path('/');
                });
            });
        }
    }
}
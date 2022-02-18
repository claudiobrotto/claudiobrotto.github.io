module myportfolio {
    interface INavigationControllerScope extends ng.IScope {
        cartsState: ICartServiceState;
        user: IUser;
    }

    export class NavigationController {
        public static $inject = ['cartService', 'userService', '$scope'];

        constructor(
            private cartService: CartService,
            private userService: UserService,
            private $scope: INavigationControllerScope) {

            this.initialize();
        }

        getUser(): IUser {
            return this.userService.getCurrentUser();
        }

        initialize() {
            this.$scope.user = this.userService.getCurrentUser();
            this.$scope.cartsState = this.cartService.getState();
        }
    }
}
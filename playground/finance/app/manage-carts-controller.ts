module myportfolio {
    interface IManageCartControllerScope extends ng.IScope {
        cartsState: ICartServiceState;
    }

    export class ManageCartsController {
        public static $inject = ['cartService', 'userService', '$scope'];

        private user: IUser;

        constructor(
            private cartService: CartService,
            private userService: UserService,
            private $scope: IManageCartControllerScope) {

            this.initialize();
        }

        getGridOptions(): any {
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
                onRowInserting: (e) => {
                    e.data.key = new Date().getTime().toString();
                    e.data.items = [];
                },
                onRowInserted: () => this.cartService.updateState(),
                onRowUpdated: () => this.cartService.updateState(),
                onRowRemoved: () => this.cartService.updateState(),
            }
        }

        saveToStorage() {
            this.cartService.store();
        }

        loadFromStorage() {
            this.cartService.retrieve();
        }

        initialize() {
            this.user = this.userService.getCurrentUser();
            this.$scope.cartsState = this.cartService.getState();
        }
    }
}
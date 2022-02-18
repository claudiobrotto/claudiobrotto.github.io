module myportfolio {
    export class UserService {
        public static $inject = ['$rootScope'];

        private _user: IUser;

        constructor(private $rootScope: ng.IRootScopeService) {
            gapi.signin2.render('gsignin', {
                'scope': 'profile email https://www.googleapis.com/auth/drive.appdata',
                'onsuccess': (googleUser) => this.googleSignIn(this, googleUser)
            });
        }

        private googleSignIn(svc: UserService, googleUser: any) {
            this.$rootScope.$apply(s => {
                const profile = googleUser.getBasicProfile();
                svc._user = {
                    key: profile.getId(),
                    name: profile.getName(),
                    picture: profile.getImageUrl(),
                    accessToken: googleUser.getAuthResponse().access_token
                };
            })
        }

        signout(): Promise<void> {
            var auth2 = gapi.auth2.getAuthInstance();
            return auth2.signOut().then(() => {
                this.$rootScope.$apply(s => {
                    this._user = null;
                })
            });
        }
        
        getCurrentUser(): IUser {
            return this._user;
        }
    }
}
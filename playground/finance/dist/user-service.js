var myportfolio;
(function (myportfolio) {
    var UserService = /** @class */ (function () {
        function UserService($rootScope) {
            var _this = this;
            this.$rootScope = $rootScope;
            gapi.signin2.render('gsignin', {
                'scope': 'profile email https://www.googleapis.com/auth/drive.appdata',
                'onsuccess': function (googleUser) { return _this.googleSignIn(_this, googleUser); }
            });
        }
        UserService.prototype.googleSignIn = function (svc, googleUser) {
            this.$rootScope.$apply(function (s) {
                var profile = googleUser.getBasicProfile();
                svc._user = {
                    key: profile.getId(),
                    name: profile.getName(),
                    picture: profile.getImageUrl(),
                    accessToken: googleUser.getAuthResponse().access_token
                };
            });
        };
        UserService.prototype.signout = function () {
            var _this = this;
            var auth2 = gapi.auth2.getAuthInstance();
            return auth2.signOut().then(function () {
                _this.$rootScope.$apply(function (s) {
                    _this._user = null;
                });
            });
        };
        UserService.prototype.getCurrentUser = function () {
            return this._user;
        };
        UserService.$inject = ['$rootScope'];
        return UserService;
    }());
    myportfolio.UserService = UserService;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=user-service.js.map
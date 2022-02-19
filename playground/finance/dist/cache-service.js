var myportfolio;
(function (myportfolio) {
    var CacheService = /** @class */ (function () {
        function CacheService($q, $window) {
            this.$q = $q;
            this.$window = $window;
        }
        CacheService.prototype.get = function (key, fetcher) {
            var _this = this;
            var d = this.$q.defer();
            var data = this.$window.sessionStorage.getItem(key);
            if (!!data) {
                d.resolve((JSON.parse(data)));
            }
            else {
                fetcher().then(function (r) {
                    _this.$window.sessionStorage.setItem(key, JSON.stringify(r));
                    d.resolve(r);
                });
            }
            return d.promise;
        };
        CacheService.$inject = ['$q', '$window'];
        return CacheService;
    }());
    myportfolio.CacheService = CacheService;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=cache-service.js.map
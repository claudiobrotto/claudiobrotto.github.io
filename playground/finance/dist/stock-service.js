var myportfolio;
(function (myportfolio) {
    var StockService = /** @class */ (function () {
        function StockService($http, cacheService) {
            this.$http = $http;
            this.cacheService = cacheService;
        }
        StockService.prototype.getStocks = function () {
            var _this = this;
            return this.cacheService.get('myportfolio-stocks', function () { return _this.$http.get('https://raw.githack.com/claudiobrotto/data-and-samples/master/finance/data-2020-09-26-08-38-31-922.json', {
                cache: false
            }).then(function (r) { return Object.keys(r.data).map(function (k) { return r.data[k]; }); }); });
        };
        StockService.prototype.getDividends = function () {
            var _this = this;
            return this.cacheService.get('myportfolio-dividends', function () { return _this.$http.get('https://raw.githack.com/claudiobrotto/data-and-samples/master/finance/dividends.json', {
                cache: false
            }).then(function (r) { return r.data; }); });
        };
        StockService.prototype.getQuotations = function (isin) {
            var _this = this;
            return this.cacheService.get("myportfolio-quotations-" + isin, function () { return _this.$http.get("https://raw.githack.com/claudiobrotto/data-and-samples/master/finance/quotations-" + isin + ".json", {
                cache: false
            }).then(function (r) { return r.data.map(function (d) {
                return {
                    isin: d.ISIN,
                    date: new Date(d.Date),
                    price: d.Price
                };
            }); }); });
        };
        StockService.$inject = ['$http', 'cacheService'];
        return StockService;
    }());
    myportfolio.StockService = StockService;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=stock-service.js.map
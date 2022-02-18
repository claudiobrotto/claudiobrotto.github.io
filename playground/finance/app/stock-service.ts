module myportfolio {
    export class StockService {
        public static $inject = ['$http', 'cacheService'];

        constructor(private $http: ng.IHttpService, private cacheService: CacheService) {
        }

        getStocks(): ng.IPromise<IStock[]> {
            return this.cacheService.get('myportfolio-stocks', () => this.$http.get<{ [isin: string]: IStock }>(
                'https://raw.githack.com/claudiobrotto/data-and-samples/master/finance/data-2020-09-26-08-38-31-922.json',
                {
                    cache: false
                }
            ).then(r => <IStock[]>Object.keys(r.data).map(k => r.data[k]))
            );
        }

        getDividends(): ng.IPromise<IDividend[]> {
            return this.cacheService.get('myportfolio-dividends', () => this.$http.get<IDividend[]>(
                'https://raw.githack.com/claudiobrotto/data-and-samples/master/finance/dividends.json',
                {
                    cache: false
                }
            ).then(r => r.data)
            );
        }

        getQuotations(isin: string): ng.IPromise<IQuotation[]> {
            return this.cacheService.get(`myportfolio-quotations-${isin}`, () => this.$http.get<{ ISIN: string, Date: string, Price: number }[]>(
                `https://raw.githack.com/claudiobrotto/data-and-samples/master/finance/quotations-${isin}.json`,
                {
                    cache: false
                }
            ).then(r => r.data.map<IQuotation>(d => {
                return {
                    isin: d.ISIN,
                    date: new Date(d.Date),
                    price: d.Price
                };
            }))
            );
        }
    }
}
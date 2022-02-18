module myportfolio {
    export class CacheService {
        public static $inject = ['$q', '$window'];

        constructor(private $q: ng.IQService, private $window: ng.IWindowService) {
        }

        get<T>(key: string, fetcher: () => ng.IPromise<T>): ng.IPromise<T> {
            let d = this.$q.defer<T>(); 
            let data = this.$window.sessionStorage.getItem(key);
            if (!!data) {
                d.resolve(<T>(JSON.parse(data)));
            } 
            else {
                fetcher().then(r => {
                    this.$window.sessionStorage.setItem(key, JSON.stringify(r));
                    d.resolve(r);
                })
            }
            return d.promise;
        }
    }
}
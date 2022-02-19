var myportfolio;
(function (myportfolio) {
    var StorageService = /** @class */ (function () {
        function StorageService($q, config, $http, userService) {
            this.$q = $q;
            this.config = config;
            this.$http = $http;
            this.userService = userService;
        }
        StorageService.prototype.find = function () {
            var d = this.$q.defer();
            var user = this.userService.getCurrentUser();
            if (!user) {
                d.reject();
                return d.promise;
            }
            fetch('https://www.googleapis.com/drive/v3/files?spaces=appDataFolder', {
                method: 'GET',
                headers: new Headers({ 'Authorization': 'Bearer ' + user.accessToken })
            }).then(function (res) {
                res.json().then(function (v) {
                    var files = (v);
                    var settings = files.files.filter(function (f) { return f.name === StorageService.filenam; }).pop();
                    if (!!settings) {
                        d.resolve(settings.id);
                    }
                    else {
                        d.resolve(null);
                    }
                });
            });
            return d.promise;
        };
        StorageService.prototype.load = function () {
            var d = this.$q.defer();
            var user = this.userService.getCurrentUser();
            if (!user) {
                d.reject();
                return d.promise;
            }
            this.find().then(function (id) {
                if (!id) {
                    d.resolve(null);
                }
                else {
                    fetch('https://www.googleapis.com/drive/v3/files/' + id + '?alt=media', {
                        method: 'GET',
                        headers: new Headers({ 'Authorization': 'Bearer ' + user.accessToken })
                    }).then(function (res) {
                        res.json().then(function (v) {
                            d.resolve(v);
                        });
                    });
                }
            });
            return d.promise;
        };
        StorageService.prototype.create = function (user, data) {
            var d = this.$q.defer();
            var fileContent = JSON.stringify(data);
            var file = new Blob([fileContent], { type: 'application/json' });
            var metadata = {
                'name': StorageService.filenam,
                'mimeType': 'application/json',
                'parents': ['appDataFolder']
            };
            var form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', file);
            fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
                method: 'POST',
                headers: new Headers({ 'Authorization': 'Bearer ' + user.accessToken }),
                body: form,
            }).then(function (res) { return d.resolve(data); });
            return d.promise;
        };
        StorageService.prototype.update = function (id, user, data) {
            var d = this.$q.defer();
            var fileContent = JSON.stringify(data);
            var file = new Blob([fileContent], { type: 'application/json' });
            var metadata = {
                'name': StorageService.filenam,
                'mimeType': 'application/json'
            };
            var form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', file);
            fetch("https://www.googleapis.com/upload/drive/v3/files/" + id + "?uploadType=multipart&fields=id", {
                method: 'PATCH',
                headers: new Headers({ 'Authorization': 'Bearer ' + user.accessToken }),
                body: form,
            }).then(function (res) { return d.resolve(data); });
            return d.promise;
        };
        StorageService.prototype.save = function (data) {
            var _this = this;
            var d = this.$q.defer();
            var user = this.userService.getCurrentUser();
            if (!user) {
                d.reject();
                return d.promise;
            }
            return this.find().then(function (id) {
                return !!id ? _this.update(id, user, data) : _this.create(user, data);
            });
        };
        StorageService.$inject = ['$q', 'config', '$http', 'userService'];
        StorageService.filenam = 'myportfolio';
        return StorageService;
    }());
    myportfolio.StorageService = StorageService;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=storage-service.js.map
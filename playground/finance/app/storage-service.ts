module myportfolio {
    interface IFileListResponse {
        files: Array<{
            id: string;
            name: string;
        }>
    }

    export class StorageService {
        public static $inject = ['$q', 'config', '$http', 'userService'];
        private static filenam = 'myportfolio';

        constructor(
            private $q: ng.IQService,
            private config: IConfiguration,
            private $http: ng.IHttpService,
            private userService: UserService) {
        }

        private find(): ng.IPromise<string> {
            const d = this.$q.defer<string>();
            const user = this.userService.getCurrentUser();
            if (!user) {
                d.reject();
                return d.promise;
            }
            fetch('https://www.googleapis.com/drive/v3/files?spaces=appDataFolder', {
                method: 'GET',
                headers: new Headers({ 'Authorization': 'Bearer ' + user.accessToken })
            }).then(res => {
                res.json().then(v => {
                    const files = <IFileListResponse>(v);
                    const settings = files.files.filter(f => f.name === StorageService.filenam).pop();
                    if (!!settings) {
                        d.resolve(settings.id);
                    }
                    else {
                        d.resolve(null);
                    }
                })
            });
            return d.promise;
        }

        load<T>(): ng.IPromise<T> {
            const d = this.$q.defer<T>();
            const user = this.userService.getCurrentUser();
            if (!user) {
                d.reject();
                return d.promise;
            }
            this.find().then(id => {
                if (!id) {
                    d.resolve(null);
                }
                else {
                    fetch('https://www.googleapis.com/drive/v3/files/' + id + '?alt=media', {
                        method: 'GET',
                        headers: new Headers({ 'Authorization': 'Bearer ' + user.accessToken })
                    }).then(res => {
                        res.json().then(v => {
                            d.resolve(<T>v);
                        })
                    })
                }
            });
            return d.promise;
        }

        private create<T>(user: IUser, data: T): ng.IPromise<T> {
            const d = this.$q.defer<T>();
            const fileContent = JSON.stringify(data);
            const file = new Blob([fileContent], { type: 'application/json' });
            const metadata = {
                'name': StorageService.filenam,
                'mimeType': 'application/json',
                'parents': ['appDataFolder']
            };
            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', file);
            fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
                method: 'POST',
                headers: new Headers({ 'Authorization': 'Bearer ' + user.accessToken }),
                body: form,
            }).then(
                res => d.resolve(data)
            );
            return d.promise;
        }

        private update<T>(id: string, user: IUser, data: T): ng.IPromise<T> {
            const d = this.$q.defer<T>();
            const fileContent = JSON.stringify(data);
            const file = new Blob([fileContent], { type: 'application/json' });
            const metadata = {
                'name': StorageService.filenam,
                'mimeType': 'application/json'
            };
            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', file);
            fetch(`https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=multipart&fields=id`, {
                method: 'PATCH',
                headers: new Headers({ 'Authorization': 'Bearer ' + user.accessToken }),
                body: form,
            }).then(
                res => d.resolve(data)
            );
            return d.promise;
        }

        save<T>(data: T): ng.IPromise<T> {
            const d = this.$q.defer<T>();
            const user = this.userService.getCurrentUser();
            if (!user) {
                d.reject();
                return d.promise;
            }
            return this.find().then(id => {
                return !!id ? this.update(id, user, data) : this.create(user, data);
            });
        }
    }
}
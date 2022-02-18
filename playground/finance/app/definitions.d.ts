interface JQuery {
    dxDataGrid: any;
    dxChart: any;
}

declare module DevExpress.data {
    class DataSource {
        constructor({
            load: any
        });        
    }
}

declare module DevExpress.ui {
    function notify(message: string, type: string, length: number);
}

declare var gapi: any;
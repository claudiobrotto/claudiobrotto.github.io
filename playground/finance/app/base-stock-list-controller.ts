module myportfolio {
    export interface IBaseStockListControllerScope extends ng.IScope {
        stocks?: IStock[];
        dividends: IDividend[];
        cartsState: ICartServiceState;
        quotationFilters: {[isin:string]: {min: Date, max: Date}};
    }

    export class BaseStockListController {
        public static $inject = ['$q', 'stockService', 'cartService', 'config', '$scope'];

        constructor(
            protected $q: angular.IQService,
            protected stockService: StockService,
            protected cartService: CartService,
            protected config: IConfiguration,
            protected $scope: IBaseStockListControllerScope) {
                this.$scope.quotationFilters = {};
        }

        protected getColumnName(n: string) {
            return config.list.columns.names[n] || n;
        }

        protected getValueAsNumber(s: string) {
            let n = parseFloat(s);
            return isNaN(n) ? 0 : n;
        }

        protected setupStockListColumns(): any {
            let listColumns = [];
            for (var n in config.list.columns.names) {
                var column: any =
                {
                    dataField: n,
                    caption: this.getColumnName(n),
                    allowHeaderFiltering: myportfolio.config.list.columns.filterable.indexOf(n) !== -1,
                    visible: myportfolio.config.list.columns.visibility.indexOf(n) !== -1,
                    sortIndex: myportfolio.config.list.columns.sortOrder.indexOf(n) !== -1 ? myportfolio.config.list.columns.sortOrder.indexOf(n) + 1 : 999
                };
                if (config.list.columns.typeIsNumber.indexOf(n) !== -1) {
                    column.calculateCellValue = data => this.getValueAsNumber(data[n]);
                }
                listColumns.push(column);
            }
            return listColumns;
        }

        protected getStockDetailsProperties(stock: IStock) {
            return Object.keys(stock).map(k => {
                return {
                    internalName: k,
                    name: this.getColumnName(k).replace('JE-', '').replace('BI-', '').replace('MS-', ''),
                    value: stock[k]
                }
            }).sort((a, b) => a.name.localeCompare(b.name));
        }

        protected getListSettings(): any {
            return {
                editing: {
                    mode: "row",
                    allowUpdating: false,
                    allowDeleting: false,
                    useIcons: true
                },
                columns: this.setupStockListColumns(),
                allowColumnReordering: true,
                allowColumnResizing: true,
                columnAutoWidth: true,
                columnResizingMode: 'widget',
                showColumnLines: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                columnChooser: {
                    enabled: true,
                    height: 600,
                    width: 400,
                    mode: 'select'
                },
                columnFixing: {
                    enabled: true
                },
                columnHidingEnabled: false,
                groupPanel: {
                    visible: true
                },
                showBorders: true,
                wordWrapEnabled: true,
                filterRow: {
                    visible: true,
                    applyFilter: 'auto'
                },
                filterPanel: { visible: true },
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: 'Search...'
                },
                headerFilter: {
                    visible: true
                },
                paging: {
                    pageSize: 20
                },
                pager: {
                    showPageSizeSelector: true,
                    allowedPageSizes: [20, 50, 75, 100],
                    showInfo: true
                },
                sorting: {
                    mode: 'multiple'
                },
                summary: {
                    totalItems: [
                        {
                            column: 'isin',
                            summaryType: 'count'
                        }]
                },
                selection: {
                    mode: 'single'
                },
                masterDetail: {
                    enabled: true,
                    template: 'details'
                }
            }
        }

        protected getDetailsTabPanelOptions(stock: IStock): any {
            const items = [];
            if (!!stock['je-isin']) {
                items.push({
                    title: 'JustEtf',
                    template: 'jeDetails',
                    image: 'img/just-etf.png',
                    navigate: `https://www.justetf.com/it/etf-profile.html?isin=${stock.isin}`
                });
            }
            if (!!stock['ms-SecId']) {
                items.push({
                    title: 'Morningstar',
                    template: 'msDetails',
                    image: 'img/morningstar.jpg',
                    navigate: `https://www.morningstar.it/it/etf/snapshot/snapshot.aspx?id=${stock['ms-SecId']}`
                });
            }
            if (!!stock['bi-Isin_Code']) {
                items.push({
                    title: 'Borsa Italiana',
                    template: 'biDetails',
                    image: 'img/borsa-italiana.png',
                    navigate: `https://www.borsaitaliana.it/borsa/etf/scheda/${stock.isin}.html`
                });
            }
            if (this.$scope.dividends.filter(d => d.ISIN === stock.isin).length > 0) {
                items.push({
                    title: 'Dividends',
                    template: 'dividendsDetails'
                });
            }
            items.push({
                title: 'Quotations',
                template: 'chartsDetails'
            })
            return {
                items: items
            };
        }

        protected getJEDetailsGridSettings(stock: IStock): any {
            const data = this.getStockDetailsProperties(stock);
            return {
                columns: ['name', 'value'],
                columnAutoWidth: false,
                wordWrapEnabled: true,
                showBorders: true,
                dataSource: data.filter(function (d) { return d.internalName.indexOf('je-') == 0; }),
                paging: {
                    pageSize: 200
                }
            }
        }

        protected getMSDetailsGridSettings(stock: IStock): any {
            const data = this.getStockDetailsProperties(stock);
            return {
                columns: ['name', 'value'],
                columnAutoWidth: false,
                wordWrapEnabled: true,
                showBorders: true,
                dataSource: data.filter(function (d) { return d.internalName.indexOf('ms-') == 0; }),
                paging: {
                    pageSize: 200
                }
            }
        }

        protected getBIDetailsGridSettings(stock: IStock): any {
            const data = this.getStockDetailsProperties(stock);
            return {
                columns: ['name', 'value'],
                columnAutoWidth: false,
                wordWrapEnabled: true,
                showBorders: true,
                dataSource: data.filter(function (d) { return d.internalName.indexOf('bi-') == 0; }),
                paging: {
                    pageSize: 200
                }
            }
        }

        protected getDividendsDetailsGridSettings(stock: IStock): any {
            const data = this.$scope.dividends
                .filter(d => d.ISIN === stock.isin)
                .sort((a, b) => a.Date.localeCompare(b.Date));
            return {
                columnAutoWidth: true,
                showBorders: true,
                columns: [
                    { dataField: 'Date', caption: 'Date', dataType: 'date' },
                    'Amount'
                ],
                dataSource: data
            }
        }

        private _quotationDataSources: {[isin:string]: DevExpress.data.DataSource} = {};
        private _quotationFilters: {[isin:string]: {min: Date, max: Date}} = {};
        private getQuotationDataSource(isin:string) {
            if (!this._quotationDataSources[isin]) {
                this._quotationDataSources[isin] =  new DevExpress.data.DataSource({
                    load: () => this.stockService.getQuotations(isin).then(quotations => {
                        let filter = this.$scope.quotationFilters[isin];
                        let density = Math.round(quotations.length / 100);
                        return quotations.filter((q,i) => 
                            (!filter || (q.date >= filter.min && q.date <= filter.max)) && 
                            i % density == 0 ? 
                            q : null);
                    })
                });
            }
            return this._quotationDataSources[isin];            
        }

        protected getChartQuotationsDetails(stock: IStock): any {
            return {
                palette: 'Violet',
                dataSource: this.getQuotationDataSource(stock.isin),
                commonSeriesSettings: {
                    argumentField: 'date',
                    type: 'line'
                },
                margin: {
                    bottom: 20
                },
                argumentAxis: {
                    valueMarginsEnabled: false,
                    discreteAxisDivisionMode: 'crossLabels',
                    grid: {
                        visible: true
                    }
                },
                series: [
                    { valueField: 'price', name: 'Price' }
                ],
                legend: {
                    verticalAlignment: 'bottom',
                    horizontalAlignment: 'center',
                    itemTextPosition: 'bottom'
                },
                tooltip: {
                    enabled: true
                }
            }
        }

        protected getChartRangeDetails(stock: IStock): any {
            return {
                dataSource: this.getQuotationDataSource(stock.isin),
                dataSourceField: 'date',
                margin: {
                    top: 50
                },
                scale: {
                    minorTickInterval: "day",
                    tickInterval: "week",
                    minRange: "week",
                    minorTick: {
                        visible: false,
                    },
                    valueType: "datetime"
                },
                sliderMarker: {
                    format: "monthAndDay"
                },
                onValueChanged: function(e) {console.log(e);}
            }
        }
    }
}
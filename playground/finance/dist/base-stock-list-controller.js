var myportfolio;
(function (myportfolio) {
    var BaseStockListController = /** @class */ (function () {
        function BaseStockListController($q, stockService, cartService, config, $scope) {
            this.$q = $q;
            this.stockService = stockService;
            this.cartService = cartService;
            this.config = config;
            this.$scope = $scope;
            this._quotationDataSources = {};
            this._quotationFilters = {};
            this.$scope.quotationFilters = {};
        }
        BaseStockListController.prototype.getColumnName = function (n) {
            return myportfolio.config.list.columns.names[n] || n;
        };
        BaseStockListController.prototype.getValueAsNumber = function (s) {
            var n = parseFloat(s);
            return isNaN(n) ? 0 : n;
        };
        BaseStockListController.prototype.setupStockListColumns = function () {
            var _this = this;
            var listColumns = [];
            for (var n in myportfolio.config.list.columns.names) {
                var column = {
                    dataField: n,
                    caption: this.getColumnName(n),
                    allowHeaderFiltering: myportfolio.config.list.columns.filterable.indexOf(n) !== -1,
                    visible: myportfolio.config.list.columns.visibility.indexOf(n) !== -1,
                    sortIndex: myportfolio.config.list.columns.sortOrder.indexOf(n) !== -1 ? myportfolio.config.list.columns.sortOrder.indexOf(n) + 1 : 999
                };
                if (myportfolio.config.list.columns.typeIsNumber.indexOf(n) !== -1) {
                    column.calculateCellValue = function (data) { return _this.getValueAsNumber(data[n]); };
                }
                listColumns.push(column);
            }
            return listColumns;
        };
        BaseStockListController.prototype.getStockDetailsProperties = function (stock) {
            var _this = this;
            return Object.keys(stock).map(function (k) {
                return {
                    internalName: k,
                    name: _this.getColumnName(k).replace('JE-', '').replace('BI-', '').replace('MS-', ''),
                    value: stock[k]
                };
            }).sort(function (a, b) { return a.name.localeCompare(b.name); });
        };
        BaseStockListController.prototype.getListSettings = function () {
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
                        }
                    ]
                },
                selection: {
                    mode: 'single'
                },
                masterDetail: {
                    enabled: true,
                    template: 'details'
                }
            };
        };
        BaseStockListController.prototype.getDetailsTabPanelOptions = function (stock) {
            var items = [];
            if (!!stock['je-isin']) {
                items.push({
                    title: 'JustEtf',
                    template: 'jeDetails',
                    image: 'img/just-etf.png',
                    navigate: "https://www.justetf.com/it/etf-profile.html?isin=" + stock.isin
                });
            }
            if (!!stock['ms-SecId']) {
                items.push({
                    title: 'Morningstar',
                    template: 'msDetails',
                    image: 'img/morningstar.jpg',
                    navigate: "https://www.morningstar.it/it/etf/snapshot/snapshot.aspx?id=" + stock['ms-SecId']
                });
            }
            if (!!stock['bi-Isin_Code']) {
                items.push({
                    title: 'Borsa Italiana',
                    template: 'biDetails',
                    image: 'img/borsa-italiana.png',
                    navigate: "https://www.borsaitaliana.it/borsa/etf/scheda/" + stock.isin + ".html"
                });
            }
            if (this.$scope.dividends.filter(function (d) { return d.ISIN === stock.isin; }).length > 0) {
                items.push({
                    title: 'Dividends',
                    template: 'dividendsDetails'
                });
            }
            items.push({
                title: 'Quotations',
                template: 'chartsDetails'
            });
            return {
                items: items
            };
        };
        BaseStockListController.prototype.getJEDetailsGridSettings = function (stock) {
            var data = this.getStockDetailsProperties(stock);
            return {
                columns: ['name', 'value'],
                columnAutoWidth: false,
                wordWrapEnabled: true,
                showBorders: true,
                dataSource: data.filter(function (d) { return d.internalName.indexOf('je-') == 0; }),
                paging: {
                    pageSize: 200
                }
            };
        };
        BaseStockListController.prototype.getMSDetailsGridSettings = function (stock) {
            var data = this.getStockDetailsProperties(stock);
            return {
                columns: ['name', 'value'],
                columnAutoWidth: false,
                wordWrapEnabled: true,
                showBorders: true,
                dataSource: data.filter(function (d) { return d.internalName.indexOf('ms-') == 0; }),
                paging: {
                    pageSize: 200
                }
            };
        };
        BaseStockListController.prototype.getBIDetailsGridSettings = function (stock) {
            var data = this.getStockDetailsProperties(stock);
            return {
                columns: ['name', 'value'],
                columnAutoWidth: false,
                wordWrapEnabled: true,
                showBorders: true,
                dataSource: data.filter(function (d) { return d.internalName.indexOf('bi-') == 0; }),
                paging: {
                    pageSize: 200
                }
            };
        };
        BaseStockListController.prototype.getDividendsDetailsGridSettings = function (stock) {
            var data = this.$scope.dividends
                .filter(function (d) { return d.ISIN === stock.isin; })
                .sort(function (a, b) { return a.Date.localeCompare(b.Date); });
            return {
                columnAutoWidth: true,
                showBorders: true,
                columns: [
                    { dataField: 'Date', caption: 'Date', dataType: 'date' },
                    'Amount'
                ],
                dataSource: data
            };
        };
        BaseStockListController.prototype.getQuotationDataSource = function (isin) {
            var _this = this;
            if (!this._quotationDataSources[isin]) {
                this._quotationDataSources[isin] = new DevExpress.data.DataSource({
                    load: function () { return _this.stockService.getQuotations(isin).then(function (quotations) {
                        var filter = _this.$scope.quotationFilters[isin];
                        var density = Math.round(quotations.length / 100);
                        return quotations.filter(function (q, i) {
                            return (!filter || (q.date >= filter.min && q.date <= filter.max)) &&
                                i % density == 0 ?
                                q : null;
                        });
                    }); }
                });
            }
            return this._quotationDataSources[isin];
        };
        BaseStockListController.prototype.getChartQuotationsDetails = function (stock) {
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
            };
        };
        BaseStockListController.prototype.getChartRangeDetails = function (stock) {
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
                onValueChanged: function (e) { console.log(e); }
            };
        };
        BaseStockListController.$inject = ['$q', 'stockService', 'cartService', 'config', '$scope'];
        return BaseStockListController;
    }());
    myportfolio.BaseStockListController = BaseStockListController;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=base-stock-list-controller.js.map
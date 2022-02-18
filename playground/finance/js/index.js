var currentYear = new Date().getUTCFullYear();
var _columnNames = {
    'isin': 'ISIN',
    'name': 'Name',
    'bi-1_Month_Performance': 'BI-Perf 1M',
    'bi-1_Year_Performance': 'BI-Perf 1Y',
    'bi-6_Months_Performance': 'BI-Perf 6M',
    'bi-Area': 'BI-Area',
    'bi-Ask_Price': 'BI-Ask Price',
    'bi-Ask_Volume': 'BI-Ask Volume',
    'bi-Benchmark': 'BI-Benchmark',
    'bi-Benchmark_Area': 'BI-Benchmark Area',
    'bi-Bid_Price': 'BI-Bid Price',
    'bi-Bid_Volume': 'BI-Bid Volume',
    'bi-Class': 'BI-Class',
    'bi-contracts_1M': 'BI-Contracts 1M',
    'bi-contracts_1Y': 'BI-Contracts 1Y',
    'bi-contracts_3M': 'BI-Contracts 3M',
    'bi-contracts_6M': 'BI-Contracts 6M',
    'bi-Currency_Denomination': 'BI-Currency Denomination',
    'bi-Date_Time_Last_Trade': 'BI-Last Trade Date',
    'bi-Day_closing_auction_price': 'BI-Day Closing Auction Price',
    'bi-Day_High': 'BI-Day High',
    'bi-Day_Low': 'BI-Day low',
    'bi-Denomination': 'BI-Denomination',
    'bi-Dividends': 'BI-Dividends',
    'bi-EMS': 'BI-EMS',
    'bi-iNAV_Bloomberg_Ticker': 'BI-Bloomberg iNAV',
    'bi-iNAV_Reuters_Ric': 'BI-Reuters iNAV',
    'bi-Instrument_Bloomberg_Ticker': 'BI-Bloomberg',
    'bi-Instrument_Reuters_Ric': 'BI-Reuters',
    'bi-Instrument_Type': 'BI-Instrument Type',
    'bi-Issuer': 'BI-Issuer',
    'bi-Last_Volume': 'BI-Last Volume',
    'bi-Lot_Size': 'BI-Lot Size',
    'bi-Market_Status': 'BI-Market Status',
    'bi-Mid_Price': 'BI-Mid Price',
    'bi-Multiplier': 'BI-Multiplier',
    'bi-Net_Chng': 'BI-Net Change',
    'bi-Number_Trades': 'BI-Trades',
    'bi-Official_Close': 'BI-Official Close',
    'bi-Opening': 'BI-Opening',
    'bi-PercentageChng': 'BI-Change %',
    'bi-Performance_Year_to_Date': 'BI-Perf YTD',
    'bi-Protection_Level': 'BI-Protection Level',
    'bi-Reference_Close': 'BI-Reference Close',
    'bi-Segment': 'BI-Segment',
    'bi-Specialist_obligation_Max_spread_': 'BI-Max Spread',
    'bi-Subscription,_Redemption,_Performance_Fees': 'BI-Redemption Perf Fees',
    'bi-Total_Annual_Fees': 'BI-Total Annual Fees',
    'bi-Total_Quantity': 'BI-Total Qty',
    'bi-Turnover': 'BI-Turnover',
    'bi-Year_High': 'BI-Year High',
    'bi-Year_High_Date': 'BI-Year High Date',
    'bi-Year_Low': 'BI-Year Low',
    'bi-Year_Low_Date': 'BI-Year Low Date',
    'je-assetClass': 'JE-Asset Class',
    'je-bondType': 'JE-Bond Type',
    'je-description': 'JE-Description',
    'je-distributionPolicy': 'JE-Distribution Policy',
    'je-domicileCountry': 'JE-Country',
    'je-weekReturnCUR': 'JE-Return 1W',
    'je-monthReturnCUR': 'JE-Return 1M',
    'je-threeMonthReturnCUR': 'JE-Return 3M',
    'je-sixMonthReturnCUR': 'JE-Return 6M',
    'je-yearReturnCUR': 'JE-Return 1Y',
    'je-threeYearReturnCUR': 'JE-Return 3Y',
    'je-fiveYearReturnCUR': 'JE-Return 5Y',
    'je-ytdReturnCUR': 'JE-Return YTD',
    'je-yearReturn1CUR': 'JE-Return ' + (currentYear - 1),
    'je-yearReturn2CUR': 'JE-Return ' + (currentYear - 2),
    'je-yearReturn3CUR': 'JE-Return ' + (currentYear - 3),
    'je-yearReturn4CUR': 'JE-Return ' + (currentYear - 4),
    'je-yearReturnPerRiskCUR': 'JE-Return per Risk 1Y',
    'je-threeYearReturnPerRiskCUR': 'JE-Return per Risk 3Y',
    'je-fiveYearReturnPerRiskCUR': 'JE-Return per Risk 5Y',
    'je-yearVolatilityCUR': 'JE-Volatility 1Y',
    'je-threeYearVolatilityCUR': 'JE-Volatility 3Y',
    'je-fiveYearVolatilityCUR': 'JE-Volatility 5Y',
    'je-fundCurrency': 'JE-Currency',
    'je-fundSize': 'JE-Size',
    'je-groupValue': 'JE-Group Value',
    'je-hasSecuritiesLending': 'JE-Securities Lending',
    'je-inceptionDate': 'JE-Inception Date',
    'je-lastQuotation': 'JE-Last Quotation',
    'je-name': 'JE-Name (JustETF)',
    'je-replicationMethod': 'JE-Replication Method',
    'je-savingsPlanReady': 'JE-Savings Plan',
    'je-ter': 'JE-TER',
    'je-ticker': 'JE-Ticker',
    'je-wkn': 'JE-WKN',
    'ms-AlphaM36': 'MS-Alpha 3Y',
    'ms-AnalystRatingScale': 'MS-Analyst Rating Scale',
    'ms-AverageCreditQualityCode': 'MS-Avg Credit Quality',
    'ms-AverageMarketCapital': 'MS-Avg Market Cap',
    'ms-BetaM36': 'MS-Beta 3Y',
    'ms-BondStyleBox': 'MS-Bond Style',
    'ms-CategoryName': 'MS-MS Category',
    'ms-ClosePrice': 'MS-Close Price',
    'ms-EffectiveDuration': 'MS-Effective Duration',
    'ms-EquityStyleBox': 'MS-Equity Style',
    'ms-FundTNAV': 'MS-TNAV',
    'ms-GBRReturnD1': 'MS-Return 1D (MS)',
    'ms-GBRReturnM0': 'MS-Return 0M (MS)',
    'ms-GBRReturnM1': 'MS-Return 1M (MS)',
    'ms-GBRReturnM12': 'MS-Retuen 1Y (MS)',
    'ms-GBRReturnM120': 'MS-Return 10Y (MS)',
    'ms-GBRReturnM3': 'MS-Return 3M (MS)',
    'ms-GBRReturnM36': 'MS-Return 3Y (MS)',
    'ms-GBRReturnM6': 'MS-Return 6M (MS)',
    'ms-GBRReturnM60': 'MS-Return 5Y (MS)',
    'ms-GBRReturnW1': 'MS-Return 1W (MS)',
    'ms-InitialPurchase': 'MS-Initial Purchase',
    'ms-LegalName': 'MS-Legal Name',
    'ms-ManagerTenure': 'MS-Manager Tenure',
    'ms-MaxFrontEndLoad': 'MS-Max FrontEnd Load',
    'ms-MorningstarRiskM255': 'MS-Risk Rating',
    'ms-Name': 'MS-Name (MS)',
    'ms-OngoingCharge': 'MS-Ongoing Change',
    'ms-PriceCurrency': 'MS-Currency (MS)',
    'ms-R2M36': 'MS-R2 3Y',
    'ms-SecId': 'MS-MS ID',
    'ms-SharpeM36': 'MS-Sharpe 3Y',
    'ms-StandardDeviationM36': 'MS-Std Dev 3Y',
    'ms-StarRatingM255': 'MS-MS Rating',
    'ms-SustainabilityRank': 'MS-Sustainability Risk',
    'ms-Ticker': 'MS-Ticker',
    'ms-TrackRecordExtension': 'MS-Track Record Extension',
    'ms-Yield_M12': 'MS-Yield 1Y',
};
var cn = function (n) { return _columnNames[n] || n };
var _columnVisible = ['isin', 'name', 'je-ter', 'je-assetClass'];
var _columnNumber = ['ms-Yield_M12'];
var _columnHeaderFilter = ['je-assetClass', 'je-bondType', 'ms-CategoryName', 'je-distributionPolicy', 'je-fundCurrency'];
var _columnSort = ['isin', 'name', 'je-description', 'je-ter', 'je-assetClass'];
var toNumber = function (s) {
    if (!s) return 0;
    var n = parseFloat(s);
    if (!n || isNaN(n)) return 0;
    return n;
}
var _columns = [
    {
        caption: "",
        width: 80,
        fixed: true,
        allowFiltering: false,
        allowSorting: false,
        showInColumnChooser: false,
        cellTemplate: function (container, options) {
            $("<div>")
                .append(
                    $("<a>", { "target": "_blank", "href": 'https://www.justetf.com/it/etf-profile.html?isin=' + options.data.isin })
                        .append(
                            $("<img>", { "src": 'img/just-etf.png', "width": "20px" })
                        )
                )
                .append(
                    $("<a>", { "target": "_blank", "href": 'https://www.morningstar.it/it/etf/snapshot/snapshot.aspx?id=' + options.data['ms-SecId'] })
                        .append(
                            $("<img>", { "src": 'img/morningstar.jpg', "width": "20px" })
                        )
                )
                .append(
                    $("<a>", { "target": "_blank", "href": 'https://www.borsaitaliana.it/borsa/etf/scheda/' + options.data.isin + '.html' })
                        .append(
                            $("<img>", { "src": 'img/borsa-italiana.png', "width": "20px" })
                        )
                )
                .appendTo(container);
        }
    }];
for (var n in _columnNames) {
    var column =
    {
        dataField: n,
        caption: cn(n),
        allowHeaderFiltering: _columnHeaderFilter.indexOf(n) !== -1,
        visible: _columnVisible.indexOf(n) !== -1,
        sortIndex: _columnSort.indexOf(n) !== -1 ? _columnSort.indexOf(n) : 999
    };
    if (_columnNumber.indexOf(n) !== -1) {
        column.calculateCellValue = function (data) {
            return toNumber(data[n]);
        };
    }
    _columns.push(column);
}

var _watchList = [];
function addWatch(isin) {
    _watchList.push(_etfs.filter(function (e) {
        return e.isin === isin;
    })[0]);
    buildWatchListGrid();
}

function buildWatchListGrid() {
    var data = [];
    for (var n in _columnNames) {
        var item = {};
        item["data"] = cn(n);
        for (var i = 0; i < _watchList.length; i++) {
            var etf = _watchList[i];
            item[etf.isin] = etf[n];
        }
        data.push(item);
    }
    $("#watchListGridContainer").dxDataGrid({
        dataSource: data,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        rowAlternationEnabled: true,
        paging: {
            pageSize: 200
        },
        scrolling: {
            mode: 'infinite'
        },
    });
}

$(function () {
    $.when(
        $.get('https://raw.githack.com/claudiobrotto/data-and-samples/master/finance/etf.json'),
        $.get('https://raw.githack.com/claudiobrotto/data-and-samples/master/finance/etf-dividends.json'),
    ).then(function (etf, dividends) {
        window._etfs = etf[0];
        window._etfDividends = dividends[0];
        $("#toolbar").dxToolbar({
            items: [{
                location: 'before',
                widget: 'dxButton',
                options: {
                    icon: 'orderedlist',
                    text: 'Toggle WishList',
                    onClick: function () {
                        var ls = $('.left-side');
                        if (ls.is(':visible')) {
                            ls.hide();
                            $('.right-side').css('margin-left', '0px');
                            $(this).toggleClass('toolbarButtonDisabled');
                        }
                        else {
                            ls.show();
                            $('.right-side').css('margin-left', '450px');
                            $(this).toggleClass('toolbarButtonDisabled');
                        }
                    }
                }
            }]
        });
        $("#gridContainer").dxDataGrid({
            dataSource: _etfs.sort(function (a, b) { return a.name.localeCompare(b.name); }),
            columns: _columns,
            allowColumnReordering: true,
            allowColumnResizing: true,
            columnAutoWidth: false,
            columnResizingMode: "widget",
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
            groupPanel: {
                visible: true
            },
            showBorders: true,
            wordWrapEnabled: true,
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            filterPanel: { visible: true },
            searchPanel: {
                visible: true,
                width: 240,
                placeholder: "Search..."
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
            stateStoring: {
                enabled: true,
                type: "localStorage",
                storageKey: "etf"
            },
            export: {
                enabled: true,
                fileName: "etf",
                allowExportSelectedData: true
            },
            summary: {
                totalItems: [
                    {
                        column: "isin",
                        summaryType: "count"
                    }]
            },
            selection: {
                mode: "single"
            },
            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    console.log(data.isin);
                    addWatch(data.isin);
                }
            },
            masterDetail: {
                enabled: true,
                template: function (container, options) {
                    var data = Object.keys(options.data).map(function (d) {
                        return {
                            internalName: d,
                            name: cn(d).replace('JE-', '').replace('BI-', '').replace('MS-', ''),
                            value: options.data[d]
                        }
                    }).sort(function (a, b) { return a.name.localeCompare(b.name); });
                    $("<div>")
                        .addClass("master-detail-caption")
                        .text("Quotation")
                        .appendTo(container);
                    var chartDiv = $("<div>")
                        .appendTo(container);
                    $.get('https://raw.githack.com/claudiobrotto/data-and-samples/master/finance/quotations-' + options.data.isin +'.json').then(function(data) {
                        chartDiv.dxChart({
                            palette: "Violet",
                            dataSource: data,
                            commonSeriesSettings: {
                                argumentField: "Date",
                                type: "line"
                            },
                            margin: {
                                bottom: 20
                            },
                            argumentAxis: {
                                valueMarginsEnabled: false,
                                discreteAxisDivisionMode: "crossLabels",
                                grid: {
                                    visible: true
                                }
                            },
                            series: [
                                { valueField: "Price", name: "Price" }
                            ],
                            legend: {
                                verticalAlignment: "bottom",
                                horizontalAlignment: "center",
                                itemTextPosition: "bottom"
                            },
                            title: { 
                                text: "Quotations",
                                subtitle: {
                                    text: "Stock Quotations"
                                }
                            },
                            "export": {
                                enabled: true
                            },
                            tooltip: {
                                enabled: true
                            }
                        })
                    });
                    $("<div>")
                        .addClass("master-detail-caption")
                        .text("Just ETF")
                        .appendTo(container);
                    $("<div>")
                        .dxDataGrid({
                            columns: ['name', 'value'],
                            columnAutoWidth: true,
                            showBorders: true,
                            dataSource: data.filter(function (d) { return d.internalName.indexOf('je-') == 0; }),
                            paging: {
                                pageSize: 200
                            }
                        }).appendTo(container);
                    $("<div>")
                        .addClass("master-detail-caption")
                        .text("Morningstar")
                        .appendTo(container);
                    $("<div>")
                        .dxDataGrid({
                            columns: ['name', 'value'],
                            columnAutoWidth: true,
                            showBorders: true,
                            dataSource: data.filter(function (d) { return d.internalName.indexOf('ms-') == 0; }),
                            paging: {
                                pageSize: 200
                            }
                        }).appendTo(container);
                    $("<div>")
                        .addClass("master-detail-caption")
                        .text("Borsa Italiana")
                        .appendTo(container);
                    $("<div>")
                        .dxDataGrid({
                            columns: ['name', 'value'],
                            columnAutoWidth: true,
                            showBorders: true,
                            dataSource: data.filter(function (d) { return d.internalName.indexOf('bi-') == 0; }),
                            paging: {
                                pageSize: 200
                            }
                        }).appendTo(container);

                    var dividendsData = _etfDividends.filter(function (d) {
                        return d.ISIN === options.data.isin;
                    }).sort(function (a, b) { return b.Date.localeCompare(a.Date); });
                    if (dividendsData.length > 0) {
                        $("<div>")
                            .addClass("master-detail-caption")
                            .text("Dividends")
                            .appendTo(container);

                        $("<div>")
                            .dxDataGrid({
                                columnAutoWidth: true,
                                showBorders: true,
                                columns: [
                                    { dataField: "Date", caption: 'Date', dataType: 'date' },
                                    "Amount"
                                ],
                                dataSource: dividendsData
                            }).appendTo(container);
                    }
                }
            }
        });
    });
});
$(function(){
    $("#gridContainer").dxDataGrid({
        dataSource: _etfs,
        columns: [
            "isin",
            "name",
            {
                dataField: "description",
                width: 400,
            },
            "ter",
            "assetClass",
            "ms-CategoryName",
            "distributionPolicy",
            "fundCurrency",
            "fundSize",
            "ms-Yield_M12",
            "ms-StarRatingM255"
        ],
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        showBorders: true,
        columnChooser: {
            enabled: true
        },
        columnFixing: { 
            enabled: true
        },
        groupPanel: {
            visible: true
        },
        showBorders: true,
        stateStoring: {
            enabled: true,
            type: "localStorage",
            storageKey: "etflist-storage"
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        headerFilter: {
            visible: true
        }
    });
});
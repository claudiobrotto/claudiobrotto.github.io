var myportfolio;
(function (myportfolio) {
    function _find(items, cb) {
        var found = items.filter(function (c) { return cb(c); });
        if (found.length == 1) {
            return found[0];
        }
        return null;
    }
    myportfolio._find = _find;
})(myportfolio || (myportfolio = {}));
//# sourceMappingURL=utilities.js.map
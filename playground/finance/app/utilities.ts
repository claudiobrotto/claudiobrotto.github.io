module myportfolio {
    export function _find<T>(items: T[], cb: (item: T) => boolean) {
        let found = items.filter(c => cb(c));
        if (found.length == 1) {
            return found[0];
        }
        return null;
    }
}
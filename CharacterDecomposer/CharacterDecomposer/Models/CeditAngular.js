(function () {
    'use strict'
    angular.module("Dictionary")
        .service('DictionaryService', DictionaryService);

    function DictionaryService(entry) {
        Definition def;
        if (simplifiedDict.TryGetValue(entry, out def)) {
            return def;
        }
        else if (traditionalDict.TryGetValue(entry, out def)) {

            return def;
        }
        else {
            return "Entry Not Found";

        }

    }
})();


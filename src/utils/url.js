/**
 * @index
 * @author  stylehuan
 * @create  2017-04-12 14:00
 */
export default {
    getFullHref: function () {
        return window.location.href;
    },
    getLocationParam: function (param, url) {
        var _str = !url ? window.location.search : url;
        if (_str == "") return "";
        _str = _str.replace(/(\/?#.*)/g, "");
        _str = _str.substr(_str.indexOf("?") + 1).toLowerCase();
        var _arr = _str.split("&");
        for (var i = 0; i < _arr.length; i++) {
            if (_arr[i].indexOf(param.toLowerCase() + "=") > -1) {
                return _arr[i].split("=")[1];
            }
        }
        return "";
    },
    getDirected: function (prefix) {
        var _prefix = prefix || "returnurl";
        var _param = this.getLocationParam(_prefix);
        if (!_param) return "";
        return decodeURIComponent(_param)
    },
    directed: function (url, isNewTab) {
        if (isNewTab) {
            var element = document.createElement("a");
            element.href = url;
            element.target = "_blank";
            element.click();
        } else {
            window.location = url;
        }
    },
    getPureHref: function () {
        var _location = window.location;
        var _hash = _location.hash;
        if (!_hash) return _location;
        return _location.href.replace(_hash, "");
    },
    reload: function () {
        var _location = window.location;
        var _hash = _location.hash;
        var _href = "";
        if (typeof _hash == "undefined") {
            _href = _location.href;
        } else {
            _href = _location.toString().replace(_hash, "")
        }
        this.directed(_href);
    }
};
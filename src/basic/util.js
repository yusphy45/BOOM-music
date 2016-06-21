module.exports = function () {
  Date.prototype.format = function (str) {
    var o = {
      'M+': this.getMonth() + 1,
      'd+': this.getDay() + 1,
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds()
    };
    for (var key in o) {
      str = str.replace(new RegExp('(' + key + ')'), o[key]);
    }
    return str;
  };
}();
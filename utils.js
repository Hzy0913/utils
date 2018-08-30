/**
 * 数组对象去重
 */
function uniq(array) {
  const separator = 'H`~@#z$^&-_Y';
  const typeSeparator = 's`e~p@a#r$a^t&o-r_';
  const joint = array.map(value => {
    let item = '';
    const ObjectKeys = Object.keys(value) || [];
    ObjectKeys.forEach((v, i) => {
      let joinVal = value[v];
      if (typeof value[v] !== 'string') {
        joinVal = typeof value[v] + typeSeparator + value[v];
      }
      item = item + v + separator + joinVal + ((i !== ObjectKeys.length - 1) ? separator : '');
    });
    return item;
  });
  const unique = Array.from(new Set(joint));
  return unique.map(item => {
    const splitArr = item.split(separator);
    const itemObj = {};
    splitArr.forEach((v, i) => {
      if (!(i % 2)) {
        const valueTypes = splitArr[i + 1].split(typeSeparator);
        let value = splitArr[i + 1];
        if (valueTypes.length === 2) {
          switch(valueTypes[0]){
            case 'number':
              value = parseFloat(valueTypes[1])
              break;
            case 'boolean':
              value = valueTypes[1] === 'true' ? true : false
              break;
            case 'undefined':
              value = undefined
              break;
            default:
              value = valueTypes[1]
          };
        }
        itemObj[v] = value;
      }
    });
    return itemObj;
  });
}


/**
 * 格式化时间戳
 */
function dateFormat(time, format){
  if (time.toString().length !== 13) {
    throw 'timestamp is not expecting 13 digits'
  }
  var time = new Date(time);
  var o = {
    "M+": time.getMonth() + 1, //month
    "d+": time.getDate(), //day
    "h+": time.getHours(), //hour
    "m+": time.getMinutes(), //minute
    "s+": time.getSeconds(), //second
    "q+": Math.floor((time.getMonth() + 3) / 3), //quarter
    "S": time.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1,(time.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o){
    if (new RegExp("(" + k + ")").test(format)){
      format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}


/**
 * 转换数据单位
 */
function bytesToSize(bytes, digit, unit) {
  digit = typeof digit === 'number' ? digit : 2;
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (unit) {
    bytes = parseInt(bytes) * Math.pow(k, sizes.indexOf(unit))
  }
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  bytes = bytes / Math.pow(k, i);
  const bytesArr = (bytes+'').split(".");
  let format = bytesArr[0] + (bytesArr[1] ? '.' + (bytesArr[1] || '').substring(0, digit) : '');
  if (digit === 0) {
    format = bytesArr[0];
  }
  return format + ' ' + sizes[i];
}

/**
 * 数据类型判断
 */
function datatype(data){
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      return 'array';
    } else if (data === null) {
      return 'null';
    } else {
      return 'object';
    }
  }
  return typeof data;
}

/**
 * 格式化货币
 */
function formatMoney(num, digit) {
  var numStr = num.toString();
  var numArr = numStr.split('.');
  var integer = numArr[0];
  var decimal = numArr[1];
  var money = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (decimal && digit !== 0) {
    money = money + '.' + decimal.substring(0, digit);
  }
  return money;
}

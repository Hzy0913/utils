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
function formatMoney(num, digit, mode) {
  var powNumber = Math.pow(10, digit);
  var money;
  if (mode === 'ceil') {
    money = Math.ceil(num * powNumber) / powNumber;
  } else if (mode === 'floor') {
    money = Math.floor(num * powNumber) / powNumber;
  } else {
    money = Math.round(num * powNumber) / powNumber;
  }
  var numStr = money.toString();
  var numArr = numStr.split('.');
  var integer = numArr[0];
  var decimal = numArr[1] || '';
  var decimalLength = decimal.length;
  for (var i = 0; i < (digit - decimalLength); i++) {
    decimal += '0';
  }
  money = String(integer).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (digit) {
    money = money + '.' + decimal;
  }
  return money;
}
/**
 * 冒泡排序(从小到大)
 */
function bubbleSort(data) {
  const length = data.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < (length - 1 - i); j++) {
      if (data[j] > data[j + 1]) {
        const temp = data[j + 1];
        data[j + 1] = data[j];
        data[j] = temp;
      }
    }
  }
  return data;
}

/**
 * 快速排序(从小到大)
 */
function quickSort(arr) {
  if (arr.length <= 1) { return arr; }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++){
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};

/**
 * 函数截流
 */
function throttle(fn, delay) {
  let _lastTime = null;
  return function () {
    const context = this, args = arguments;
    let _nowTime = + new Date();
    if (_nowTime - _lastTime > delay || !_lastTime) {
      fn.apply(context, args);
      _lastTime = _nowTime;
    }
  }
};

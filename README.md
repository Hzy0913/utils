## javascript中常用的工具方法
### 1.数组对象去重
```javascript
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
```
#### 用法
```javascript
uniq([{a: 1, b: 2}, {a: 1, b: 2 ,d: 3},{a:1, b:2}, {a:1, b:2, c: false}])
// [{a: 1, b: 2}, {a: 1, b: 2 ,d: 3}, {a:1, b:2, c: false}]
```
### 2.格式化时间戳
```javascript
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

```
#### 用法
```javascript
dateFormat(1527169051233, 'yyyy-MM-dd hh:mm:ss.S')
格式化为 2018-05-24-21:37:31.233   分别为 年-月-日 时:分:秒.毫秒
time参数传入日期类型(时间戳、字符串、日期对象等)的参数，format可以按照你需要的格式传入(如取 年/月/日格式，传入 ''yyyy/MM/dd')
```
### 3.转换数据单位
```javascript
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
```
#### 用法
```javascript
bytesToSize(1236235, 3)
转换为 1.178 MB。第一个参数传入转换字节，第二个为保留位数(不传默认为2)，第三个参数为单位(不传默认为B)
```
### 4.数据类型判断
```javascript
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
```
#### 用法
```javascript
datatype([1, 2])
返回 'array'
```
### 5.格式化货币
```javascript
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
```
#### 用法
```javascript
传入需要格式化的货币数值, 第二个参数为保留几位小数, 第三个参数为计算模式 //ceil 向上取整, floor 向下取整, 不传默认为四舍五入
formatMoney(14532.112, 2)
返回 '14,532.11'
```
### 6.冒泡排序(从小到大)
```javascript
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
```
#### 用法
```javascript
传入需要排序的数组, 返回从小到大排序后的结果
bubbleSort([4, 11, 6, 7])
返回 [4, 6, 7, 11]
```
### 7.快速排序(从小到大)
```javascript
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
```
#### 用法
```javascript
传入需要排序的数组, 返回从小到大排序后的结果
quickSort([4, 11, 6, 7])
返回 [4, 6, 7, 11]
```


### 8.函数截流
```javascript
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
```
#### 用法
```javascript
传入需要截流的函数内容及延迟毫秒数
window.onresize = throttle(function(e) {
  console.log(e)
}, 100)
```

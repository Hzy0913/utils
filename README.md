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

```
#### 用法
```javascript
dateFormat(1527169051233, 'yyyy-MM-dd hh:mm:ss.S')
格式化为 2018-05-24-21:37:31.233   分别为 年-月-日 时:分:秒.毫秒  可以按照你需要的格式传入
```
### 3.转换数据单位
```javascript
function bytesToSize(bytes, digit) {
    var digit = digit || 2;
    if (bytes === 0) return '0 B';
    var k = 1024;
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    var bytes = bytes / Math.pow(k, i);
    var bytesArr = (bytes+'').split(".");
    var format = bytesArr[0] + (bytesArr[1] ? '.' + (bytesArr[1] || '').substring(0, digit) : '');
    return format + ' ' + sizes[i];
}
```
#### 用法
```javascript
bytesToSize(1236235, 3)
转换为 1.178 MB。第一个参数传入转换字节，第二个为保留位数(不传默认为2)
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

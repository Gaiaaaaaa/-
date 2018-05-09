/**
 * 公共工具类
 */
import { Message } from 'element-ui'

import { getDictCities, getDictProvinceCities, getDictDataById, getDictData, getDictDataByPid, getDictFileTypes, getDictMap } from '@/api/common'
const MSG_DURATION = 5 * 1000

var Utils = {
  info: function(text) {
    Message({
      message: text,
      type: 'info',
      duration: MSG_DURATION
    })
  },
  error: function(text) {
    Message({
      message: text,
      type: 'error',
      duration: MSG_DURATION
    })
  },
  success: function(text) {
    Message({
      message: text,
      type: 'success',
      duration: MSG_DURATION
    })
  },
  warning: function(text) {
    Message({
      message: text,
      type: 'warning',
      duration: MSG_DURATION
    })
  },
  isNotEmpty: function(obj) {
    return obj !== undefined && obj !== null && obj !== ''
  },
  getDictData: function(typeId, callback) {
    getDictData(typeId).then(response => {
      if (callback) {
        callback(response.data)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  getDictMap: function(typeId, callback) {
    getDictMap(typeId).then(response => {
      if (callback) {
        callback(response.data)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  getDictDataByPid: function(pid, callback) {
    getDictDataByPid(pid).then(response => {
      if (callback) {
        callback(response.data)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  getDictDataById: function(id, callback) {
    getDictDataById(id).then(response => {
      if (callback) {
        callback(response.data)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  getCities: function(callback) {
    getDictCities().then(response => {
      if (callback) {
        callback(response.data)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  getDictProvinceCities: function(callback) {
    getDictProvinceCities().then(response => {
      if (callback) {
        callback(response.data)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  getFileTypes: function(orderId, callback) {
    getDictFileTypes(orderId).then(response => {
      if (callback) {
        callback(response.data)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  formatFileSize: function(fileSize) {
    var temp
    if (fileSize < 1024) {
      return fileSize + 'B'
    } else if (fileSize < (1024 * 1024)) {
      temp = fileSize / 1024
      temp = temp.toFixed(2)
      return temp + 'KB'
    } else if (fileSize < (1024 * 1024 * 1024)) {
      temp = fileSize / (1024 * 1024)
      temp = temp.toFixed(2)
      return temp + 'MB'
    } else {
      temp = fileSize / (1024 * 1024 * 1024)
      temp = temp.toFixed(2)
      return temp + 'GB'
    }
  },
  getAgeByBirthday: function(birthday) {
    if (!birthday) {
      return ''
    }
    var returnAge
    var strBirthdayArr = birthday.split('-')
    var birthYear = strBirthdayArr[0]
    var birthMonth = strBirthdayArr[1]
    var birthDay = strBirthdayArr[2]

    var d = new Date()
    var nowYear = d.getFullYear()
    var nowMonth = d.getMonth() + 1
    var nowDay = d.getDate()

    if (nowYear == birthYear) {
      returnAge = 0 // 同年 则为0岁
    } else {
      var ageDiff = nowYear - birthYear // 年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay // 日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        } else {
          var monthDiff = nowMonth - birthMonth // 月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        }
      } else {
        returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
      }
    }

    return returnAge
  },
  /*
    *   功能:实现VBScript的DateAdd功能.
    *   参数:interval,字符串表达式，表示要添加的时间间隔.
    *   参数:number,数值表达式，表示要添加的时间间隔的个数.
    *   参数:date,时间对象.
    *   返回:新的时间对象.
    *   var now = new Date();
    *   var newDate = DateAdd( "d", 5, now);
    *---------------   DateAdd(interval,number,date)   -----------------
    */
  dateAdd: function(interval, number, date) {
    switch (interval) {
      case 'y': {
        date.setFullYear(date.getFullYear() + number)
        break
      }
      case 'q': {
        date.setMonth(date.getMonth() + number * 3)
        break
      }
      case 'M': {
        date.setMonth(date.getMonth() + number)
        break
      }
      case 'w': {
        date.setDate(date.getDate() + number * 7)
        break
      }
      case 'd': {
        date.setDate(date.getDate() + number)
        break
      }
      case 'h': {
        date.setHours(date.getHours() + number)
        break
      }
      case 'm': {
        date.setMinutes(date.getMinutes() + number)
        break
      }
      case 's': {
        date.setSeconds(date.getSeconds() + number)
        break
      }
      default: {
        date.setDate(date.getDate() + number)
        break
      }
    }
    return date
  },

  /*
   * 初始化webSocket链接
   */
  webSocketConnection: function(userId,callback) {
    var websocket;
    if ('WebSocket' in window) {
      console.log("此浏览器支持websocket");
      const url = process.env.BASE_API
      websocket = new WebSocket(`ws://${url.replace('http://', '')}/ws-open/${userId}`);
    } else if ('MozWebSocket' in window) {
      console.log("此浏览器只支持MozWebSocket");
    } else {
      console.log("此浏览器只支持SockJS");
    }
    websocket.onopen = function(evnt) {
      console.log('链接服务器成功!');
    }
    websocket.onmessage = function(evnt) {
      console.log(evnt.data);
      const result = JSON.parse(evnt.data)
      callback(result);
    }
    websocket.onerror = this.error;
    websocket.onclose = function(evnt) {
      console.log('与服务器断开了链接!');
    }
  }
}

export default Utils

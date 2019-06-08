import Vue from 'vue'
// 将定时任务转化为crontab表达式
const dateChangeCron = (dates) =>{
    let m = ''
    let s = ''
    let h = ''
    let w = []
    if(dates.wloopValue) {
        w[0] = dates.wloopValue+1>7 ? 1 : dates.wloopValue
    }
    let mo = []
    if(dates.mloopValue) {
        mo[0] = dates.mloopValue.getDate()
    }
    if (dates.effectTime) {
        h = dates.effectTime.getHours()
        m = dates.effectTime.getMinutes()
    }
    let loopType = dates.loopType
    var cron = ''
    if (loopType === 'Days') {
        cron = 0 + '' + s + ' ' + m + ' ' + h + ' * * ?'
    } else if (loopType === 'weeks') { 
        cron = 0 + '' + s + ' ' + m + ' ' + h + ' ? * ' + w.join(',')
    } else if (loopType === 'months') { // 1-31
        cron = 0 + '' + s + ' ' + m + ' ' + h + ' ' + mo.join(',') + ' * ?'
    }
    console.log(cron)
    return cron 
}
// 将crontab表达式转化为定时任务
const cronChangeDate = (data)=>{
    let toDate = {}
    let result = data.cron_express.split(' ').join('')
    let nArr = data.cron_express.split(' ')
    let countData = getPlaceholderCount(result)
    if (!countData.count1) { // 没有'?'则是按周循环
        toDate.loopType = 'weeks'
        let keys = nArr[5]
        let en2cnMap = {
            1: '周天',
            2: '周一',
            3: '周二',
            4: '周三',
            5: '周四',
            6: '周五',
            7: '周六'
        }
        var cnKeys = keys.split(',').map(function (key, idx) {
            return en2cnMap[key];
        })
        toDate.loopValue = cnKeys.join(',')
    } else if (countData.count2 === 1) {
        toDate.loopType = 'months'
        var mot = []
        var mkeys = nArr[3].split(',')
        for (var i = 0; i < mkeys.length; i++) {
            let mo = mkeys[i]
            mot.push(mo)
        }
        toDate.loopValue = mot.join(',')
    } else {
        toDate.loopType = 'Days'
    }
    toDate.loopTime = nArr[2] + ':' + nArr[1]
    return toDate
}
const getPlaceholderCount = (strSource) =>{
    var count1 = 0 // ?的个数
    var count2 = 0 // *的个数
    strSource.replace(/\*|\?/g, function (m, i) {
      if (m === '?') {
        count1++
      } else if (m === '*') {
        count2++
      }
    });
    var obj = {}
    obj.count1 = count1
    obj.count2 = count2
    return obj //返回一个对象，根据需要得到想要的值
}
// 将过去的周禁用
//   propsTimeWeeks () {
//     let weeks = new Date().getDay()
//     if (weeks == 0) {
//       weeks = 7
//     }
//     // weeks = 1
//     let propsTimeWeeks = this.timeType.timeWeeks
//     for ( let i=0; i<propsTimeWeeks.length; i++) {
//       if (propsTimeWeeks[i].id < weeks) {
//         propsTimeWeeks[i].disabled = true
//       } else {
//         propsTimeWeeks[i].disabled = false
//       }
//     }
//     return propsTimeWeeks
//   }
// 时间转化
const formatDate = (row, column, created_time ,index) =>{
    if(created_time==null || created_time=="") return "";
    let date = new Date(created_time);
    let Y = date.getFullYear() + '-';
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D ;
}
Vue.prototype.dateChangeCron = dateChangeCron
Vue.prototype.cronChangeDate = cronChangeDate
Vue.prototype.getPlaceholderCount = getPlaceholderCount
Vue.prototype.formatDate = formatDate
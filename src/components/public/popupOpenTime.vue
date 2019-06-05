<template>
  <div class="popupOpenTime">
		<div class="data-content">
      <p>Select a duration to hold contacts within the Journey</p>
      <div class="time-content">
        <p class="mb10">Duration</p>
          <div class="mt20 mb20">
            <span>激活时间 ： </span>
            <el-date-picker
              v-model="timeType.dateTimeVal"
              size="small"
              type="datetime"
              :picker-options="{
                selectableRange: selectRange,
                disabledDate:disabledDate
              }"
              format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div class="mb20">
            <span>执行类型 ： </span>
            <el-tooltip class="item" effect="dark" content="单次执行开始时间即激活时间" placement="top-start">
              <el-radio v-model="timeType.executeType" :label="1" :change = "carryOnce(timeType.executeType)">单次执行</el-radio>
            </el-tooltip>
            <el-radio v-model="timeType.executeType" :label="2" :change = "carryOnce(timeType.executeType)">周期执行</el-radio>
          </div>
          <div>
            <span>执行时间 ： </span>
            <el-select v-model="timeType.timeVal" value="1" size="small" :disabled = ifDisabled style="width:26%;">
              <el-option
                v-for="item in timeType.time"
                :key="item.id"
                :change = "timeChange(timeType.timeVal)"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="timeType.timeWeek" value="1" style="width:26%;" :disabled = ifDisabled size="small" v-if="this.ifShowTime == 'weeks'" placeholder="选择周">
              <el-option
                v-for="item in timeType.timeWeeks"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker
              :disabled = ifDisabled
              v-if="this.ifShowTime == 'months'"
              size="small"
              style="width:26%;"
              v-model="timeType.timeMonths"
              type="date"
              placeholder="选择月">
            </el-date-picker>
            <el-time-picker
              :disabled = ifDisabled
              size="small"
              format="HH:mm"
              style="width:26%;"
              v-model="timeType.timePicker"
              placeholder="任意时间点">
            </el-time-picker>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/part.less";
export default {
  name: "popupOpenTime",
  data() {
    return{
      ifShowTime:"Days",
      ifDisabled:false,
      disabledDate(time) {
        return time.getTime() < Date.now();
      },
      selectRange: new Date().getHours()+':'+new Date().getMinutes()+':00 - 23:59:00'
    }
  },
  created() {
    if(timeType.executeType == 1) {
      this.ifDisabled = true
    }
  },
  props:["timeType"],
  methods:{
    timeChange(val) {
      if(val == "Days") {
        this.ifShowTime = "Days"
        this.timeType.timeMonths = ''
        this.timeType.timeWeek = ''
      }else if(val == "months") {
        this.ifShowTime = "months"
        this.timeType.timeWeek = ''
      }else if(val == "weeks") {
        this.ifShowTime = "weeks"
        this.timeType.timeMonths = ''
      }
    },
    carryOnce(val) {
      if(val != '') {
        if(val == 1) {
          this.ifDisabled = true
        }else{
          this.ifDisabled = false
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>

</style>


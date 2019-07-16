<template>
  <div class="popupOpenTime">
		<div class="data-content">
      <p>Select a duration to hold contacts within the Journey</p>
      <div class="time-content">
        <p class="mb10">Duration</p>
          <div class="mb20 mt20">
            <span>Execute Mode ： </span>
            <el-tooltip class="item" effect="dark" content="单次执行开始时间即激活时间" placement="top-start">
              <el-radio v-model="timeType.executeType" :disabled="ifActiveDis" :label="1" @change = "carryOnce(timeType.executeType)">One-Time</el-radio>
            </el-tooltip>
            <el-radio v-model="timeType.executeType" :disabled="ifActiveDis" :label="2" @change = "carryOnce(timeType.executeType)">On Schedule</el-radio>
          </div>
          <div class="mb20">
            <span>Active Time ： </span>
            <el-date-picker
              style="width:32%;"
              v-model="timeType.dateTimeVal"
              :disabled="ifActiveDis"
              size="small"
              type="datetime"
              :picker-options="startTime"
              placeholder="Pls Active Time">
            </el-date-picker>
            <span class="ml10">End Time ： </span>
            <el-date-picker
              style="width:32%;"
              v-model="timeType.dateEndVal"
              size="small"
              type="datetime"
              :disabled = "ifDisabled"
              :picker-options="endTime"
              placeholder="Pls End Time">
            </el-date-picker>
          </div>
          <div>
            <span>Execute Time ： </span>
            <el-select v-model="timeType.timeVal" value="1" size="small" :disabled = ifDisabled style="width:26%;">
              <el-option
                v-for="item in timeType.time"
                :key="item.id"
                :change = "timeChange(timeType.timeVal)"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="timeType.timeWeek" value="1" style="width:26%;" :disabled = ifDisabled size="small" v-if="this.ifShowTime == 'weeks'" placeholder="Pls Weeks">
              <el-option
                v-for="item in timeType.timeWeeks"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker
              :disabled = "ifDisabled"
              v-if="this.ifShowTime == 'months'"
              size="small"
              style="width:26%;"
              v-model="timeType.timeMonths"
              type="date"
              placeholder="Pls Month">
            </el-date-picker>
            <el-time-picker
              :disabled = "ifDisabled"
              size="small"
              format="HH:mm"
              style="width:26%;"
              v-model="timeType.timePicker"
              placeholder="Pls Time">
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
      startTime: {
        disabledDate: time => {
          let endDateVal = this.timeType.dateEndVal
          let nowDate = new Date().getTime()
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime() || time.getTime() < nowDate
          }else if(endDateVal == new Date().getTime()) {
            return time.getTime() > new Date(endDateVal).getTime() || time.getTime() > nowDate
          }else{
            return time.getTime() < new Date()-8.64e7
          } 
        }
      },
      endTime:{
        disabledDate: time => {
          let beginDateVal = this.timeType.dateTimeVal
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime()
          }else{
            return time.getTime() < new Date()-8.64e7
          } 
        }
      }
    }
  },
  props:["timeType","ifDisabled","ifActiveDis"],
  methods:{
    timeChange(val) {
      if(val == "Days") {
        this.ifShowTime = "Days"
        this.timeType.timeMonths = ''
        this.timeType.timeWeek = ''
      }else if(val == "Months") {
        this.ifShowTime = "months"
        this.timeType.timeWeek = ''
      }else if(val == "Weeks") {
        this.ifShowTime = "weeks"
        this.timeType.timeMonths = ''
      }
    },
    carryOnce(val) {
      this.$emit('timeCarryOnce',val)
    }
  }
};
</script>
<style lang="less" scoped>

</style>


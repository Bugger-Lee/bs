<template>
  <div class="popupOpenTime">
		<div class="data-content">
      <p>Select a duration to hold contacts within the Journey</p>
      <div class="time-content">
        <p class="mb10">Duration</p>
        <el-input-number v-model="timeType.timeNum" style="width:18%;" controls-position="right" :min="1" :max="12" size="small"></el-input-number>
        <el-select v-model="timeType.timeVal" value="1" size="small" style="width:26%;">
          <el-option
            v-for="item in timeType.time"
            :key="item.id"
            :change = "timeChange(timeType.timeVal)"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="timeType.timeWeek" value="1" style="width:26%;" size="small" v-if="this.ifShowTime == 'weeks'" placeholder="选择周">
          <el-option
            v-for="item in propsTimeWeeks"
            :key="item.id"
            :label="item.value"
            :disabled="item.disabled"
            :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          v-if="this.ifShowTime == 'months'"
          size="small"
          style="width:26%;"
          v-model="timeType.timeMonths"
          type="date"
          :picker-options="pickerOptions"
          placeholder="选择月">
        </el-date-picker>
        <el-time-picker
          size="small"
          format="HH:mm"
          style="width:26%;"
          :picker-options="{
            selectableRange: selectRange
          }"
          v-model="timeType.timePicker"
          placeholder="任意时间点">
        </el-time-picker>
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
        pickerOptions:{
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },
        selectRange: new Date().getHours()+':'+new Date().getMinutes()+':00 - 23:59:00'
      }
  },
  computed: {
    propsTimeWeeks () {
      let weeks = new Date().getDay()
      if (weeks == 0) {
        weeks = 7
      }
      // weeks = 1
      let propsTimeWeeks = this.timeType.timeWeeks
      for ( let i=0; i<propsTimeWeeks.length; i++) {
        if (propsTimeWeeks[i].id < weeks) {
          propsTimeWeeks[i].disabled = true
        } else {
          propsTimeWeeks[i].disabled = false
        }
      }
      return propsTimeWeeks
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
    }
  }
};
</script>
<style lang="less" scoped>

</style>


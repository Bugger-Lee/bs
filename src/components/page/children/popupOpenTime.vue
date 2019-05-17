<template>
  <div class="popupOpenTime">
		<div class="data-content">
      <p>Select a duration to hold contacts within the Journey</p>
      <div class="time-content">
        <p class="mb10">Duration</p>
        <el-input-number v-model="timeType.timeNum" controls-position="right" :min="1" :max="12" size="small"></el-input-number>
        <el-select v-model="timeType.timeVal" value="1" size="small">
          <el-option
            v-for="item in timeType.time"
            :key="item.id"
            :change = "timeChange(timeType.timeVal)"
            :value="item.value">
          </el-option>
        </el-select>
        <el-time-picker
          v-if="this.ifShowTime == 'Days'"
          size="small"
          format="HH:mm"
          :picker-options="{
            selectableRange: '18:30:00 - 23:59:00'
          }"
          v-model="timeType.timePicker"
          placeholder="任意时间点">
        </el-time-picker>
        <el-date-picker
          v-if="this.ifShowTime == 'weeks'"
          size="small"
          v-model="timeType.timeWeek"
          type="week"
          placeholder="选择周">
        </el-date-picker>
        <el-date-picker
          v-if="this.ifShowTime == 'months'"
          size="small"
          v-model="timeType.timeMonths"
          type="date"
          :picker-options="pickerOptions"
          placeholder="选择月">
        </el-date-picker>
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
        }
      }
  },
  props:["timeType"],
  methods:{
    timeChange(val) {
      if(val == "Days") {
        this.ifShowTime = "Days"
      }else if(val == "months") {
        this.ifShowTime = "months"
      }else if(val == "weeks") {
        this.ifShowTime = "weeks"
      }
    }
  }
};
</script>
<style lang="less" scoped>

</style>


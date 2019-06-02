<template>
  <div class="marketingActive">
    <div class="marketing">
      <div class="marketing-header">
        <el-col :span="12" class="marketing-header-l">
          <span class="l-icon ml10">
            <i class="el-icon-location"></i>
          </span>
          <div class="l-tit">
            <p class="l-tit-t">
              <span>
                <a href>Journeys Dashboard</a>
                <i>> Journey</i>
              </span>
              <span>
                <el-input
                  style="width:40%;height:30px;line-height:30px;"
                  v-model="currentTimeVal"
                  suffix-icon="el-icon-edit">
                </el-input>
              </span>
            </p>
          </div>
        </el-col>
        <el-col :span="12" class="marketing-header-r">
          <el-button-group class="mr05">
            <el-button type="primary" class="pd-btn pd-back" :disabled=disabledBtnSave :class="{'ifColor':this.ifColor == 1}" @click="saveJourney()">Save</el-button>
            <el-button type="primary" class="pd-btn pd-back" :disabled=disabledBtnTest :class="{'ifColor':this.ifColor == 2}" @click="testRunJourney('test')">Test</el-button>
          </el-button-group>
          <el-button type="primary" class="pd-btn mr15" :disabled=disabledBtnRun @click="testRunJourney('runing')">runing</el-button>
        </el-col>
      </div>
      <div class="marketing-theme">
        <el-col :span="4" style="height:99%;overflow-y:scroll;">
          <p class="marketing-theme-tit ml10">Builder</p>
          <el-menu default-active="2" class="marketing-theme-l">
            <el-submenu index="1">
              <template slot="title">
                <span>ENTRY SOURCES</span>
              </template>
              <el-menu-item-group>
                <ul class="theme-l-tmp">
                  <li>
                    <span class="crowd-style">
                      <i class="icon-shouye"></i>
                    </span>
                    <p>Data</p>
                    <p>Extension</p>
                  </li>
                </ul>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>RIGHTS</span>
              </template>
              <el-menu-item-group>
                <ul class="theme-l-tmp">
                  <li>
                    <span class="crowd-style">
                      <i class="icon-shouye"></i>
                    </span>
                    <p>promotion</p>
                  </li>
                </ul>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>ACTIVITIES</span>
              </template>
              <el-submenu index="2-1" class="marketing-el-submenu-children">
                <span slot="title">Messages</span>
                <el-menu-item-group>
                  <ul class="theme-l-tmp">
                    <li>
                      <span class="msg-style">
                        <i class="icon-shouye"></i>
                      </span>
                      <p>SMS</p>
                    </li>
                  </ul>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2-2" class="marketing-el-submenu-children">
                <span slot="title">Flow Control</span>
                <el-menu-item-group>
                  <ul class="theme-l-tmp">
                    <li>
                      <span class="ctl-style">
                        <i class="icon-shouye"></i>
                      </span>
                      <p>Wait By</p>
                      <p>Duration</p>
                    </li>
                  </ul>
                </el-menu-item-group>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="1" class="middle-style"></el-col>
        <el-col :span="18" class="marketing-drag">
          <ul class="imaginary"  v-if="!ifSmsDrag">
            <li class="imaginary-circle"></li>
            <li class="imaginary-wire">---------></li>
            <li class="imaginary-square imaginary-squares"></li>
            <li class="imaginary-wire">-------></li>
            <li class="imaginary-rhombus"></li>
            <li class="imaginary-wire">-------></li>
            <li class="imaginary-square"></li>
            <li class="imaginary-wire">-------></li>
            <li class="imaginary-rhombus"></li>
            <li class="imaginary-wire transforb">-----------</li>
            <li class="imaginary-wire transforl">-----------></li>
            <li class="imaginary-square transforr"></li>
            <li class="imaginary-wire">-------></li>
            <li class="imaginary-square"></li>
          </ul>
          <div class="window" id="data1"  ref="refData1" v-if="ifDrag">
            <span  class="crowd-style" @click="dataExtension()">
              <i class="icon-shouye"></i>
            </span>
          </div>
          <input ref="refData1div" v-if="ifDrag" value="data Extention" style="border:none" />
          <div class="window" id="return1" ref="refData2" v-if="ifSmsDrag">
            <span class="msg-style" @click="sms()">
              <i class="icon-shouye"></i>
            </span>
          </div>
          <input ref="refData2div" v-if="ifSmsDrag" value="sms" style="border:none" />
          <div class="window" id="return2" ref="refData3" v-if="ifSmsDrag">
            <span class="ctl-style" @click="selectTime()">
              <i class="icon-shouye"></i>
            </span>
          </div>
          <input ref="refData3div" v-if="ifSmsDrag" value="Time"  style="border:none" />
          <div class="window" id="return3" ref="refData4" v-if="ifSmsDrag">
            <span class="crowd-style">
              <i class="icon-shouye"></i>
            </span>
          </div>
          <input ref="refData4div" v-if="ifSmsDrag" value="over"  style="border:none"/>
        </el-col>
      </div>
      <popupDrag :openData ="openData"
        :propsData="propsData"
        :openDataContent ="openDataContent"
        :ifDataExtension ="ifDataExtension"
        @searchDate = "searchDate"
        @backlevel ="backlevel"
        @ifCheckedVal = "ifCheckedVal"
        @sltDataContent ="sltDataContent">
      </popupDrag>
      <smsPopup :openData ="openSms"
        :propsSms = "propsSms"
        :openDataContent ="openSmsContent"
        @backlevelSms ="backlevelSms"
        @searchSmsList ="searchSmsList"
        @sltSmsContent ="sltSmsContent">
      </smsPopup>
      <el-dialog
        :visible.sync="openTime"
        :close-on-click-modal="false"
        class="openTime"
        width="45%">
        <span slot="title" class="data-title">
          <span class="icon-shouye"></span>Wait By Duration
        </span>
        <span slot="footer">
          <el-button @click="openTime = false">Cancel</el-button>
          <el-button type="primary" @click="doneTime()">Done</el-button>
        </span>
        <popupOpenTime :timeType = "timeType"></popupOpenTime>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import "@/assets/css/part.less";
import jsplumb from "jsplumb";
import $ from "jquery";
import popupDrag from "./module/popupDrag.vue"
import smsPopup from "./module/smsPopup.vue"
import popupOpenTime from "@/components/public/popupOpenTime.vue"
import "@/components/need.js"
export default {
  name: "marketingActive",
  data() {
    return {
      ifDrag: false,
      ifSmsDrag: false,
      dragLeft: '',
      dragTop: '',
      openData:false,
      openSms:false,
      openDataContent:false,
      openSmsContent:false,
      openTime:false,
      ifColor:1,
      disabledBtnRun:true,
      disabledBtnSave:false,
      disabledBtnTest:true,
      currentTimeName:new Date(),
      timeType:{
        timeVal:'Days',
        time:[
          {
            id:1,
            value:"Days"
          },
          {
            id:2,
            value:"months"
          },
          {
            id:3,
            value:"weeks"
          }
        ],
        timeWeeks:[
          {
            id:1,
            value:"周一",
          },
          {
            id:2,
            value:"周二"
          },
          {
            id:3,
            value:"周三"
          },
          {
            id:4,
            value:"周四"
          },
          {
            id:5,
            value:"周五"
          },
          {
            id:6,
            value:"周六"
          },
          {
            id:7,
            value:"周日"
          },
        ],
        timePicker:"",
        timeWeek:"",
        timeMonths:""
      },
      propsData:{
        brandList: [],
        periodList: [],
        registerList: [],
        salesTable:[],
        sendSmsList:[],
        orderList:[],
        brandVal: '',
        periodVal:'',
        periodShow: '',
        brandShow:'',
        registerVal:'',
        SearchSales:'',
        newPeriod:'',
        newBuy:'',
        newMbmber:'',
        checkedActive:'',
        checkedDiscounts:'',
        dateTimeVal:''
      },
      propsSms:{
        smsTable:[],
        SearchSms: '',
        editMsg:'',
        ifShowInput:false,
        tableSelectVal:'',
        dataSelected: 2,
        ifSms:'',
        sendSmsVal:'',
      },
      couponName:'',
      templateName:'',
      ifDataExtension:'',
      cron_express: '',
      currentTimeVal:'',
      statusTestRunVal:'',
      systemId:''
    }
  },
  mounted() {
    this.dragInit();
  },
  created() {
    this.brandLists()
    this.periodLists()
    this.registerLists()
    this.discountLists()
    this.sendSmsLists()
    this.orderLists()
    this.currentTimeName = this.currentTimeName.getFullYear() + '-' + (this.currentTimeName.getMonth() + 1) + '-' + this.currentTimeName.getDate();
    this.currentTimeVal = 'New Journey -- May  '+  this.currentTimeName
  },
  components:{
    popupDrag,
    popupOpenTime,
    smsPopup
  },
  beforeRouteLeave (to,from,next) {
    let allconn = jsplumb.jsPlumb.getAllConnections()
    for (var i = 0; i < allconn.length + 1; i++) {
    jsplumb.jsPlumb.deleteConnection(allconn[0])
    }
    jsplumb.jsPlumb.deleteConnection(allconn[0])
    next()
  },
  methods: {
    doneTime() {
      if(this.timeType.timeVal == 'Days') {
        if(this.timeType.timePicker == '') {
          this.$message('请您完善时间信息');
          return false
        }
      }
      if(this.timeType.timeVal == 'months') {
         if(this.timeType.timePicker == '' || this.timeType.timeMonths == '') {
          this.$message('请您完善时间信息');
          return false
        }
      }
      if(this.timeType.timeVal == 'weeks') {
         if(this.timeType.timePicker == '' || this.timeType.timeWeek == '') {
          this.$message('请您完善时间信息');
          return false
        }
      }
      let timeObj = {
        timeClassify:this.timeType.timeVal,
        time:this.timeType.timePicker,
        timeMonths:this.timeType.timeMonths,
        timeWeeks:this.timeType.timeWeek
      }
      sessionStorage.setItem('timeMsg',JSON.stringify(timeObj))
      let datas = {
        loopType: this.timeType.timeVal,
        wloopValue: this.timeType.timeWeek,
        mloopValue: this.timeType.timeMonths,
        effectTime: this.timeType.timePicker
      }
      this.dateChangeCron(datas)
      this.cron_express = this.dateChangeCron(datas)
      console.log(this.cron_express)
      this.openTime = false
    },
    saveJourney() {
      let data = {
        rule_name:this.currentTimeVal,
        sms_channel_id:this.ifDataExtension.sms_channel_id,
        template_id: this.propsSms.smsTable[0].id,
        brand_id:this.ifDataExtension.brand,
        cycle_id:this.ifDataExtension.period,
        vip_channel_name:this.ifDataExtension.register,
        schulder_time:this.ifDataExtension.timestamp,
        camp_coupon_id:this.ifDataExtension.camp_coupon_id,
        coupon_id:this.ifDataExtension.coupon_id,
        enter_first:this.ifDataExtension.newPeriod,
        purchase_week:this.ifDataExtension.newMbmber,
        purchase_first:this.propsData.newBuy,
        cron_express:this.cron_express,
        command_code:'xxl-job-executor-sample',
      }
      this.$.post("rule/insert",data).then(res=>{
        if(res.data.code == 200) {
          this.$message(res.data.msg)
          this.ifColor = 2
          this.disabledBtnSave = true
          this.disabledBtnTest = false
          this.systemId = res.data.data
        }else{
          this.$message(res.data.msg)
          this.disabledBtnSave = false
          this.disabledBtnTest = true
        }
      })
    },
    testRunJourney(val) {
      if(val == 'test') {
        this.statusTestRunVal = 1
      }else if(val == 'runing'){
        this.statusTestRunVal = 2
      }
      this.$.get("rule/updateStatus",{params:{id:this.systemId,status:this.statusTestRunVal}}).then(res=>{
        if(res.data.code == 200) {
          if(val == 'test') {
            this.disabledBtnRun = false
            this.disabledBtnTest = true
            this.$message(res.data.msg)
          }else if(val == 'runing') {
            this.disabledBtnRun = true
            this.disabledBtnTest = true
            this.disabledBtnSave = true
            this.$confirm('您已经成功执行此操作,是否跳转到首页?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
            }).then(() => {
              this.$router.push('./')
            })
          }
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    backlevel(val) {
      if(val == 1) {
        this.openDataContent = false
        this.openData = true
      }else if(val == 2){
        this.dataSummary()
      }else if(val == 'edit') {
        this.openDataContent = true
        this.openData = false
      }
    },
    ifCheckedVal(val) {
      let active = []
      let discounts = []
      for(var i=0;i<val.active.length;i++) {
        let str = val.active[i]
        active.push(str)
      }
      for(var i=0;i<val.discounts.length;i++) {
        let str = val.discounts[i]
        discounts.push(str)
      }
      let activeData = [...new Set(active)].join(',')
      let discountsData = [...new Set(discounts)].join(',')
      this.checkedActive = activeData
      this.checkedDiscounts = discountsData
    },
    dataSummary() {
      if(this.propsData.brandVal == "" || 
      this.propsData.periodVal === "" || 
      this.propsData.registerVal.length === 0 || 
      this.propsData.dateTimeVal == '') {
        this.$message({
          showClose: true,
          message: '请您选择必选项',
          type: 'warning'
        });
        return false
      }
      let registerVal = this.propsData.registerVal.join(',')
      if(this.checkedActive == undefined || this.checkedDiscounts == undefined) {
        this.$message({
          showClose: true,
          message: '请您选择优惠券或活动券',
          type: 'warning'
        });
        return false
      }
      let item_data = this.propsData.brandList.filter(item => item.id == this.propsData.brandVal)
      let item2_data = this.propsData.periodList.filter(item => item.id == this.propsData.periodVal)
      let timestamp = this.propsData.dateTimeVal
      let objData = {
        brand:this.propsData.brandVal,
        period:this.propsData.periodVal,
        register:registerVal,
        brandShow:item_data[0].brand_name,
        periodShow:item2_data[0].cycle_type,
        newPeriod:this.propsData.newPeriod,
        newBuy:this.propsData.newBuy,
        newMbmber:this.propsData.newMbmber,
        camp_coupon_id:this.checkedActive,
        coupon_id:this.checkedDiscounts,
        schulder_time:this.propsData.dateTimeVal,
        timestamp:timestamp.getFullYear() + '-' + (timestamp.getMonth() + 1) + '-' + timestamp.getDate() + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds()
      }
      sessionStorage.setItem('dataMsg',JSON.stringify(objData))
      this.ifDataExtension = objData
      this.openDataContent = false
      this.openData = true
    },
    backlevelSms() {
      this.openSmsContent = false
      this.openSms = true
    },
    sendSmsLists() {
      this.$.get('smsChannel/getList?channelName=').then(res=>{
        this.propsData.sendSmsList = res.data.data
      })
    },
    orderLists() {
      this.$.get('command/getList?commandName=').then(res=>{
        this.propsData.orderList = res.data.data
      })
    },
    brandLists() {
      this.$.get("brand/getList?brandName=").then(res=>{
        if(res.data.code == 200) {
          this.propsData.brandList = res.data.data
        }
      })
    },
    periodLists() {
      this.$.get("lifeCycle/getList?cycleType=").then(res=>{
        if(res.data.code == 200) {
          this.propsData.periodList = res.data.data
        }
      })
    },
    registerLists() {
      this.$.get("vipChannel/getList?channelName=").then(res=>{
        if(res.data.code == 200) {
          this.propsData.registerList = res.data.data
        }
      })
    },
    discountLists() {
      this.$.get("coupon/getList",{params:{couponName:this.couponName}}).then(res=>{
        if(res.data.code == 200) {
          this.propsData.salesTable = res.data.data
        }
      })
    },
    searchDate(e) {
      var keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){
        this.couponName= this.propsData.SearchSales
        this.discountLists()
      }
    },
    smsLists() {
      this.$.get("template/getTemplate",{params:{brandId:this.ifDataExtension.brand,cycleId:this.ifDataExtension.period}}).then(res=>{
        if(res.data.code == 200) {
          this.propsSms.smsTable[0] = res.data.data
          this.propsSms.editMsg = res.data.data.document_text
        }else{
          this.propsSms.smsTable = []
        }
      })
    },
    searchSmsList(e) {
      var keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){
        this.templateName = this.propsSms.SearchSms
        this.smsLists()
      }
    },
    jsPlumb(ele1,ele2) {
      let that = this
      jsplumb.jsPlumb.ready(function() {
        jsplumb.jsPlumb.connect({
          source: ele1,
          target: ele2,
          anchors: ['Right','Left'],
          endpoint: ['Dot',{
            radius: '1',
          }],
          connector:'Straight',
          elementsDraggable: false,
          ConnectionsDetachable: false,
          overlays: [
            ["Arrow", { width: 10, length: 10, location: 1, id: "arrow" }],
          ["Label", { label: "", id: "label" }]
          ],
        });
      });
    },
    appendSms(left, top) {
      this.ifSmsDrag = true
      this.$nextTick(()=>{
        this.$refs.refData2.style.position = 'fixed'
        this.$refs.refData2.style.top = top+'px'
        this.$refs.refData2.style.left = left+'px'
        this.$refs.refData2div.style.position = 'fixed'
        this.$refs.refData2div.style.top = top+50+'px'
        this.$refs.refData2div.style.left = left+5+'px'

        this.$refs.refData3.style.position = 'fixed'
        this.$refs.refData3.style.top = top+'px'
        this.$refs.refData3.style.left = left+200+'px'
        this.$refs.refData3div.style.position = 'fixed'
        this.$refs.refData3div.style.top = top+50+'px'
        this.$refs.refData3div.style.left = left+200+5+'px'

        this.$refs.refData4.style.position = 'fixed'
        this.$refs.refData4.style.top = top+'px'
        this.$refs.refData4.style.left = left+400+'px'
        this.$refs.refData4div.style.position = 'fixed'
        this.$refs.refData4div.style.top = top+50+'px'
        this.$refs.refData4div.style.left = left+400+5+'px'
        this.jsPlumb("data1","return1")
        this.jsPlumb("return1","return2")
        this.jsPlumb("return2","return3")
      })
    },
    appendDiv(left, top) {
      this.ifDrag = true
      this.$nextTick(()=>{
        this.$refs.refData1.style.position = 'fixed'
        this.$refs.refData1.style.top = top+'px'
        this.$refs.refData1.style.left = left+'px'
        this.$refs.refData1div.style.position = 'fixed'
        this.$refs.refData1div.style.top = top+50+'px'
        this.$refs.refData1div.style.left = left+5+'px'
        this.dragLeft = left
        this.dragTop = top
        this.dargNext()
      })
    },
    dataExtension() {
      this.openData = true
    },
    sms() {
      // if(this.propsData.brandVal == "" || this.propsData.periodVal === "" || this.propsData.registerVal.length === 0 || this.checkedActive == undefined || this.checkedDiscounts == undefined) {
      //   this.$message({
      //     showClose: true,
      //     message: '请您先将数据源里的必选内容选完',
      //     type: 'warning'
      //   });
      //   return false
      // }else{
        this.smsLists()
        this.openSms = true
      // }
    },
    selectTime() {
      this.openTime = true
    },
    sltDataContent(val) {
      this.openData = false
      if (val == 'close1') {
        this.openDataContent = false
      } else if (val == 'openNext') {
        this.openDataContent = true
      }
    },
    sltSmsContent(val) {
      this.openSms = false
      if (val.name == 'close1') {
        this.openSmsContent = false
      } else if (val.name == 'openNext') {
        this.openSmsContent = true
      }else if(val.name == 'saveMsg') {
        this.saveMessage()
      }else if(val.name == 'inputBlur') {
        this.inputBlur(val.value,val.id)
      }
    },
    inputBlur(val,id) {
      if(val == '') {
        this.$message('请您输入文案内容')
        return false
      }
        let upDate = {
          cycle_id:this.ifDataExtension.period,
          brand_id:this.ifDataExtension.brand,
          document_text:val,
          id:id
        }
        this.$.post("template/update",upDate).then(res=>{
          if(res.data.code == 200) {
            this.smsLists()
          }else{
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'warning'
            });
          }
        })
    },
    saveMessage() {
      let objData = {
        contentMag:this.propsSms.editMsg
      }
      if(this.propsSms.editMsg == '') {
        this.$message({
            showClose: true,
            message: '请您新建文案内容',
            type: 'warning'
          });
        return false
        }
      if(this.propsSms.dataSelected == 2) {
        sessionStorage.setItem('smsMsg',JSON.stringify(objData))
        this.propsSms.ifSms = objData
        this.openSmsContent = false
        this.openSms = true
      }else if(this.propsSms.dataSelected == 3){
        let insertData = {
          cycle_id:this.ifDataExtension.period,
          brand_id:this.ifDataExtension.brand,
          document_text:this.propsSms.editMsg
        }
        this.$.post("template/insert",insertData).then(res=>{
          if(res.data.code == 200) {
            this.smsLists()
            let objData = {
              contentMag:this.propsSms.editMsg
            }
            this.propsSms.ifSms = objData
            this.openSmsContent = false
            this.openSms = true
          }else{
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'warning'
            });
          }
        })
      }
    },
    dragInit() {
      let minleft = $(".imaginary-circle").offset().left;
      let mintop = $(".imaginary-circle").offset().top;
      let maxleft = $(".imaginary-circle").width();
      let maxtop = $(".imaginary-circle").height();
      let that = this;
      $(".crowd-style").draggable({
        zIndex: 999,
        helper: "clone",
        scope: "dragflag",
        appendTo: "body"
      });
      $(".marketing-drag").droppable({
        scope: "dragflag",
        drop: function(event, ui) {
          if (
            minleft <= ui.offset.left &&
            ui.offset.left <= minleft + maxleft &&
            mintop <= ui.offset.top &&
            ui.offset.top < mintop + maxtop
          ) {
            that.appendDiv(ui.offset.left, ui.offset.top);
          }
        }
      });
    },
    delConnect() {
      let allconn = jsplumb.jsPlumb.getAllConnections()
      for (var i=0; i<allconn.length+1;i++) {
        jsplumb.jsPlumb.deleteConnection(allconn[0])
      }
    },
    dargNext() {
      let minleft = $(".imaginary-squares").offset().left;
      let mintop = $(".imaginary-squares").offset().top;
      let maxleft = $(".imaginary-squares").width();
      let maxtop = $(".imaginary-squares").height();
      let that = this;
      $(".msg-style").draggable({
        zIndex: 999,
        helper: "clone",
        scope: "dragflag",
        appendTo: "body"
      });
      $(".marketing-drag").droppable({
        scope: "dragflag",
        drop: function(event, ui) {
          if (
            minleft-5 <= ui.offset.left &&
            ui.offset.left <= minleft + maxleft+20 &&
            mintop-5 <= ui.offset.top &&
            ui.offset.top < mintop + maxtop+20
          ) {
            that.appendSms(ui.offset.left, that.dragTop);
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.marketingActive {
  width: 100%;
  height: 100%;
  .marketing {
    width: 98%;
    height: 98.5%;
    margin: auto;
    background-color: #fff;
    border-radius: 10px;
    .marketing-header {
      width: 100%;
      height: 60px;
      // line-height: 60px;
      background-color: #f3f2f2;
      border-radius: 10px 10px 0 0;
      .marketing-header-l {
        .l-icon {
          width: 30px;
          height: 30px;
          line-height: 30px;
          background-color: #fcb95b;
          border-radius: 5px;
          display: inline-block;
          text-align: center;
          i {
            color: #fff;
            font-size: 20px;
            line-height: 30px;
          }
        }
        .l-tit {
          display: inline-block;
          .l-tit-t {
            a {
              color: #409eff;
              text-decoration: none;
              margin-right: 5px;
            }
          }
          .l-tit-b {
            font-size: 15px;
            font-weight: 600;
          }
        }
      }
      .marketing-header-r {
        text-align: right;
        line-height: 60px;
        .pd-btn{
          padding: 6px 12px;
          background-color: #0070d2;
          border: none;
        }
        .pd-back{
          background: none;
          border: 1px solid #ece2e1;
          color: #e6e5e4;
        }
        .ifColor{
          color:#409eff;
        }
      }
    }
    .marketing-theme {
      height: 90%;
      .marketing-theme-tit {
        height: 40px;
        line-height: 40px;
      }
      .middle-style {
        width: 10px;
        height: 80%;
        position: fixed;
        border-left: 1px solid #dedede;
        border-right: 1px solid #dedede;
        left: 17.2%;
      }
      .marketing-drag {
        padding: 70px 0 0 50px;
        height: 100%;
      }
    }
  }
}
</style>


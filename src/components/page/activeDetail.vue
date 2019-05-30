<template>
  <div class="activeDetail">
    <div class="marketing">
      <div class="marketing-header">
        <el-col :span="12" class="marketing-header-l">
          <span class="l-icon ml10">
            <i class="el-icon-location"></i>
          </span>
          <div class="l-tit">
            <p class="l-tit-t">
              <a href>Journeys Dashboard</a>
              <i>> Journey</i>
            </p>
          </div>
        </el-col>
        <el-col :span="12" class="marketing-header-r">
          <el-button type="primary" class="pd-btn mr15" v-if="this.statusVal  == 0">Save</el-button>
          <el-button type="primary" class="pd-btn mr15" v-if="this.statusVal  == 1">Test</el-button>
          <el-button type="primary" class="pd-btn mr15" v-if="this.statusVal  == 2">running</el-button>
          <el-button type="primary" class="pd-btn mr15" v-if="this.statusVal  == 3">stop</el-button>
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
          <div class="window" id="data1" ref="refData1" v-if="ifDrag">
            <span class="crowd-style" @click="dataExtension()">
              <i class="icon-shouye"></i>
            </span>
          </div>
          <input ref="refData1div" v-if="ifDrag" value="data Extention" style="border:none">
          <div class="window" id="return1" ref="refData2" v-if="ifSmsDrag">
            <span class="msg-style" @click="sms()">
              <i class="icon-shouye"></i>
            </span>
          </div>
          <input ref="refData2div" v-if="ifSmsDrag" value="sms" style="border:none">
          <div class="window" id="return2" ref="refData3" v-if="ifSmsDrag">
            <span class="ctl-style" @click="selectTime()">
              <i class="icon-shouye"></i>
            </span>
          </div>
          <input ref="refData3div" v-if="ifSmsDrag" value="select" style="border:none">
          <div class="window" id="return3" ref="refData4" v-if="ifSmsDrag">
            <span class="crowd-style">
              <i class="icon-shouye"></i>
            </span>
          </div>
          <input ref="refData4div" v-if="ifSmsDrag" value="over" style="border:none">
        </el-col>
      </div>
    </div>
    <popupDrag :openData ="openData"
        :propsData="propsData"
        :openDataContent ="openDataContent"
        v-if="this.propsData.periodVal != ''"
        :ifDataExtension ="ifDataExtension"
        ref="popopenref"
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
</template>

<script>
import jsplumb from "jsplumb";
import "@/assets/css/part.less";
import smsPopup from "./children/smsPopup.vue"
import popupOpenTime from "./children/popupOpenTime.vue"
import popupDrag from "./children/popupDrag.vue"
import "@/components/need.js"
import { connect } from 'net';
export default {
  data() {
    return {
      ifDrag: true,
      ifSmsDrag: true,
      openData:false,
      openSms:false,
      openDataContent:false,
      openSmsContent:false,
      openTime:false,
      statusVal:'',
      checkedActive:'',
      checkedDiscounts:'',
      propsData:{
          routerType:2,
          brandList: [],
          periodList: [],
          registerList: [],
          salesTable:[],
          sendSmsList:[],
          orderList:[],
          orderVal:'',
          sendSmsVal:'',
          brandVal: '',
          brandId: '',
          periodVal:'',
          periodShow: '',
          brandShow:'', 
          registerVal:[],
          SearchSales:'',
          newPeriod:'',
          newBuy:'',
          newMbmber:'',
          checkedActive:'',
          checkedDiscounts:'',
          dateTimeVal:''
      },
      propsSms:{
        routerType:2,
        smsTable:[],
        SearchSms: '',
        editMsg:'',
        ifShowInput:false,
        tableSelectVal:'',
        dataSelected: 2,
        ifSms:''
      },
      timeType:{
        routerType:2,
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
        timePicker:'',
        timeWeek:"",
        timeMonths:""
      },
      ifDataExtension:'',
      defaultSet:'',
      couponName:'',
      cron_express:''
    };
  },
  components: {
    popupDrag,
    smsPopup,
    popupOpenTime
  },
  created() {
    this.dragInit(200, 320);
    this.activeMessage()
    this.brandLists()
    this.periodLists()
    this.registerLists()
    this.discountLists()
    this.sendSmsLists()
    this.orderLists()
  },
  destroyed() {
    let allconn = jsplumb.jsPlumb.getAllConnections()
    for (var i = 0; i < allconn.length + 1; i++) {
    jsplumb.jsPlumb.deleteConnection(allconn[0])
    }
    jsplumb.jsPlumb.deleteConnection(allconn[0])
  },
  methods: {
    doneTime() {
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
      this.openTime = false
    },
    dragInit(top, left) {
      this.$nextTick(() => {
        this.$refs.refData1.style.position = "fixed";
        this.$refs.refData1.style.top = top + "px";
        this.$refs.refData1.style.left = left + "px";
        this.$refs.refData1div.style.position = "fixed";
        this.$refs.refData1div.style.top = top + 50 + "px";
        this.$refs.refData1div.style.left = left + 5 + "px";

        this.$refs.refData2.style.position = "fixed";
        this.$refs.refData2.style.top = top + "px";
        this.$refs.refData2.style.left = left + 200 + "px";
        this.$refs.refData2div.style.position = "fixed";
        this.$refs.refData2div.style.top = top + 50 + "px";
        this.$refs.refData2div.style.left = left + 205 + "px";

        this.$refs.refData3.style.position = "fixed";
        this.$refs.refData3.style.top = top + "px";
        this.$refs.refData3.style.left = left + 400 + "px";
        this.$refs.refData3div.style.position = "fixed";
        this.$refs.refData3div.style.top = top + 50 + "px";
        this.$refs.refData3div.style.left = left + 400 + 5 + "px";

        this.$refs.refData4.style.position = "fixed";
        this.$refs.refData4.style.top = top + "px";
        this.$refs.refData4.style.left = left + 600 + "px";
        this.$refs.refData4div.style.position = "fixed";
        this.$refs.refData4div.style.top = top + 50 + "px";
        this.$refs.refData4div.style.left = left + 600 + 5 + "px";
        this.jsPlumb("data1", "return1");
        this.jsPlumb("return1", "return2");
        this.jsPlumb("return2", "return3");
      });
    },
    jsPlumb(ele1, ele2) {
      let that = this;
      jsplumb.jsPlumb.ready(function() {
        jsplumb.jsPlumb.connect({
          source: ele1,
          target: ele2,
          anchors: ["Right", "Left"],
          endpoint: [
            "Dot",
            {
              radius: "1"
            }
          ],
          connector: "Straight",
          elementsDraggable: false,
          ConnectionsDetachable: false,
          overlays: [
            ["Arrow", { width: 10, length: 10, location: 1, id: "arrow" }],
            ["Label", { label: "", id: "label" }]
          ]
        });
      });
    },
    activeMessage() {
      this.$.get('rule/getDetail?id='+this.$route.query.id).then(res=>{
        if(res.data.code == 200) {
          this.defaultSet = res.data.data
          this.ifDataExtension = res.data.data
          this.propsSms.ifSms = res.data.data
          this.propsData.brandVal = this.ifDataExtension.brand_name
          this.propsData.periodVal = this.ifDataExtension.cycle_type
          this.propsData.sendSmsVal = this.ifDataExtension.sms_channel_content
          this.propsData.orderVal = this.ifDataExtension.command_code
          this.propsData.dateTimeVal = this.ifDataExtension.schulder_time
          this.statusVal = this.ifDataExtension.status
          if(this.ifDataExtension.vip_channel_name.length > 0) {
            this.propsData.registerVal = this.ifDataExtension.vip_channel_name.split(',')
          }
          if(this.ifDataExtension.purchase_first == 'Y') {
            this.propsData.newBuy = '是'
          }else{
            this.propsData.newBuy = '否'
          }
          if(this.ifDataExtension.enter_first == 'Y') {
            this.propsData.newPeriod = '是'
          }else{
            this.propsData.newPeriod = '否'
          }
          if(this.ifDataExtension.purchase_week == 'Y') {
            this.propsData.newMbmber = '是'
          }else{
            this.propsData.newMbmber = '否'
          }
          this.cronChangeDate('0 33 16 31 * ?')
          console.log(this.cronChangeDate('0 33 16 31 * ?'))
          this.timeType.timeVal = this.cronChangeDate('0 33 16 31 * ?').loopType

          // this.timeType.timePicker = new Date(this.cronChangeDate("0 33 16 31 * ?").loopTime)
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    // 调度命令
    orderLists() {
      this.$.get('command/getList?commandName=').then(res=>{
        this.propsData.orderList = res.data.data
      })
    },
    // 品牌
    brandLists() {
      this.$.get("brand/getList?brandName=").then(res=>{
        if(res.data.code == 200) {
          this.propsData.brandList = res.data.data
        }
      })
    },
    // 周期
    periodLists() {
      this.$.get("lifeCycle/getList?cycleType=").then(res=>{
        if(res.data.code == 200) {
          this.propsData.periodList = res.data.data
        }
      })
    },
    // 注册渠道
    registerLists() {
      this.$.get("vipChannel/getList?channelName=").then(res=>{
        if(res.data.code == 200) {
          this.propsData.registerList = res.data.data
        }
      })
    },
    // 短信通道
    sendSmsLists() {
      this.$.get('smsChannel/getList?channelName=').then(res=>{
        this.propsData.sendSmsList = res.data.data
      })
    },
    searchDate(e) {
      var keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){
        this.couponName= this.propsData.SearchSales
        this.discountLists()
      }
    },
    discountLists() {
      this.$.get("coupon/getList",{params:{couponName:this.couponName}}).then(res=>{
        if(res.data.code == 200) {
          this.propsData.salesTable = res.data.data
        }
      })
    },
    sltDataContent(val) {
      this.openData = false
      if (val == 'close1') {
        this.openDataContent = false
      } else if (val == 'openNext') {
        this.openDataContent = true
      }
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
      this.propsData.registerVal = this.propsData.registerVal.join(',')
      let item_data = this.propsData.brandList.filter(item => item.brand_name == this.propsData.brandVal)
      let item2_data = this.propsData.periodList.filter(item => item.cycle_type == this.propsData.periodVal)
      let sms_data = this.propsData.sendSmsList.filter(item => item.channel_content == this.propsData.sendSmsVal)
      let command_data = this.propsData.orderList.filter(item => item.command_name == this.propsData.orderVal)
      let timestamp = new Date(this.propsData.dateTimeVal)
      let objData = {
        brand:item_data[0].id,
        period:item2_data[0].id,
        vip_channel_name:this.propsData.registerVal,
        brand_name:this.propsData.brandVal,
        cycle_type:this.propsData.periodVal,
        enter_first:this.propsData.newPeriod,
        purchase_first:this.propsData.newBuy,
        purchase_week:this.propsData.newMbmber,
        camp_coupon_id:this.checkedActive,
        coupon_id:this.checkedDiscounts,
        sms_channel_id: sms_data[0].id,
        sms_channel_content:this.propsData.sendSmsVal,
        command_code:this.propsData.orderVal,
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
        template_text:this.propsSms.editMsg
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
    dataExtension() {
      this.openData = true
      this.$refs.popopenref.defaultdate()
    },
    sms() {
      this.openSms = true
    },
    selectTime() {
      this.openTime = true
    }
  }
};
</script>
<style lang="less" scoped>
.activeDetail {
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
      line-height: 60px;
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
        .pd-btn {
          padding: 6px 12px;
          background-color: #0070d2;
          border: none;
        }
        .pd-back {
          background: none;
          border: 1px solid #ece2e1;
          color: #e6e5e4;
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

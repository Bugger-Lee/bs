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
              <a href>Journeys Dashboard</a>
              <i>> Journey</i>
            </p>
            <!-- <p class="l-tit-b">New Journey - April 2019</p> -->
          </div>
        </el-col>
        <el-col :span="12" class="marketing-header-r">
          <el-button-group class="mr05">
            <el-button type="primary" class="pd-btn pd-back" :class="{'ifColor':this.ifColor == 1}">Save</el-button>
            <el-button type="primary" class="pd-btn pd-back" :class="{'ifColor':this.ifColor == 2}">Test</el-button>
          </el-button-group>
          <el-button type="primary" class="pd-btn mr15">Activate</el-button>
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
                  <li>
                    <span class="crowd-style">
                      <i class="icon-shouye"></i>
                    </span>
                    <p>DMP</p>
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
                    <li>
                      <span class="msg-style">
                        <i class="icon-shouye"></i>
                      </span>
                      <p>Email</p>
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
                    <li>
                      <span class="ctl-style">
                        <i class="icon-shouye"></i>
                      </span>
                      <p>Wait By</p>
                      <p>Attribute</p>
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
          <input ref="refData3div" v-if="ifSmsDrag" value="select"  style="border:none" />
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
          <el-button type="primary">Done</el-button>
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
import popupDrag from "./children/popupDrag.vue"
import smsPopup from "./children/smsPopup.vue"
import popupOpenTime from "./children/popupOpenTime.vue"
import { connect } from 'net';
import { constants } from 'fs';
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
      timeType:{
        timeNum:1,
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
        checkedDiscounts:''
      },
      propsSms:{
        smsTable:[],
        SearchSms: '',
        editMsg:'',
        ifShowInput:false
      },
      couponName:'',
      templateName:'',
      ifDataExtension:'',
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
  },
  components:{
    popupDrag,
    popupOpenTime,
    smsPopup
  },
  methods: {
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
      if(this.propsData.brandVal == "" || this.propsData.periodVal === "" || this.propsData.registerVal.length === 0) {
        this.$message({
          showClose: true,
          message: '请您选择必选项',
          type: 'warning'
        });
        return false
      }
      this.propsData.registerVal = this.propsData.registerVal.join(',')
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
      let objData = {
        brand:this.propsData.brandVal,
        period:this.propsData.periodVal,
        register:this.propsData.registerVal,
        brandShow:item_data[0].brand_name,
        periodShow:item2_data[0].cycle_type,
        newPeriod:this.propsData.newPeriod,
        newBuy:this.propsData.newBuy,
        newMbmber:this.propsData.newMbmber,
        camp_coupon_id:this.checkedActive,
        coupon_id:this.checkedDiscounts
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
      console.log(left,top)
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
      if(this.propsData.brandVal == "" || this.propsData.periodVal === "" || this.propsData.registerVal.length === 0 || this.checkedActive == undefined || this.checkedDiscounts == undefined) {
        this.$message({
          showClose: true,
          message: '请您先将数据源里的必选内容选完',
          type: 'warning'
        });
        return false
      }else{
        this.smsLists()
        this.openSms = true
      }
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
        let insertData = {
          cycle_id:this.ifDataExtension.period,
          brand_id:this.ifDataExtension.brand,
          document_text:this.propsSms.editMsg
        }
        this.$.post("template/insert",insertData).then(res=>{
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


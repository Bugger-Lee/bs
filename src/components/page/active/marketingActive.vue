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
                
            </p>
            <p>
              <el-input
                  style="height:20px;line-height:20px;"
                  v-model="currentTimeVal"
                  suffix-icon="el-icon-edit"
                  size="mini"
                ></el-input>
            </p>
          </div>
        </el-col>
        <el-col :span="12" class="marketing-header-r">
          <el-button-group class="mr05">
            <el-button
              type="primary"
              class="pd-btn pd-back ifColor"
              v-if="this.saveSave==true"
              @click="saveJourney()"
            >Save</el-button>
            <el-button
              type="primary"
               v-if="this.saveUpdate==true"
              class="pd-btn pd-back ifColor"
              @click="updateJorney()"
            >Update</el-button>
            <el-button
              type="primary"
               v-if="this.saveTest==true"
              class="pd-btn pd-back ifColor"
              @click="testRunJourney('test')"
            >Test</el-button>
          </el-button-group>
          <el-button
            type="primary"
            class="pd-btn mr15"
             v-if="this.saveRunning==true"
            @click="testRunJourney('runing')"
          >Run</el-button>
          <el-button
            type="primary"
            class="pd-btn mr15"
             v-if="this.saveStop==true"
            @click="testRunJourney('stop')"
          >Stop</el-button>
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
                  <!-- <li v-for="i in sourcesType" :key="i.id">
                    <span class="crowd-style">
                      <i class="icon-dbsshujukubeifenDBS-copy-copy-copy"></i>
                    </span>
                    <p>{{i.command_name}}</p>
                  </li> -->
                  <li>
                    <span class="crowd-style">
                      <i class="icon-dbsshujukubeifenDBS-copy-copy-copy"></i>
                    </span>
                    <p>CLV Data</p>
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
                    <span class="crowds-style" style="background-color:#ffcd43;">
                      <i class="icon-quanyi-copy-copy"></i>
                    </span>
                    <p>Coupon</p>
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
                        <i class="icon-duanxin2-copy" style="font-size:32px;"></i>
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
                        <i class="icon-time1"></i>
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
          <ul class="imaginary" v-if="!ifSmsDrag">
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
          <div v-if="showFirst">
            <div  id="data1" ref="refData1" v-if="ifDrag">
              <span class="crowd-style" @click="dataExtension()">
                <i class="icon-dbsshujukubeifenDBS-copy-copy-copy"></i>
              </span>
            </div>
            <div ref="refData1div" v-if="ifDrag">CLV Data</div>
            <div  id="return1" ref="refData2" v-if="ifSmsDrag">
              <span class="msg-style" @click="sms()">
                <i class="icon-duanxin2-copy" style="font-size:32px;"></i>
              </span>
            </div>
            <div ref="refData2div" v-if="ifSmsDrag">SMS</div>
            <div  id="newreturn" ref="newData" v-if="ifProDrag">
              <span class="crowds-style"  @click="popupTicket()" style="background-color:#ffcd43;">
                <i class="icon-quanyi-copy-copy"></i>
              </span>
            </div>
            <div ref="newrefDatadiv" v-if="ifProDrag">Coupon</div>
            <div  id="return2" ref="refData3" v-if="ifSmsDrag">
              <span class="ctl-style" @click="selectTime()">
                <i class="icon-time1"></i>
              </span>
            </div>
            <div ref="refData3div" v-if="ifSmsDrag">Time</div>
            <div  id="return3" ref="refData4" v-if="ifSmsDrag">
              <span class="crowd-style">
                <i class="icon-wancheng1"></i>
              </span>
            </div>
            <div ref="refData4div" v-if="ifSmsDrag">Over</div>
          </div>
          <div v-if="showSecend">
            <div  id="data1" ref="refData1" v-if="ifDrag">
              <span class="crowd-style" @click="dataExtension()">
                <i class="icon-dbsshujukubeifenDBS-copy-copy-copy"></i>
              </span>
            </div>
            <div ref="refData1div" v-if="ifDrag">CLV Data</div>
            <div  id="newreturn1" ref="newData" v-if="ifProDrag">
              <span class="crowds-style" @click="popupTicket()" style="background-color:#ffcd43;">
                <i class="icon-quanyi-copy-copy"></i>
              </span>
            </div>
            <div ref="newrefDatadiv" v-if="ifProDrag">Coupon</div>
            <div  id="return222" ref="refData3" v-if="ifSmsDrag">
              <span class="ctl-style" @click="selectTime()">
                <i class="icon-time1"></i>
              </span>
            </div>
            <div ref="refData3div" v-if="ifSmsDrag">Time</div>
            <div  id="return333" ref="refData4" v-if="ifSmsDrag">
              <span class="crowd-style">
                <i class="icon-wancheng1"></i>
              </span>
            </div>
            <div ref="refData4div" v-if="ifSmsDrag">Over</div>
          </div>
          <div v-if="showLast">
            <div  id="data1" ref="refData1" v-if="ifDrag">
              <span class="crowd-style" @click="dataExtension()">
                <i class="icon-dbsshujukubeifenDBS-copy-copy-copy"></i>
              </span>
            </div>
            <div ref="refData1div" v-if="ifDrag">CLV Data</div>
            <div  id="return1111" ref="refData2" v-if="ifSmsDrag">
              <span class="msg-style" @click="sms()">
                <i class="icon-duanxin2-copy" style="font-size:32px;"></i>
              </span>
            </div>
            <div ref="refData2div" v-if="ifSmsDrag">SMS</div>
            <div  id="newreturn11" ref="newData" v-if="ifProDrag">
              <span class="crowds-style" @click="popupTicket()" style="background-color:#ffcd43;">
                <i class="icon-quanyi-copy-copy"></i>
              </span>
            </div>
            <div ref="newrefDatadiv" v-if="ifProDrag">Coupon</div>
            <div  id="return2222" ref="refData3" v-if="ifSmsDrag">
              <span class="ctl-style" @click="selectTime()">
                <i class="icon-time1"></i>
              </span>
            </div>
            <div ref="refData3div" v-if="ifSmsDrag">Time</div>
            <div  id="return3333" ref="refData4" v-if="ifSmsDrag">
              <span class="crowd-style">
                <i class="icon-wancheng1"></i>
              </span>
            </div>
            <div ref="refData4div" v-if="ifSmsDrag">Over</div>
          </div>
          <div v-if="showFirst1">
            <div  id="data1" ref="refData1" v-if="ifDrag">
              <span class="crowd-style" @click="dataExtension()">
                <i class="icon-dbsshujukubeifenDBS-copy-copy-copy"></i>
              </span>
            </div>
            <div ref="refData1div" v-if="ifDrag">CLV Data</div>
            <div  id="return11" ref="refData2" v-if="ifSmsDrag">
              <span class="msg-style" @click="sms()">
                <i class="icon-duanxin2-copy"  style="font-size:32px;"></i>
              </span>
            </div>
            <div ref="refData2div" v-if="ifSmsDrag">SMS</div>
            <div  id="newreturn" ref="newData" v-if="ifProDrag">
              <span class="crowds-style" @click="popupTicket()" style="background-color:#ffcd43;">
                <i class="icon-quanyi-copy-copy"></i>
              </span>
            </div>
            <div ref="newrefDatadiv" v-if="ifProDrag">Coupon</div>
            <div  id="return22" ref="refData3" v-if="ifSmsDrag">
              <span class="ctl-style" @click="selectTime()">
                <i class="icon-time1"></i>
              </span>
            </div>
            <div ref="refData3div" v-if="ifSmsDrag">Time</div>
            <div  id="return33" ref="refData4" v-if="ifSmsDrag">
              <span class="crowd-style">
                <i class="icon-wancheng1"></i>
              </span>
            </div>
            <div ref="refData4div" v-if="ifSmsDrag">Over</div>
          </div>
        </el-col>
      </div>
      <popupDrag
        :openData="openData"
        :propsData="propsData"
        :openDataContent="openDataContent"
        :ifDataExtension="ifDataExtension"
        @backlevel="backlevel"
        @sltDataContent="sltDataContent"
      ></popupDrag>
      <smsPopup
        :openData="openSms"
        :propsSms="propsSms"
        :openDataContent="openSmsContent"
        @backlevelSms="backlevelSms"
        @searchSmsList="searchSmsList"
        @sltSmsContent="sltSmsContent"
      ></smsPopup>
      <popupTicket :openData="openTicket" 
      :openDataContent="openTicketContent"
      @searchDate="searchDate"
      :propsTicket = "propsTicket"
      @ifCheckedVal="ifCheckedVal"
      @PromotionLevel="PromotionLevel"
      @sltPromotion="sltPromotion">
      </popupTicket>
      <el-dialog
        :visible.sync="openTime"
        :close-on-click-modal="false"
        class="openTime"
        width="45%"
      >
        <span slot="title" class="data-title">
          <span class="data-title-time"><i class="icon-time1"></i></span>Wait By Duration
        </span>
        <span slot="footer">
          <el-button @click="openTime = false">Cancel</el-button>
          <el-button type="primary" @click="doneTime()">Done</el-button>
        </span>
        <popupOpenTime :timeType="timeType"></popupOpenTime>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import "@/assets/css/part.less";
import jsplumb from "jsplumb";
import $ from "jquery";
import popupDrag from "./module/popupDrag.vue";
import smsPopup from "./module/smsPopup.vue";
import popupTicket from "./module/popupTicket.vue";
import popupOpenTime from "@/components/public/popupOpenTime.vue";
import "@/components/need.js";
import { constants } from 'fs';
export default {
  name: "marketingActive",
  data() {
    return {
      saveSave:true,
      saveUpdate:false,
      saveTest:true,
      saveRunning:true,
      saveStop:false,
      ifDrag: false,
      ifSmsDrag: false,
      ifProDrag: false,
      showFirst: true,
      showSecend: false,
      showLast: false,
      showFirst1: false,
      dragLeft: "",
      dragTop: "",
      openData: false,
      openSms: false,
      openTicket: false,
      openTicketContent: false,
      openDataContent: false,
      openSmsContent: false,
      openTime: false,
      currentTimeName: new Date(),
      timeType: {
        timeVal: "Days",
        executeType: 2,
        dateTimeVal: "",
        timestamp:'',
        time: [
          {
            id: 1,
            value: "Days"
          },
          {
            id: 3,
            value: "Weeks"
          },
          {
            id: 2,
            value: "Months"
          }
        ],
        timeWeeks: [
          {
            id: 1,
            value: "周一"
          },
          {
            id: 2,
            value: "周二"
          },
          {
            id: 3,
            value: "周三"
          },
          {
            id: 4,
            value: "周四"
          },
          {
            id: 5,
            value: "周五"
          },
          {
            id: 6,
            value: "周六"
          },
          {
            id: 7,
            value: "周日"
          }
        ],
        timePicker: "",
        timeWeek: "",
        timeMonths: ""
      },
      propsData: {
        brandList: [],
        periodList: [],
        registerList: [],
        brandVal: "",
        periodVal: "",
        periodShow: "",
        brandShow: "",
        registerVal: "",
        newPeriod: "",
        newBuy: "",
        newMbmber: "",
      },
      propsTicket:{
        salesTable: [],
        ifPromotion:'',
        SearchSales: "",
        checkedActive: "",
        checkedDiscounts: ""
      },
      propsSms: {
        smsTable: [],
        sendSmsList: [],
        SearchSms: "",
        editMsg: "",
        ifShowInput: false,
        tableSelectVal: "",
        dataSelected: 2,
        ifSms: '',
        sendSmsVal: ""
      },
      couponName: "",
      ifDataExtension: "",
      cron_express: "",
      currentTimeVal: "",
      statusTestRunVal: "",
      systemId: "",
      dargSms: false,
      sortDrag: "",
      sourcesType:[]
    };
  },
  mounted() {
    this.dragInit();
  },
  created() {
    this.brandLists();
    this.periodLists();
    this.registerLists();
    this.sendSmsLists();
    this.sourcesList();
    this.currentTimeName =
      this.currentTimeName.getFullYear() +
      "-" +
      (this.currentTimeName.getMonth() + 1) +
      "-" +
      this.currentTimeName.getDate();
    this.currentTimeVal = "New Journey -- May  " + this.currentTimeName;
  },
  components: {
    popupDrag,
    popupOpenTime,
    smsPopup,
    popupTicket
  },
  beforeRouteLeave(to, from, next) {
    let allconn = jsplumb.jsPlumb.getAllConnections();
    for (var i = 0; i < allconn.length + 1; i++) {
      jsplumb.jsPlumb.deleteConnection(allconn[0]);
    }
    jsplumb.jsPlumb.deleteConnection(allconn[0]);
    next();
  },
  methods: {
    doneTime() {
      if(this.timeType.executeType == 2) {
        if (this.timeType.timeVal == "Days") {
          if (this.timeType.timePicker == "") {
            this.$message("请您完善时间信息");
            return false;
          }
        }
        if (this.timeType.timeVal == "months") {
          if (this.timeType.timePicker == "" || this.timeType.timeMonths == "") {
            this.$message("请您完善时间信息");
            return false;
          }
        }
        if (this.timeType.timeVal == "weeks") {
          if (this.timeType.timePicker == "" || this.timeType.timeWeek == "") {
            this.$message("请您完善时间信息");
            return false;
          }
        }
      }
      if(this.timeType.dateTimeVal == '') {this.$message('请您选择激活时间')}
      let timestamp = new Date(this.timeType.dateTimeVal)
      this.timeType.timestamp = timestamp.getFullYear() + '-' + (timestamp.getMonth() + 1) + '-' + timestamp.getDate() + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds()
      let datas = {
        loopType: this.timeType.timeVal,
        wloopValue: this.timeType.timeWeek,
        mloopValue: this.timeType.timeMonths,
        effectTime: this.timeType.timePicker
      };
      this.dateChangeCron(datas);
      this.cron_express = this.dateChangeCron(datas);
      if(this.timeType.executeType == 1) {
        this.cron_express = ''
      }
      this.openTime = false;
    },
    saveJourney() {
      let getSessionItem = JSON.parse(sessionStorage.getItem("user"));
      let data = {
        rule_name: this.currentTimeVal,
        sms_channel_id: this.propsSms.ifSms.sms_channel_id,
        template_id: this.propsSms.ifSms.id,
        brand_id: this.ifDataExtension.brand,
        cycle_id: this.ifDataExtension.period,
        vip_channel_name: this.ifDataExtension.register,
        schulder_time: this.timeType.timestamp,
        camp_coupon_id: this.propsTicket.ifPromotion.camp_coupon_id || '',
        coupon_id: this.propsTicket.ifPromotion.coupon_id || '',
        enter_first: this.ifDataExtension.newPeriod,
        purchase_week: this.ifDataExtension.newMbmber,
        purchase_first: this.propsData.newBuy,
        cron_express: this.cron_express,
        command_name:"CLV人群",
        command_code: "clv-job",
        created_by:getSessionItem.user_name
      };
      this.$.post("rule/insert", data).then(res => {
        if (res.data.code == 200) {
          this.$message(res.data.msg);
          this.systemId = res.data.data;
          this.saveSave = false
          this.saveUpdate = true
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    updateJorney() {
      let getSessionItem = JSON.parse(sessionStorage.getItem("user"));
      let data = {
        id:this.systemId,
        rule_name: this.currentTimeVal,
        sms_channel_id: this.propsSms.ifSms.sms_channel_id,
        template_id: this.propsSms.smsTable.id,
        brand_id: this.ifDataExtension.brand,
        cycle_id: this.ifDataExtension.period,
        vip_channel_name: this.ifDataExtension.register,
        schulder_time: this.timeType.timestamp,
        camp_coupon_id: this.propsTicket.ifPromotion.camp_coupon_id,
        coupon_id: this.propsTicket.ifPromotion.coupon_id,
        enter_first: this.ifDataExtension.newPeriod,
        purchase_week: this.ifDataExtension.newMbmber,
        purchase_first: this.propsData.newBuy,
        cron_express: this.cron_express,
        command_name:"CLV人群",
        command_code: "clv-job",
        created_by:getSessionItem.user_name
      };
      this.$.post("rule/update", data).then(res => {
        if (res.data.code == 200) {
          this.$message(res.data.msg);
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    testRunJourney(val) {
      if(this.saveSave == true) {
        this.$message("请您新Save")
        return false
      }
      if (val == "test") {
        this.statusTestRunVal = 1;
      } else if (val == "runing") {
        this.statusTestRunVal = 2;
      }else if(val == 'stop') {
        this.statusTestRunVal = 3;
      }
      this.$.get("rule/updateStatus", {
        params: { id: this.systemId, status: this.statusTestRunVal }
      }).then(res => {
        if (res.data.code == 200) {
          if (val == "test") {
            this.$message(res.data.msg);
          } else if (val == "runing") {
            this.saveUpdate = false 
            this.saveTest = false
            this.saveRunning = false
            this.saveStop = true
            this.$confirm("您已经成功执行此操作,是否跳转到首页?", "提示", {
              confirmButtonText: "是",
              cancelButtonText: "否"
            }).then(() => {
              this.$router.push("./");
            });
          }else if(val == "stop") {
            this.$message(res.data.msg);
          }
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    backlevel(val) {
      if (val == 1) {
        this.openDataContent = false;
        this.openData = true;
      } else if (val == 2) {
        this.dataSummary();
      } else if (val == "edit") {
        this.openDataContent = true;
        this.openData = false;
      }
    },
    PromotionLevel(val) {
      if (val == 1) {
        this.openTicketContent = false;
        this.openTicket = true;
      } else if (val == 2) {
        this.promotionSummary()
      } else if (val == "edit") {
        this.openTicketContent = true;
        this.openTicket = false;
      }
    },
    ifCheckedVal(val) {
      let active = [];
      let discounts = [];
      for (var i = 0; i < val.active.length; i++) {
        let str = val.active[i];
        active.push(str);
      }
      for (var i = 0; i < val.discounts.length; i++) {
        let str = val.discounts[i];
        discounts.push(str);
      }
      let activeData = [...new Set(active)].join(",");
      let discountsData = [...new Set(discounts)].join(",");
      this.checkedActive = activeData;
      this.checkedDiscounts = discountsData;
    },
    promotionSummary() {
      if (this.checkedActive == undefined || this.checkedDiscounts == undefined) {
        this.$message({
          showClose: true,
          message: "请您选择优惠券或活动券",
          type: "warning"
        });
        return false;
      }
      let obj = {
        camp_coupon_id: this.checkedActive,
        coupon_id: this.checkedDiscounts
      }
      this.propsTicket.ifPromotion = obj
      this.openTicketContent = false;
      this.openTicket = true;
    },
    dataSummary() {
      if(this.propsData.brandVal == "" ||this.propsData.periodVal === "" ||this.propsData.registerVal.length === 0) {
        this.$message({
          showClose: true,
          message: "请您选择必选项",
          type: "warning"
        });
        return false;
      }
      let registerVal = this.propsData.registerVal.join(",");
      let item_data = this.propsData.brandList.filter(
        item => item.id == this.propsData.brandVal
      );
      let item2_data = this.propsData.periodList.filter(
        item => item.id == this.propsData.periodVal
      );
      let objData = {
        brand: this.propsData.brandVal,
        period: this.propsData.periodVal,
        register: registerVal,
        brandShow: item_data[0].brand_name,
        periodShow: item2_data[0].cycle_type,
        newPeriod: this.propsData.newPeriod,
        newBuy: this.propsData.newBuy,
        newMbmber: this.propsData.newMbmber,
      };
      this.ifDataExtension = objData;
      this.openDataContent = false;
      this.openData = true;
    },
    backlevelSms(val) {
      this.openSmsContent = false;
      this.openSms = true;
    },
    sendSmsLists() {
      this.$.get("smsChannel/getList?channelName=").then(res => {
        this.propsSms.sendSmsList = res.data.data;
      });
    },
    sourcesList() {
      this.$.get("command/getList?commandName=").then(res => {
          if(res.data.code == 200) {
            this.sourcesType  = res.data.data
          }
      });
    },
    brandLists() {
      this.$.get("brand/getList?brandName=").then(res => {
        if (res.data.code == 200) {
          this.propsData.brandList = res.data.data;
        }
      });
    },
    periodLists() {
      this.$.get("lifeCycle/getList?cycleType=").then(res => {
        if (res.data.code == 200) {
          this.propsData.periodList = res.data.data;
        }
      });
    },
    registerLists() {
      this.$.get("vipChannel/getList?channelName=").then(res => {
        if (res.data.code == 200) {
          this.propsData.registerList = res.data.data;
        }
      });
    },
    discountLists() {
      this.$.get("coupon/getCouponList", {params: { couponName: this.couponName ,brandName:this.ifDataExtension.brandShow}}).then(res => {
        if (res.data.code == 200) {
          this.propsTicket.salesTable = res.data.data;
        }
      });
    },
    searchDate(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.couponName = this.propsTicket.SearchSales;
        this.discountLists();
      }
    },
    smsLists() {
      this.$.get("template/getTemplate", {
        params: {
          brandId: this.ifDataExtension.brand,
          cycleId: this.ifDataExtension.period,
          documentText:this.propsSms.SearchSms
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.propsSms.smsTable = res.data.data;
          this.propsSms.editMsg = res.data.data.document_text;
        } else {
          this.propsSms.smsTable = [];
        }
      });
    },
    searchSmsList(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.smsLists();
      }
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
          paintStyle: { stroke: 'lightgray', strokeWidth: 3 },
          elementsDraggable: false,
          ConnectionsDetachable: false,
          overlays: [
            // ["Arrow", { width: 10, length: 10, location: 1, id: "arrow" }],
            ["Label", { label: "", id: "label" }]
          ]
        });
      });
    },
    appendSms(left, top) {
      this.dargSms = true;
      this.ifSmsDrag = true;
      this.$nextTick(() => {
        this.$refs.refData2.style.position = "fixed";
        this.$refs.refData2.style.top = top + "px";
        this.$refs.refData2.style.left = left + "px";
        this.$refs.refData2div.style.position = "fixed";
        this.$refs.refData2div.style.top = top + 50 + "px";
        this.$refs.refData2div.style.left = left + 5 + "px";

        this.$refs.refData3.style.position = "fixed";
        this.$refs.refData3.style.top = top + "px";
        this.$refs.refData3.style.left = left + 150 + "px";
        this.$refs.refData3div.style.position = "fixed";
        this.$refs.refData3div.style.top = top + 50 + "px";
        this.$refs.refData3div.style.left = left + 150 + 5 + "px";

        this.$refs.refData4.style.position = "fixed";
        this.$refs.refData4.style.top = top + "px";
        this.$refs.refData4.style.left = left + 300 + "px";
        this.$refs.refData4div.style.position = "fixed";
        this.$refs.refData4div.style.top = top + 50 + "px";
        this.$refs.refData4div.style.left = left + 300 + 5 + "px";
        this.jsPlumb("data1", "return1");
        this.jsPlumb("return1", "return2");
        this.jsPlumb("return2", "return3");
        // this.dargNextNew()
      });
    },
    appendSms1(left, top) {
      this.dargSms = false;
      this.ifProDrag = true;
      this.ifSmsDrag = false;
      this.showSecend = true;
      this.showFirst = false;
      this.showLast = false;
      this.$nextTick(() => {
        this.$refs.newData.style.position = "fixed";
        this.$refs.newData.style.top = top + "px";
        this.$refs.newData.style.left = left + "px";
        this.$refs.newrefDatadiv.style.position = "fixed";
        this.$refs.newrefDatadiv.style.top = top + 50 + "px";
        this.$refs.newrefDatadiv.style.left = left + -5 + "px";
      });
    },
    appendDiv(left, top) {
      this.ifDrag = true;
      this.$nextTick(() => {
        this.$refs.refData1.style.position = "fixed";
        this.$refs.refData1.style.top = top + "px";
        this.$refs.refData1.style.left = left + "px";
        this.$refs.refData1div.style.position = "fixed";
        this.$refs.refData1div.style.top = top + 50 + "px";
        this.$refs.refData1div.style.left = left + -8 + "px";
        this.dragLeft = left;
        this.dragTop = top;
        this.dargNext();
      });
    },
    appendPro(left, top) {
      this.ifProDrag = true;
      this.showFirst = false;
      this.showFirst1 = true;
      this.$nextTick(() => {
        this.$refs.newData.style.position = "fixed";
        this.$refs.newData.style.top = top + "px";
        this.$refs.newData.style.left = left + 80 + "px";
        this.$refs.newrefDatadiv.style.position = "fixed";
        this.$refs.newrefDatadiv.style.top = top + 50 + "px";
        this.$refs.newrefDatadiv.style.left = left + 75 + "px";

        this.$refs.refData2.style.position = "fixed";
        this.$refs.refData2.style.top = top + "px";
        this.$refs.refData2.style.left = left + 230 + "px";
        this.$refs.refData2div.style.position = "fixed";
        this.$refs.refData2div.style.top = top + 50 + "px";
        this.$refs.refData2div.style.left = left + 235 + "px";

        this.$refs.refData3.style.position = "fixed";
        this.$refs.refData3.style.top = top + "px";
        this.$refs.refData3.style.left = left + 380 + "px";
        this.$refs.refData3div.style.position = "fixed";
        this.$refs.refData3div.style.top = top + 50 + "px";
        this.$refs.refData3div.style.left = left + 380 + 5 + "px";

        this.$refs.refData4.style.position = "fixed";
        this.$refs.refData4.style.top = top + "px";
        this.$refs.refData4.style.left = left + 530 + "px";
        this.$refs.refData4div.style.position = "fixed";
        this.$refs.refData4div.style.top = top + 50 + "px";
        this.$refs.refData4div.style.left = left + 530 + 5 + "px";
        let allconn = jsplumb.jsPlumb.getAllConnections();
        for (var i = 0; i < allconn.length + 1; i++) {
          jsplumb.jsPlumb.deleteConnection(allconn[0]);
        }
        jsplumb.jsPlumb.deleteConnection(allconn[0]);
        this.jsPlumb("data1", "newreturn");
        this.jsPlumb("newreturn", "return11");
        this.jsPlumb("return11", "return22");
        this.jsPlumb("return22", "return33");
        // this.dargNextNew()
      });
    },
    appendPro1(left, top) {
      this.dargSms = true
      this.ifSmsDrag =true
      this.ifProDrag = true;
      this.showFirst = false;
      this.showSecend = false;
      this.showLast = true;
      this.$nextTick(() => {
        this.$refs.newData.style.position = "fixed";
        this.$refs.newData.style.top = top + "px";
        this.$refs.newData.style.left = left + -20 + "px";
        this.$refs.newrefDatadiv.style.position = "fixed";
        this.$refs.newrefDatadiv.style.top = top + 50 + "px";
        this.$refs.newrefDatadiv.style.left = left + -25 + "px";

        this.$refs.refData2.style.position = "fixed";
        this.$refs.refData2.style.top = top + "px";
        this.$refs.refData2.style.left = left + 150 + "px";
        this.$refs.refData2div.style.position = "fixed";
        this.$refs.refData2div.style.top = top + 50 + "px";
        this.$refs.refData2div.style.left = left + 155 + "px";

        this.$refs.refData3.style.position = "fixed";
        this.$refs.refData3.style.top = top + "px";
        this.$refs.refData3.style.left = left + 300 + "px";
        this.$refs.refData3div.style.position = "fixed";
        this.$refs.refData3div.style.top = top + 50 + "px";
        this.$refs.refData3div.style.left = left + 300 + 5 + "px";

        this.$refs.refData4.style.position = "fixed";
        this.$refs.refData4.style.top = top + "px";
        this.$refs.refData4.style.left = left + 450 + "px";
        this.$refs.refData4div.style.position = "fixed";
        this.$refs.refData4div.style.top = top + 50 + "px";
        this.$refs.refData4div.style.left = left + 450 + 5 + "px";
        let allconn = jsplumb.jsPlumb.getAllConnections();
        for (var i = 0; i < allconn.length + 1; i++) {
          jsplumb.jsPlumb.deleteConnection(allconn[0]);
        }
        jsplumb.jsPlumb.deleteConnection(allconn[0]);
        this.jsPlumb("data1", "newreturn11");
        this.jsPlumb("newreturn11", "return1111");
        this.jsPlumb("return1111", "return2222");
        this.jsPlumb("return2222", "return3333");
        // this.dargNextNew()
      });
    },
    dataExtension() {
      this.openData = true;
    },
    popupTicket() {
      if(this.propsData.brandVal == "" || this.propsData.periodVal === "" || this.propsData.registerVal.length === 0) {
        this.$message({
          showClose: true,
          message: '请您先将数据源里的必选内容选完',
          type: 'warning'
        });
        return false
      }else{
        this.discountLists();
        this.openTicket = true;
      }
    },
    sms() {
      if(this.propsData.brandVal == "" || this.propsData.periodVal === "" || this.propsData.registerVal.length === 0) {
        this.$message({
          showClose: true,
          message: '请您先将数据源里的必选内容选完',
          type: 'warning'
        });
        return false
      }else{
        this.smsLists();
        this.openSms = true;
      }
    },
    selectTime() {
      this.openTime = true;
    },
    sltDataContent(val) {
      this.openData = false;
      if (val == "close1") {
        this.openDataContent = false;
      } else if (val == "openNext") {
        this.openDataContent = true;
      }
    },
    sltPromotion(val) {
      this.openTicket = false;
      if (val == "close1") {
        this.openTicketContent = false;
      } else if (val == "openNext") {
        this.openTicketContent = true;
      }
    },
    sltSmsContent(val) {
      this.openSms = false;
      if (val.name == "close1") {
        this.openSmsContent = false;
      } else if (val.name == "openNext") {
        this.openSmsContent = true;
      } else if (val.name == "saveMsg") {
        this.saveMessage();
      } else if (val.name == "inputBlur") {
        this.inputBlur(val.value, val.id);
      } else if (val.name = "tableIndex") {
          console.log(val)
          if(val.id) {
            if (this.propsSms.ifSms == '') {
              this.propsSms.ifSms = {}
            }
            this.propsSms.ifSms.contentMag = val.document_text 
            this.propsSms.ifSms.id = val.id
            console.log(this.propsSms.ifSms)
          }
         
      }
    },
    inputBlur(val, id) {
      if (val == "") {
        this.$message("请您输入文案内容");
        return false;
      }
      let upDate = {
        cycle_id: this.ifDataExtension.period,
        brand_id: this.ifDataExtension.brand,
        document_text: val,
        id: id
      };
      this.$.post("template/update", upDate).then(res => {
        if (res.data.code == 200) {
          this.smsLists();
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "warning"
          });
        }
      });
    },
    saveMessage() {
      if(this.propsSms.sendSmsVal == '') {
        this.$message('请您选择短信渠道')
        return false
      }
      let sms_data = this.propsSms.sendSmsList.filter(item => item.channel_content == this.propsSms.sendSmsVal)
      let objData = {
        contentMag: this.propsSms.ifSms.contentMag, 
        sms_channel_id_show:this.propsSms.sendSmsVal,
        sms_channel_id: sms_data[0].id,
        id:this.propsSms.ifSms.id
      };
      if (this.propsSms.editMsg == "") {
        this.$message({
          showClose: true,
          message: "请您新建文案内容",
          type: "warning"
        });
        return false;
      }
      if (this.propsSms.dataSelected == 2) {
        let doc_text = this.propsSms.smsTable.filter(item => item.id == this.propsSms.ifSms.id)
        objData.contentMag = doc_text[0].document_text
        this.propsSms.ifSms = objData;
        this.openSmsContent = false;
        this.openSms = true;
        console.log( this.propsSms.ifSms)
      } else if (this.propsSms.dataSelected == 3) {
         if(!this.propsSms.editMsg) {
          this.$message('模板内容不可以为空')
          return false
        }
        let insertData = {
          cycle_id: this.ifDataExtension.period,
          brand_id: this.ifDataExtension.brand,
          document_text: this.propsSms.editMsg,
          uuid:(new Date()).valueOf()
        };
        this.$.post("template/insert", insertData).then(res => {
          if (res.data.code == 200) {
            this.smsLists();
            let objData = {
              contentMag: this.propsSms.editMsg,
              sms_channel_id_show:this.propsSms.sendSmsVal,
              sms_channel_id: sms_data[0].id,
              id:res.data.data
            };
            this.propsSms.ifSms = objData;
            console.log(this.propsSms.ifSms)
            this.openSmsContent = false;
            this.openSms = true;
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "warning"
            });
          }
        });
      }
    },
    dragInit() {
      console.log(1111)
      let minleft = $(".imaginary-circle").offset().left;
      let mintop = $(".imaginary-circle").offset().top;
      let maxleft = $(".imaginary-circle").width();
      let maxtop = $(".imaginary-circle").height();
      let that = this;
      $(".crowd-style").draggable({
        zIndex: 999,
        helper: "clone",
        scope: "dragflag",
        appendTo: "body",
        containment: "parent"
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
      let allconn = jsplumb.jsPlumb.getAllConnections();
      for (var i = 0; i < allconn.length + 1; i++) {
        jsplumb.jsPlumb.deleteConnection(allconn[0]);
      }
    },
    dargNext() {
      let that = this;
      $(".msg-style,.crowds-style").draggable({
        zIndex: 999,
        helper: "clone",
        scope: "dragflag",
        appendTo: "body",
        containment: "parent"
      });
      $(".marketing-drag").droppable({
        scope: "dragflag",
        drop: function(event, ui) {
          that.changedrag(ui);
        }
      });
    },
    changedrag(ui) {
      if (this.sortDrag == "") {
        let minleft = $(".imaginary-squares").offset().left;
        let mintop = $(".imaginary-squares").offset().top;
        let maxleft = $(".imaginary-squares").width();
        let maxtop = $(".imaginary-squares").height();
        if (ui.draggable[0]._prevClass == "msg-style") {
          if (this.sortDrag == "sms") {
            return;
          }
          if (
            minleft - 5 <= ui.offset.left &&
            ui.offset.left <= minleft + maxleft + 20 &&
            mintop - 5 <= ui.offset.top &&
            ui.offset.top < mintop + maxtop + 20
          ) {
            this.sortDrag = "sms";
            this.appendSms(ui.offset.left, this.dragTop);
          }
        } else {
          if (this.sortDrag == "pro") {
            return;
          }
          if (
            minleft - 5 <= ui.offset.left &&
            ui.offset.left <= minleft + maxleft + 20 &&
            mintop - 5 <= ui.offset.top &&
            ui.offset.top < mintop + maxtop + 20
          ) {
            this.sortDrag = "pro";
            this.appendSms1(ui.offset.left, this.dragTop);
          }
        }
      } else if (this.sortDrag == "sms") {
        if (ui.draggable[0]._prevClass == "msg-style") {
          return;
        } else {
          if (
            this.dragLeft + 15 <= ui.offset.left &&
            ui.offset.left <= this.dragLeft + 200 &&
            this.dragTop - 5 <= ui.offset.top &&
            ui.offset.top < this.dragTop + 50
          ) {
            this.appendPro(ui.offset.left, this.dragTop);
          }
        }
      } else if (this.sortDrag == "pro") {
        if (ui.draggable[0]._prevClass == "msg-style") {
          if (
            this.dragLeft + 185 <= ui.offset.left &&
            ui.offset.left <= this.dragLeft + 280 &&
            this.dragTop - 5 <= ui.offset.top &&
            ui.offset.top < this.dragTop + 50
          ) {
            this.appendPro1(ui.offset.left, this.dragTop);
          }
        } else {
          return;
        }
      }
    },
    dargNextNew() {
      let that = this;
      $(".crowds-style").draggable({
        zIndex: 999,
        helper: "clone",
        scope: "dragflag",
        appendTo: "body"
      });
      $(".marketing-drag").droppable({
        scope: "dragflag",
        drop: function(event, ui) {
          if (
            that.dragLeft + 15 <= ui.offset.left &&
            ui.offset.left <= that.dragLeft + 200 &&
            that.dragTop - 5 <= ui.offset.top &&
            ui.offset.top < that.dragTop + 50
          ) {
            that.appendPro(ui.offset.left, that.dragTop);
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
      background-color: #f3f2f2;
      border-radius: 10px 10px 0 0;
      .marketing-header-l {
        .l-icon {
          width: 40px;
          height: 40px;
          line-height: 40px;
          background-color: #fcb95b;
          border-radius: 5px;
          text-align: center;
          float: left;
          margin: 9px 10px 0px 0px;
          i {
            color: #fff;
            font-size: 20px;
          }
        }
        .l-tit {
          display: inline-block;
          margin-top: 5px;
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
        .ifColor {
          color: #409eff;
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


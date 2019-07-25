<template>
  <div class="activeDetail">
    <div class="marketing">
      <div class="marketing-header">
        <el-col :span="18" class="marketing-header-l">
          <span class="l-icon ml10">
            <i class="el-icon-location"></i>
          </span>
          <div class="l-tit">
            <div class="l-tit-t">
              <p>
                <a @click="goToHome()" style="cursor:pointer;">HomePage</a>
                <i>> Journey</i>
              </p>
              <p>{{this.userNameTie}}</p>
            </div>
          </div>
          <span class="l-status" v-if="this.taskStatusMsg">{{this.taskStatusMsg}}</span>
          <span class="l-status bgcYessow" v-if="this.couponCountMsg">Coupon Count：{{this.couponCountMsg}}</span>
          <span class="l-status bgcGree" v-if="this.sendCountMsg">Send Count：{{this.sendCountMsg}}</span>
        </el-col>
        <el-col :span="6" class="marketing-header-r">
          <el-button-group class="mr05">
            <el-button type="primary" class="pd-btn pd-back ifColor" v-if="this.detailUpdate == true" @click="detailStatus('update')">Update</el-button>
            <el-button type="primary" class="pd-btn pd-back" :class="{'ifColor':this.testDis == false}" v-if="this.detailTest == true" :disabled="testDis" @click="detailStatus('test')">Test</el-button>
            <el-button type="primary" class="pd-btn pd-back" :class="{'ifColor':this.runDis == false}" v-if="this.detailRun == true" :disabled="runDis" @click="detailStatus('run')">Run</el-button>
            <el-button type="primary" class="pd-btn pd-back ifColor" v-if="this.detailStop == true" @click="detailStatus('stop')">Stop</el-button>
            <el-button type="primary" class="pd-btn pd-back ifColor" v-if="this.detailOver == true">Completed</el-button>
          </el-button-group>
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
                  <li v-for="i in propsData.sourcesType" :key="i.id">
                    <span class="crowd-style">
                      <i class="icon-dbsshujukubeifenDBS-copy-copy-copy" v-if="i.command_name == 'CLV-Data'"></i>
                      <i class="icon-renqun1" v-if="i.command_name == 'DMP-Data'"></i>
                    </span>
                    <p>{{i.command_name}}</p>
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
          <div v-if = 'showFirst'>
            <div class="window" id="dataExtenIDOne" ref="refData1" v-if="ifDrag">
              <span class="crowd-style" @click="dataExtension()">
                <i class="icon-dbsshujukubeifenDBS-copy-copy-copy" v-if="this.propsData.defaultData.command_name == 'CLV-Data'"></i>
                <i class="icon-renqun1" v-if="this.propsData.defaultData.command_name == 'DMP-Data'"></i>
              </span>
            </div>
            <div ref="refData1div" v-if="ifDrag">{{this.propsData.defaultData.command_name}}</div>
            <div class="window" id="smsIDOne" ref="refData2" v-if="ifSmsDrag">
              <span class="msg-style" @click="sms()">
                <i class="icon-duanxin2-copy" style="font-size:32px;"></i>
              </span>
            </div>
            <div ref="refData2div" v-if="ifSmsDrag">SMS</div>
            <div class="window" id="timeIDOne" ref="refData3" v-if="ifSmsDrag">
              <span class="ctl-style" @click="selectTime()">
                <i class="icon-time1"></i>
              </span>
            </div>
            <div ref="refData3div" v-if="ifSmsDrag">Time</div>
            <div class="window" id="overIDOne" ref="refData4" v-if="ifSmsDrag">
              <span class="crowd-style">
                <i class="icon-wancheng1"></i>
              </span>
            </div>
            <div ref="refData4div" v-if="ifSmsDrag">Over</div>
          </div>
          <div v-else>
            <div class="window" id="dataExtenIDTwo" ref="refData1" v-if="ifDrag">
              <span class="crowd-style" @click="dataExtension()">
                <i class="icon-dbsshujukubeifenDBS-copy-copy-copy" v-if="this.propsData.defaultData.command_name == 'CLV-Data'"></i>
                <i class="icon-renqun1" v-if="this.propsData.defaultData.command_name == 'DMP-Data'"></i>
              </span>
            </div>
            <div ref="refData1div" v-if="ifDrag">{{this.propsData.defaultData.command_name}}</div>
            <div class="window" id="smsIDTwo" ref="refData2" v-if="ifSmsDrag">
              <span class="msg-style" @click="sms()">
                <i class="icon-duanxin2-copy" style="font-size:32px;"></i>
              </span>
            </div>
            <div ref="refData2div" v-if="ifSmsDrag">SMS</div>
            <div class="window" id="timeIDTwo" ref="refData3" v-if="ifSmsDrag">
              <span class="ctl-style" @click="selectTime()">
                <i class="icon-time1"></i>
              </span>
            </div>
            <div ref="refData3div" v-if="ifSmsDrag">Time</div>
            <div class="window" id="ticketIDTwo" ref="newData">
              <span class="crowds-style" @click="popupTicket()" style="background-color:#ffcd43;">
                <i class="icon-quanyi-copy-copy"></i>
              </span>
            </div>
            <div ref="newrefDatadiv">Coupon</div>
            <div class="window" id="overIDTwo" ref="refData4" v-if="ifSmsDrag">
              <span class="crowd-style">
                <i class="icon-wancheng1"></i>
              </span>
            </div>
            <div ref="refData4div" v-if="ifSmsDrag">Over</div>
          </div>
          
        </el-col>
      </div>
    </div>
    <popupDrag :openData ="openData"
        :propsData="propsData"
        :statusTestRunVal="statusTestRunVal"
        :openDataContent ="openDataContent"
        v-if="this.propsData.periodVal != ''"
        :ifDataExtension ="ifDataExtension"
        ref="popopenref"
        @backlevel ="backlevel"
        @searchDmpList="searchDmpList"
        @sltDataContent ="sltDataContent">
    </popupDrag>
    <smsPopup :openData ="openSms"
        :propsSms = "propsSms"
        :openDataContent ="openSmsContent"
        :statusTestRunVal="statusTestRunVal"
        @backlevelSms ="backlevelSms"
        @searchSmsList ="searchSmsList"
        @sltSmsContent ="sltSmsContent">
    </smsPopup>
    <popupTicket :openData="openTicket" 
      :propsTicket="propsTicket"
      :statusTestRunVal="statusTestRunVal"
      :openDataContent="openTicketContent"
      :ifTicket = "ifTicket"
      @searchDate = "searchDate"
      @backChange = "backChange"
      @ifCheckedVal = "ifCheckedVal"
      @PromotionLevel ="PromotionLevel">
    </popupTicket>
    <el-dialog
      :visible.sync="openTime"
      :close-on-click-modal="false"
      class="openTime"
      width="45%">
      <span slot="title" class="data-title">
        <span class="data-title-time"><i class="icon-time1"></i></span>Wait By Duration
      </span>
      <span slot="footer">
        <el-button @click="cancelTime()">Cancel</el-button>
        <el-button type="primary" @click="doneTime()">Done</el-button>
      </span>
      <popupOpenTime :timeType = "timeType" 
      :ifDisabled="ifDisabled" 
      :ifActiveDis="ifActiveDis"
      @timeCarryOnce="timeCarryOnce"></popupOpenTime>
    </el-dialog>
  </div>
</template>

<script>
import jsplumb from "jsplumb";
import $ from "jquery";
import "@/assets/css/part.less";
import smsPopup from "@/components/public/smsPopup.vue"
import popupTicket from "./module/popupTicket.vue"
import popupOpenTime from "@/components/public/popupOpenTime.vue"
import popupDrag from "./module/popupDrag.vue"
import { constants, truncate } from 'fs';
export default {
  data() {
    return {
      detailUpdate:true,
      detailTest:true,
      detailRun:true,
      detailStop:false,
      detailOver:false,
      ifDrag: true,
      ifSmsDrag: true,
      openData:false,
      openSms:false,
      openTicket:false,
      openTicketContent:false,
      openDataContent:false,
      openSmsContent:false,
      openTime:false,
      testDis:false,
      runDis:false,
      propsData:{
          brandList: [],
          periodList: [],
          registerList: [],
          sourcesType:[],
          dmpTable:[],
          brandVal: '',
          brandId: '',
          periodVal:'',
          periodShow: '',
          brandShow:'', 
          registerVal:[],
          newPeriod:'',
          newBuy:'',
          newMbmber:'',
          SearchDmp:'',
          defaultData:'',
          shoppings:'',
          regBrandVal:null,
          crowdCountIcon:false,
          crowdDmp:''
      },
      propsSms:{
        smsTable:[],
        sendSmsList:[],
        SearchSms: '',
        sendSmsVal:'',
        editMsg:'',
        ifShowInput:false,
        tableSelectVal:'',
        dataSelected: 2,
        ifSms:'',
        ifSmsDmp:'',
        editTitleVal:"",
        couponShow:false
      },
      timeType:{
        timeVal:'Days',
        dateTimeVal:'',
        executeType:'',
        timestamp:'',
        timestampEnd:'',
        dateEndVal:'',
        timeTypeData:'',
        time:[
          {
            id:1,
            value:"Days"
          },
          {
            id:3,
            value:"Weeks"
          },
          {
            id:2,
            value:"Months"
          },
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
      propsTicket:{
        SearchSales:'',
        checkedActive:'',
        checkedDiscounts:'',
        salesTable:[]
      },
      ifDataExtension:'',
      ifTicket:'',
      couponName:'',
      cron_express:'',
      dayVal:'',
      datedrag: 2,
      showFirst: true,
      statusTestRunVal:'',
      userNameTie:'',
      ifDisabled:false,
      ifActiveDis:false,
      getSaveDataDetail:'',
      taskStatusMsg:'',
      couponCountMsg:'',
      sendCountMsg:'',
      warnTips:""
    };
  },
  components: {
    popupDrag,
    smsPopup,
    popupOpenTime,
    popupTicket
  },
  created() {
    this.activeMessage()
    this.brandLists()
    this.periodLists()
    this.registerLists()
    this.sendSmsLists()
    this.sourcesList()
    this.dmpTables()
    this.taskStatus()
    this.jobRecord()
  },
  methods: {
    goToHome() {
      if(this.warnTips == 1) {
        this.$confirm('Journey Builder未保存,是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('./')
        }).catch(() => {
            return false       
        })
      }else{
        this.$router.push('./')
      }
    },
    doneTime() {
      let datas = {
        loopType: this.timeType.timeVal,
        wloopValue: this.timeType.timeWeek,
        mloopValue: this.timeType.timeMonths,
        effectTime: this.timeType.timePicker
      }
      this.dateChangeCron(datas)
      this.cron_express = this.dateChangeCron(datas)
      if(this.timeType.executeType == 1) {
        if(this.timeType.dateTimeVal == '') {
          this.$message("请您完善时间信息");
        }
        this.cron_express = ''
      }else if(this.timeType.executeType == 2){
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
        if(this.timeType.dateTimeVal == '' || this.timeType.dateTimeVal == null ||
          this.timeType.dateEndVal == '' || this.timeType.dateEndVal == null) {
            this.$message("请您完善时间信息");
            return false
        }
        if(new Date(this.timeType.dateTimeVal).getTime()  >= new Date(this.timeType.dateEndVal).getTime()) {
          this.$message('结束时间必须大于开始时间')
          return false
        }
      }
      let objData = {
        cron_express:this.cron_express,
        schulder_time:this.timeType.dateTimeVal,
        retired_time:this.timeType.dateEndVal,
        periodData:datas
      }
      this.timeType.timeTypeData = objData
      if(this.timeType.timeTypeData.cron_express != this.getSaveDataDetail.saveDataDetail.cron_express ||
        parseInt(new Date(this.timeType.timeTypeData.schulder_time).getTime()) != parseInt(new Date(this.getSaveDataDetail.saveDataDetail.schulder_time).getTime()) ||
        parseInt(new Date(this.timeType.timeTypeData.retired_time).getTime()) != parseInt(new Date(this.getSaveDataDetail.saveDataDetail.retired_time).getTime())) {
          this.testDis = true
          this.runDis = true
      }
      this.openTime = false
      this.warnTips = 1
    },
    jobRecord() {
      this.$.get("jobRecord/getLast?ruleId="+this.$route.query.id).then(res=>{
        this.couponCountMsg = res.data.data.coupon_count
        this.sendCountMsg = res.data.data.send_count
      })
    },
    cancelTime() {
      this.timeType.dateTimeVal = this.timeType.timeTypeData.schulder_time
      this.timeType.dateEndVal = this.timeType.timeTypeData.retired_time
      if(this.timeType.timeTypeData.cron_express) {
        this.timeType.timeVal = this.timeType.timeTypeData.periodData.loopType
        this.timeType.timeWeek = this.timeType.timeTypeData.periodData.wloopValue
        this.timeType.timeMonths = this.timeType.timeTypeData.periodData.mloopValue
        this.timeType.timePicker = this.timeType.timeTypeData.periodData.effectTime
      }else{
        this.timeType.timeVal = 'Days'
        this.timeType.timeWeek = ''
        this.timeType.timeMonths = ''
        this.timeType.timePicker = ''
      }
      this.openTime = false
    },
    dragInit1(top, left) {
      this.$nextTick(() => {
        this.$refs.refData1.style.position = "absolute";
        this.$refs.refData1.style.top = top + "px";
        this.$refs.refData1.style.left = left + "px";
        this.$refs.refData1div.style.position = "absolute";
        this.$refs.refData1div.style.top = top + 50 + "px";
        this.$refs.refData1div.style.left = left + -5 + "px";

        this.$refs.refData2.style.position = "absolute";
        this.$refs.refData2.style.top = top + "px";
        this.$refs.refData2.style.left = left + 150 + "px";
        this.$refs.refData2div.style.position = "absolute";
        this.$refs.refData2div.style.top = top + 50 + "px";
        this.$refs.refData2div.style.left = left + 155 + "px";

        this.$refs.refData3.style.position = "absolute";
        this.$refs.refData3.style.top = top + "px";
        this.$refs.refData3.style.left = left + 300 + "px";
        this.$refs.refData3div.style.position = "absolute";
        this.$refs.refData3div.style.top = top + 50 + "px";
        this.$refs.refData3div.style.left = left + 300 + 5 + "px";

        this.$refs.refData4.style.position = "absolute";
        this.$refs.refData4.style.top = top + "px";
        this.$refs.refData4.style.left = left + 450 + "px";
        this.$refs.refData4div.style.position = "absolute";
        this.$refs.refData4div.style.top = top + 50 + "px";
        this.$refs.refData4div.style.left = left + 450 + 5 + "px";
        let allconn = jsplumb.jsPlumb.getAllConnections();
        for (var i = 0; i < allconn.length + 1; i++) {
          jsplumb.jsPlumb.deleteConnection(allconn[0]);
        }
        jsplumb.jsPlumb.deleteConnection(allconn[0]);
        this.jsPlumb("dataExtenIDOne", "smsIDOne");
        this.jsPlumb("smsIDOne", "timeIDOne");
        this.jsPlumb("timeIDOne", "overIDOne");
        if(!((this.statusTestRunVal == 2) || (this.statusTestRunVal==4))) {
          this.dragInit()
        }
      });
    },
    dragInit2(top, left) {
      this.showFirst = false
      this.$nextTick(() => {
        this.$refs.refData1.style.position = "absolute";
        this.$refs.refData1.style.top = top + "px";
        this.$refs.refData1.style.left = left + "px";
        this.$refs.refData1div.style.position = "absolute";
        this.$refs.refData1div.style.top = top + 50 + "px";
        this.$refs.refData1div.style.left = left + -5 + "px";

        this.$refs.newData.style.position = "absolute";
        this.$refs.newData.style.top = top + "px";
        this.$refs.newData.style.left = left + 150 + "px";
        this.$refs.newrefDatadiv.style.position = "absolute";
        this.$refs.newrefDatadiv.style.top = top + 50 + "px";
        this.$refs.newrefDatadiv.style.left = left + 147 + "px";

        this.$refs.refData2.style.position = "absolute";
        this.$refs.refData2.style.top = top + "px";
        this.$refs.refData2.style.left = left + 300 + "px";
        this.$refs.refData2div.style.position = "absolute";
        this.$refs.refData2div.style.top = top + 50 + "px";
        this.$refs.refData2div.style.left = left + 305 + "px";

        this.$refs.refData3.style.position = "absolute";
        this.$refs.refData3.style.top = top + "px";
        this.$refs.refData3.style.left = left + 450 + "px";
        this.$refs.refData3div.style.position = "absolute";
        this.$refs.refData3div.style.top = top + 50 + "px";
        this.$refs.refData3div.style.left = left + 450 + 5 + "px";

        this.$refs.refData4.style.position = "absolute";
        this.$refs.refData4.style.top = top + "px";
        this.$refs.refData4.style.left = left + 600 + "px";
        this.$refs.refData4div.style.position = "absolute";
        this.$refs.refData4div.style.top = top + 50 + "px";
        this.$refs.refData4div.style.left = left + 600 + 5 + "px";
        let allconn = jsplumb.jsPlumb.getAllConnections();
        for (var i = 0; i < allconn.length + 1; i++) {
          jsplumb.jsPlumb.deleteConnection(allconn[0]);
        }
        jsplumb.jsPlumb.deleteConnection(allconn[0]);
        this.jsPlumb("dataExtenIDTwo", "ticketIDTwo");
        this.jsPlumb("ticketIDTwo", "smsIDTwo");
        this.jsPlumb("smsIDTwo", "timeIDTwo");
        this.jsPlumb("timeIDTwo", "overIDTwo");
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
          paintStyle: { stroke: 'lightgray', strokeWidth: 3 },
          elementsDraggable: false,
          ConnectionsDetachable: false,
          // overlays: [
          //   ["Arrow", { width: 10, length: 10, location: 1, id: "arrow" }],
          //   ["Label", { label: "", id: "label" }]
          // ]
        });
      });
    },
    // 拖拽
    dragInit() {
      let that = this;
      $(".crowds-style").draggable({
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
            350 <= ui.offset.left &&
            ui.offset.left <= 450 &&
            180 <= ui.offset.top &&
            ui.offset.top < 230
          ) {
            that.showFirst = true
            that.propsSms.couponShow = true
            that.dragInit2(200, 320);
            that.$message('journey有变动，请检查数据')
          }
        }
      });
    },
    taskStatus() {
      this.$.get("rule/getTaskStatus?id="+this.$route.query.id).then(res=>{
        this.taskStatusMsg = res.data.data
      })
    },
    popupTicket() {
      if(this.ifTicket.camp_coupon_id || this.ifTicket.coupon_id) {
        this.openTicket = true
      }else{
        this.openTicketContent = true
      }
      this.discountLists()
    },
    detailStatus(val) {
      let timestamp = new Date(this.timeType.dateTimeVal)
      this.timeType.timestamp  = timestamp.getFullYear() + '-' + (timestamp.getMonth() + 1) + '-' + timestamp.getDate() + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds()
      if(val == 'update') {
        let getSessionItem = JSON.parse(sessionStorage.getItem("user"));
        let temp_id = this.propsSms.smsTable.filter(item => item.document_text == this.propsSms.ifSms.template_text)
        let temp_data_id = ''
        if (temp_id.length == 0) {
          temp_data_id = this.propsSms.ifSms.template_id
        } else {
          temp_data_id = temp_id[0].id
        }
        if(this.timeType.dateEndVal && this.timeType.executeType == 2) {
          let timestampEnd = new Date(this.timeType.dateEndVal)
          this.timeType.timestampEnd = timestampEnd.getFullYear() + '-' + (timestampEnd.getMonth() + 1) + '-' + timestampEnd.getDate() + ' ' + timestampEnd.getHours() + ':' + timestampEnd.getMinutes() + ':' + timestampEnd.getSeconds()
        }else{
          this.timeType.dateEndVal = ''
          this.timeType.timestampEnd = ''
        }
        let data = {
          id:this.$route.query.id,
          rule_name:this.userNameTie,
          sms_channel_id:this.propsSms.ifSms.sms_channel_id,
          template_id:temp_data_id,
          brand_id:this.ifDataExtension.brand_id,
          vip_channel_name:this.ifDataExtension.vip_channel_name || '',
          schulder_time:this.timeType.timestamp,
          camp_coupon_id:this.ifTicket.camp_coupon_id || '',
          coupon_id:this.ifTicket.coupon_id || '',
          enter_first:this.ifDataExtension.enter_first || '',
          purchase_first:this.ifDataExtension.purchase_first || '',
          purchase_week:this.ifDataExtension.purchase_week || '',
          cron_express:this.cron_express,
          command_name:this.propsData.defaultData.command_name,
          command_code:this.propsData.defaultData.command_code,
          created_by:getSessionItem.user_info,
          excluded_guide:this.ifDataExtension.excluded_guide || ''
        }
        if(this.timeType.timestampEnd) {
          data.retired_time = this.timeType.timestampEnd
        }
        if(this.propsData.defaultData.command_name == 'DMP-Data') {
          data.crowd_id = this.ifDataExtension.crowd_id
          data.crowd_name = this.ifDataExtension.crowd_name
        }
        if(this.ifDataExtension.crowd_count != "人群数量计算中" && this.ifDataExtension.crowd_count != "人群数量计算失败") {
          data.crowd_count = this.ifDataExtension.crowd_count
        }
        if(this.ifDataExtension.reg_brand_id != null ) {
          data.reg_brand_id = this.ifDataExtension.reg_brand_id
        }
        if(this.ifDataExtension.cycle_id) {
          data.cycle_id = this.ifDataExtension.cycle_id
        }
        this.$.post('rule/update',data).then(res=>{
          if(res.data.code == 200) {
            this.warnTips = 2
            this.testDis = false
            this.$message(res.data.msg)
            sessionStorage.setItem("saveDataDetail", JSON.stringify(data))
          }else{
            this.$message(res.data.msg)
          }
        })
      }else{
        if(val == "test") {
          this.statusTestRunVal = 1
        }else if(val == "run") {
          this.statusTestRunVal = 2
        }else if(val == "stop") {
          this.statusTestRunVal = 3
        }
        this.$.get("rule/updateStatus",{params: { id: this.$route.query.id, status: this.statusTestRunVal }}).then(res=>{
          if(res.data.code == 200) {
            if(this.statusTestRunVal == 1 || this.statusTestRunVal == 2) {
              this.$message('Processing')
              this.taskStatus()
            }
            if(this.statusTestRunVal == 3) {
              this.$message('Stop')
              this.detailUpdate = true
              this.detailRun = true
              this.detailTest = true
              this.detailStop = false
            }else if(this.statusTestRunVal == 2){
              this.detailUpdate = false
              this.detailRun = false
              this.detailTest = false
              this.detailStop = true
              this.jobRecord()
              this.$confirm("您已经成功执行此操作,是否跳转到首页?", "提示", {
              confirmButtonText: "是",
              cancelButtonText: "否"
              }).then(() => {
                this.$router.push("./");
              });
            }else if(this.statusTestRunVal == 1) {
              this.runDis = false
            }
          }else{
            this.$message(res.data.msg)
          }
        })
      }
    },
    activeMessage() {
      this.$.get('rule/getDetail?id='+this.$route.query.id).then(res=>{
        if(res.data.code == 200) {
          this.ifDataExtension = res.data.data
          this.propsSms.ifSms = res.data.data
          this.ifTicket = res.data.data
          this.timeType.timeTypeData = res.data.data
          this.propsData.defaultData = res.data.data
          this.userNameTie = res.data.data.rule_name
          this.propsData.brandVal = this.ifDataExtension.brand_name
          this.propsData.regBrandVal = this.ifDataExtension.reg_brand_name
          this.propsData.periodVal = this.ifDataExtension.cycle_type
          this.propsSms.sendSmsVal =  this.propsSms.ifSms.sms_channel_content
          let saveDataDetail = {
            saveDataDetail:this.propsData.defaultData
          }
          sessionStorage.setItem("saveDataDetail", JSON.stringify(saveDataDetail));
          this.getSaveDataDetail = JSON.parse(sessionStorage.getItem("saveDataDetail"))
          if(res.data.data.camp_coupon_id || res.data.data.coupon_id) {
            this.showFirst = true
            this.propsSms.couponShow = true
            this.dragInit2(200, 320);
          }else{
            this.showFirst = true
            this.propsSms.couponShow = false
            this.dragInit1(200, 320);
          }
          this.statusTestRunVal = res.data.data.status
          if(res.data.data.status == 2) {
            this.detailStop = true
            this.detailUpdate = false
            this.detailTest = false
            this.detailRun = false
          }
          this.cron_express = res.data.data.cron_express
          if(res.data.data.cron_express == '') {
            this.timeType.executeType = 1
            this.ifDisabled = true
          }else{
            this.timeType.executeType = 2
            this.ifDisabled = false
          }
          let timestamp = new Date(res.data.data.schulder_time)
          if(res.data.data.retired_time === null) {
            this.timeType.dateEndVal = ''
          }else{
            let timestampEnd = new Date(res.data.data.retired_time)
            this.timeType.dateEndVal = timestampEnd.getFullYear() + '-' + (timestampEnd.getMonth() + 1) + '-' + timestampEnd.getDate() + ' ' + timestampEnd.getHours() + ':' + timestampEnd.getMinutes() + ':' + timestampEnd.getSeconds()
          }
          this.timeType.dateTimeVal  = timestamp.getFullYear() + '-' + (timestamp.getMonth() + 1) + '-' + timestamp.getDate() + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds()
          if(this.ifDataExtension.vip_channel_name.length > 0) {
            this.propsData.registerVal = this.ifDataExtension.vip_channel_name.split(',')
          }
          this.propsData.newBuy = this.ifDataExtension.purchase_first
          this.propsData.newPeriod = this.ifDataExtension.enter_first
          this.propsData.newMbmber = this.ifDataExtension.purchase_week
          this.propsData.shoppings = this.ifDataExtension.excluded_guide
          if (res.data.data.cron_express) {
            this.cronChangeDate(res.data.data)
            this.timeType.timeVal = this.cronChangeDate(res.data.data).loopType
            let dayVal = this.cronChangeDate(res.data.data).loopTime.split(':')
            this.timeType.timePicker = new Date(0,0,0,dayVal[0],dayVal[1])
            let timeMonths = this.cronChangeDate(res.data.data).loopValue
            let date_new = new Date()
            this.timeType.timeMonths = new Date(date_new.getFullYear(),date_new.getMonth(),timeMonths)
            this.timeType.timeWeek = this.cronChangeDate(res.data.data).loopValue
            this.timeType.timeTypeData.periodData={
              loopType: this.timeType.timeVal,
              wloopValue: this.timeType.timeWeek,
              mloopValue: this.timeType.timeMonths,
              effectTime: this.timeType.timePicker
            }
          }
          if(res.data.data.status == '4') {
            this.detailUpdate = false
            this.detailTest = false
            this.detailRun = false
            this.detailStop = false
            this.detailOver = true
            this.statusTestRunVal = 4
          }
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    // 调度命令
    sourcesList() {
      this.$.get('command/getList?commandName=').then(res=>{
        if(res.data.code=200) {
          this.propsData.sourcesType = res.data.data
        }
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
    dmpTables() {
      this.$.get("crowd/getCrowdList",{params:{crowdName:this.propsData.SearchDmp}}).then(res=>{
        this.propsData.dmpTable = res.data.data
      })
    },
    // dmp
    searchDmpList(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.dmpTables();
      }
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
        this.propsSms.sendSmsList = res.data.data
      })
    },
    searchDate(e) {
      var keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){
        this.couponName= this.propsTicket.SearchSales
        this.discountLists()
      }
    },
    discountLists() {
      this.$.get("coupon/getCouponList",{params:{couponName:this.couponName,brandName:this.ifDataExtension.brand_name}}).then(res=>{
        if(res.data.code == 200) {
          this.propsTicket.salesTable = res.data.data
        }
      })
    },
    sltDataContent(val) {
      this.openData = false
      if (val == 'close1') {
        this.openDataContent = false
      } else if (val == 'openNext') {
        this.openDataContent = true
      }else if(val.DmpName == 'dmpTableIndex') {
        if(!val.id) {
          return false
        }
        this.propsData.crowdDmp = {}
        this.propsData.crowdDmp.crowd_id = val.id
        this.propsData.crowdDmp.crowd_name = val.name
        this.propsData.crowdDmp.crowd_count = val.crowd_count
      }else if(val.name == 'Y' || val.name == 'N') {
        switch (val.elRadioModel) {
          case 'newPeriod':
            val.name === this.propsData.newPeriod ? this.propsData.newPeriod = '' : this.propsData.newPeriod = val.name
            break;
          case 'newBuy':
            val.name === this.propsData.newBuy ? this.propsData.newBuy = '' : this.propsData.newBuy = val.name
            break; 
          case 'newMbmber':
            val.name === this.propsData.newMbmber ? this.propsData.newMbmber = '' : this.propsData.newMbmber = val.name
            break;
          default: 
            val.name === this.propsData.shoppings ? this.propsData.shoppings = '' : this.propsData.shoppings = val.name            
            break;
        } 
      }
    },
    backlevel(val) {
      switch (val) {
        case 1:
          this.openDataContent = false
          this.openData = true
        break;
        case 2:
          this.dataSummary()
        break; 
        case 'edit':
          this.openDataContent = true
          this.openData = false
        break;
        case 'cancel': 
          this.openDataContent = false
          this.propsData.brandVal = this.ifDataExtension.brand_name
          this.propsData.periodVal = this.ifDataExtension.cycle_type
          if(this.propsData.registerVal.length == 0) {
            this.propsData.registerVal = this.ifDataExtension.vip_channel_name.split(",")
          }
          this.propsData.regBrandVal = this.ifDataExtension.reg_brand_name
          this.propsData.newPeriod = this.ifDataExtension.enter_first
          this.propsData.newBuy = this.ifDataExtension.purchase_first
          this.propsData.newMbmber = this.ifDataExtension.purchase_week
          this.propsData.shoppings = this.ifDataExtension.excluded_guide
        break;
      } 
    },
    backChange(val) {
      this.openTicket = false
      if(val == 'openNext') {
        this.openTicketContent = true
      }else if(val == 'close1') {
        this.openTicketContent = false
      }
    },
    PromotionLevel(val) {
      if(val == 1) {
        if(this.ifTicket.camp_coupon_id|| this.ifTicket.coupon_id) {
          this.openTicketContent = false
          this.openTicket = true
        }else{
          this.openTicketContent = false
        }
      }else if(val == 2){
        this.promotionSummary()
      }else if(val == 'edit') {
        this.openTicketContent = true
        this.openTicket = false
      }
    },
    promotionSummary() {
      let obj = {
        camp_coupon_id:this.popupTicket.checkedActive,
        coupon_id:this.popupTicket.checkedDiscounts
      }
      this.ifTicket = obj
      if(this.ifTicket.camp_coupon_id != this.getSaveDataDetail.saveDataDetail.camp_coupon_id ||
        this.ifTicket.coupon_id != this.getSaveDataDetail.saveDataDetail.coupon_id) {
          this.testDis = true
          this.runDis = true
      }
      this.openTicket = true
      this.openTicketContent = false
      this.warnTips = 1
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
      this.popupTicket.checkedActive = activeData
      this.popupTicket.checkedDiscounts = discountsData
    },
    dataSummary() {
      let item_data = this.propsData.brandList.filter(item => item.brand_name == this.propsData.brandVal)
      if(this.propsData.defaultData.command_name == 'CLV-Data') {
        let reVal = this.propsData.registerVal.join(',')
        let item2_data = this.propsData.periodList.filter(item => item.cycle_type == this.propsData.periodVal)
        let regBrand = this.propsData.brandList.filter(item => item.brand_name == this.propsData.regBrandVal)
        let objData = {
          brand_id:item_data[0].id,
          cycle_id:item2_data[0].id,
          vip_channel_name:reVal,
          brand_name:this.propsData.brandVal,
          cycle_type:this.propsData.periodVal,
          enter_first:this.propsData.newPeriod,
          purchase_first:this.propsData.newBuy,
          purchase_week:this.propsData.newMbmber,
          excluded_guide:this.propsData.shoppings,
          reg_brand_name:this.propsData.regBrandVal,
          crowd_count:''
        }
        this.ifDataExtension = objData
        if(this.propsData.regBrandVal != null && this.propsData.regBrandVal != '' && regBrand != []) {
          this.ifDataExtension.reg_brand_id = regBrand[0].id
        }
        this.clvCrowdCount()
        return false
      }else if(this.propsData.defaultData.command_name == 'DMP-Data') {
        if(this.propsData.crowdDmp == '') {
          this.propsData.crowdDmp = {}
          this.propsData.crowdDmp.crowd_id = this.ifDataExtension.crowd_id
          this.propsData.crowdDmp.crowd_name = this.ifDataExtension.crowd_name
          this.propsData.crowdDmp.crowd_count = this.ifDataExtension.crowd_count
        }
        let objDataDmp = {
          brand_id:item_data[0].id,
          brand_name:this.propsData.brandVal,
          crowd_id:this.propsData.crowdDmp.crowd_id,
          crowd_name:this.propsData.crowdDmp.crowd_name,
          crowd_count:this.propsData.crowdDmp.crowd_count
        }
        this.ifDataExtension = objDataDmp
      }
      if(this.ifDataExtension.crowd_name == undefined) {
        this.ifDataExtension.crowd_name = ''
      }
      if(this.ifDataExtension.brand_id != this.getSaveDataDetail.saveDataDetail.brand_id || 
        this.ifDataExtension.vip_channel_name != this.getSaveDataDetail.saveDataDetail.vip_channel_name ||
        this.ifDataExtension.crowd_name != this.getSaveDataDetail.saveDataDetail.crowd_name ||
        this.ifDataExtension.cycle_id != this.getSaveDataDetail.saveDataDetail.cycle_id ||
        this.ifDataExtension.enter_first != this.getSaveDataDetail.saveDataDetail.enter_first ||
        this.ifDataExtension.purchase_first != this.getSaveDataDetail.saveDataDetail.purchase_first ||
        this.ifDataExtension.purchase_week != this.getSaveDataDetail.saveDataDetail.purchase_week ||
        this.ifDataExtension.reg_brand_id != this.getSaveDataDetail.saveDataDetail.reg_brand_id ||
        this.ifDataExtension.excluded_guide != this.getSaveDataDetail.saveDataDetail.excluded_guide){
          this.testDis = true
          this.runDis = true
      }
      this.openDataContent = false
      this.openData = true
      this.warnTips = 1
    },
    clvCrowdCount() {
      this.$alert('人群将会重新计算，请不要频繁操作', '提示', {
        confirmButtonText: '确定',
        showClose:false,
        callback: action => {
          let getSessionItem = JSON.parse(sessionStorage.getItem("user"));
          let data = {
            id:this.$route.query.id,
            rule_name: this.userNameTie,
            brand_id: this.ifDataExtension.brand_id,
            cycle_id: this.ifDataExtension.cycle_id,
            vip_channel_name: this.ifDataExtension.vip_channel_name,
            enter_first: this.ifDataExtension.enter_first,
            purchase_week: this.ifDataExtension.purchase_week,
            purchase_first: this.ifDataExtension.purchase_first,
            excluded_guide:this.ifDataExtension.excluded_guide,
            command_code:this.propsData.defaultData.command_code,
            command_name:this.propsData.defaultData.command_name,
            created_by:getSessionItem.user_info
          };
          if(this.ifDataExtension.reg_brand_id != null ) {
            data.reg_brand_id = this.ifDataExtension.reg_brand_id
          }
          if(this.ifDataExtension.crowd_count != "人群数量计算中" && this.ifDataExtension.crowd_count != "人群数量计算失败") {
            data.crowd_count = this.ifDataExtension.crowd_count
          }
          this.$.post("rule/update",data).then(res=>{
            if(res.data.code == 200) {
              this.getCrowdCount()
            }else{
              this.$message(res.data.msg)
            }
          })
          this.openDataContent = false
          this.openData = true
        }
      })
    },
    getCrowdCount() {
      this.$.get('rule/getCrowdCount?id='+this.$route.query.id).then(res=>{
        if(res.data.code == 200) {
          if(res.data.data == -1) {
            this.propsData.crowdCountIcon = true
            this.ifDataExtension.crowd_count = '人群数量计算中'
            setTimeout(() => {
              this.getCrowdCount()
            }, 10000)
          }else if(res.data.data == 0){
            this.propsData.crowdCountIcon = false
            this.ifDataExtension.crowd_count = '人群数量计算失败'
          }else{
            this.propsData.crowdCountIcon = false
            this.ifDataExtension.crowd_count = res.data.data
          }
        }else{
          this.$message(res.data.data)
        }
      })
    },
    backlevelSms() {
      this.propsSms.dataSelected = 2
      if(this.propsSms.ifSms.template_text == null && this.propsSms.ifSms.sms_channel_content == null) {
        this.openSmsContent = false
      }else{
        this.openSmsContent = false
        this.openSms = true
      }
    },
    smsLists() {
      this.$.get("template/getTemplate",{params:{brandId:this.ifDataExtension.brand_id,templateName:this.propsSms.SearchSms}}).then(res=>{
        if(res.data.code == 200) {
          this.propsSms.smsTable = res.data.data
          this.propsSms.editMsg = res.data.data.document_text
        }else{
          this.propsSms.smsTable = []
        }
      })
    },
    searchSmsList(e) {
      var keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){
        this.smsLists()
      }
    },
    sltSmsContent(val) {
      this.openSms = false
      switch (val.name) {
        case "close1":
          this.openSmsContent = false;          
        break;
        case "openNext":
          this.openSmsContent = true;
          this.propsSms.editTitleVal = ''
          this.propsSms.editMsg = ''
          this.propsSms.dataSelected = 2
        break; 
        case 'saveMsg':
          if (this.propsSms.ifSmsDmp == '') {
            this.propsSms.ifSmsDmp = {}
            this.propsSms.ifSmsDmp.template_text = this.propsSms.ifSms.template_text,
            this.propsSms.ifSmsDmp.template_id = this.propsSms.ifSms.template_id
          }
          this.saveMessage()
        break;
        case 'inputBlur': 
          this.inputBlur(val.value,val.id,val.templt)
        break;
        case 'tableIndex': 
          if(val.id) {
            this.propsSms.ifSmsDmp = {}
            this.propsSms.ifSmsDmp.template_text = val.document_text
            this.propsSms.ifSmsDmp.template_id = val.id
          }
        break;
        case 'cancel': 
          this.openSmsContent = false
          if(!this.propsSms.ifSms) {
             this.propsSms.sendSmsVal = ''
          }else{
            this.propsSms.sendSmsVal = this.propsSms.ifSms.sms_channel_content
          }
        break;
        case 'deleteIndex':
          this.$.get("template/delete?id="+val.row.id).then(res=>{
            if(res.data.code == 200) {
              this.smsLists()
            }
          })
        break;
      } 
    },
    inputBlur(val,id,templt) {
        if(val == '') {
          this.$message('文案不可以为空')
          return false
        }
        let upDate = {
          brand_id:this.ifDataExtension.brand_id,
          template_name:templt,
          document_text:val,
          id:id
        }
        this.$.post("template/update",upDate).then(res=>{
          if(res.data.code == 200) {
            this.$message(res.data.msg)
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
      if(this.propsSms.sendSmsVal == null || this.propsSms.sendSmsVal == '') {
        this.$message('请选择短信渠道')
        return false
      }
      let smsObj = this.propsSms.sendSmsList.filter(item => item.channel_content == this.propsSms.sendSmsVal)
      let reg = ""
      if(this.propsSms.dataSelected == 2) {
        if(this.propsSms.ifSmsDmp.template_id == 0) {
          this.$message('请选择短信内容')
          return false
        }
        let objDataTwo = {
          template_text:this.propsSms.ifSmsDmp.template_text,
          sms_channel_content:this.propsSms.sendSmsVal,
          sms_channel_id:smsObj[0].id,
          template_id:this.propsSms.ifSmsDmp.template_id
        }
        this.propsSms.ifSms = objDataTwo
      }else if(this.propsSms.dataSelected == 3){
        if(!this.propsSms.editTitleVal) {
          this.$message('请输入title')
          return false
        }
        if(!this.propsSms.editMsg) {
          this.$message('模板内容不可以为空')
          return false
        }
      }
      this.propsSms.dataSelected == 3 ? reg = this.propsSms.editMsg:reg = this.propsSms.ifSms.template_text
      if(reg.indexOf(" $XXX$ ")==-1 && this.propsSms.couponShow == true) {
        this.$message('模板内容必须包含 $XXX$ ')
        return false
      }else if(reg.indexOf(" $XXX$ ")!=-1 && this.propsSms.couponShow == false) {
        this.$confirm('文案内容中含有 $XXX$ 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.propsSms.dataSelected == 3 ? this.smsCreatedMessage():(this.openSmsContent = false,this.openSms = true)
        }).catch(() => {
          return false
        })
        return false
      }
      this.propsSms.dataSelected == 3 ? this.smsCreatedMessage():(this.openSmsContent = false,this.openSms = true)
      if(this.propsSms.ifSms.template_id != this.getSaveDataDetail.saveDataDetail.template_id || 
        this.propsSms.ifSms.sms_channel_id != this.getSaveDataDetail.saveDataDetail.sms_channel_id) {
          this.testDis = true
          this.runDis = true
      }
      this.warnTips = 1
    },
    smsCreatedMessage() {
      let getSessionItem = JSON.parse(sessionStorage.getItem("user"));
      let smsObj = this.propsSms.sendSmsList.filter(item => item.channel_content == this.propsSms.sendSmsVal)
      let insertData = {
        brand_id:this.ifDataExtension.brand_id,
        template_name:this.propsSms.editTitleVal,
        document_text:this.propsSms.editMsg,
        uuid:(new Date()).valueOf(),
        created_by:getSessionItem.user_info
      }
      this.$.post("template/insert",insertData).then(res=>{
        if(res.data.code == 200) {
          this.$message('SMS Created')
          this.smsLists()
          let objData = {
            template_text:this.propsSms.editMsg,
            sms_channel_id: smsObj[0].id,
            sms_channel_content:this.propsSms.sendSmsVal,
            template_id:res.data.data
          }
          this.propsSms.ifSms = objData
          this.openSmsContent = false
          this.openSms = true
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    dataExtension() {
      this.openData = true
    },
    sms() {
      this.smsLists();
      this.propsSms.dataSelected = 2
      this.propsSms.editTitleVal = ''
      this.propsSms.editMsg = ''
      if(this.propsSms.ifSms.template_text == null && this.propsSms.ifSms.sms_channel_content == null) {
        this.openSmsContent = true
      }else{
        this.openSms = true
      }
    },
    selectTime() {
      this.openTime = true
      if(this.statusTestRunVal == 2 || this.statusTestRunVal == 4) {
        this.ifDisabled = true
        this.ifActiveDis = true
      }else{
        this.ifActiveDis = false
        this.timeCarryOnce(this.timeType.executeType)
      }
    },
    timeCarryOnce(val) {
      if(val != '') {
        if(val == 1) {
          this.ifDisabled = true
        }else{
          this.ifDisabled = false
        }
      }
    },
  },
  beforeRouteLeave (to,from,next) {
    let allconn = jsplumb.jsPlumb.getAllConnections()
    for (var i = 0; i < allconn.length + 1; i++) {
    jsplumb.jsPlumb.deleteConnection(allconn[0])
    }
    jsplumb.jsPlumb.deleteConnection(allconn[0])
    next()
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
          float: left;
          margin-top: 9px;
          margin-right: 5px;
          i {
            color: #fff;
            font-size: 20px;
            line-height: 30px;
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
        .l-status{
          margin-left: 30px;
          color: #fff;
          font-style: italic;
          background: gray;
          opacity: 0.4;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 10px;
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

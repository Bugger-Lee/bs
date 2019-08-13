<template>
  <div class="marketingActive">
    <el-col :span="4" class="marketing-l">
      <p class="marketing-theme-tit ml10">Builder</p>
      <el-menu default-active="2" class="marketing-theme-l">
        <el-submenu index="1">
          <template slot="title">
            <span>ENTRY SOURCES</span>
          </template>
          <el-menu-item-group>
            <ul class="theme-l-tmp">
              <li v-for="i in sourcesType" :key="i.id">
                <span class="crowd-style" :title ='i.command_name' :slot='i.command_code'>
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
    <el-col :span="20" class="marketing-r">
      <div class="marketing-r-t">
        <el-input
          v-model="currentTimeVal"
          size="mini"
          style="width:25%"
          ref="titleInput"
          :disabled="titleDis"
          >
          <i slot="suffix" class="el-icon-edit mr05" style="line-height:28px;cursor: pointer;" @click="editTitle()"></i>
        </el-input>
        <el-button-group>
          <el-button
            type="primary"
            class="pd-back ifColor"
            v-if="this.saveSave==true"
            @click="updateJorney()"
          >Save</el-button>
          <el-button
            type="primary"
            v-if="this.saveUpdate==true"
            class="pd-back ifColor"
            @click="updateJorney()"
          >Update</el-button>
          <el-button
            type="primary"
            v-if="this.saveTest==true"
            :disabled="this.testDis"
            class="pd-back"
            :class="{'ifColor':this.testDis == false}"
            @click="testRunJourney('test')"
          >Test</el-button>
          <el-button
            type="primary"
            class="pd-back"
            v-if="this.saveRunning==true"
            :disabled="this.runDis"
            :class="{'ifColor':this.runDis == false}"
            @click="testRunJourney('runing')"
          >Run</el-button>
          <el-button
            type="primary"
            class="pd-back"
            v-if="this.saveStop==true"
            @click="testRunJourney('stop')"
          >Stop</el-button>
        </el-button-group>
      </div>
      <div class="marketing-r-b">
        <ul class="imaginary" v-if="!ifSmsDrag">
          <li class="imaginary-circle" :class="{'border-new': circleBorder}"></li>
          <li class="imaginary-wire">---------></li>
          <li class="imaginary-square imaginary-squares" :class="{'border-new': squareBorder}"></li>
          <li class="imaginary-wire">-------></li>
          <li class="imaginary-rhombus" :class="{'border-new': rhombusBorder}"></li>
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
              <i class="icon-dbsshujukubeifenDBS-copy-copy-copy" v-if="this.propsData.data_socure == 'CLV-Data'"></i>
              <i class="icon-renqun1" v-if="this.propsData.data_socure == 'DMP-Data'"></i>
            </span>
          </div>
          <div ref="refData1div" v-if="ifDrag">{{propsData.data_socure}}</div>
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
              <i class="icon-dbsshujukubeifenDBS-copy-copy-copy" v-if="this.propsData.data_socure == 'CLV-Data'"></i>
              <i class="icon-renqun1" v-if="this.propsData.data_socure == 'DMP-Data'"></i>
            </span>
          </div>
          <div ref="refData1div" v-if="ifDrag">{{propsData.data_socure}}</div>
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
              <i class="icon-dbsshujukubeifenDBS-copy-copy-copy" v-if="this.propsData.data_socure == 'CLV-Data'"></i>
              <i class="icon-renqun1" v-if="this.propsData.data_socure == 'DMP-Data'"></i>
            </span>
          </div>
          <div ref="refData1div" v-if="ifDrag">{{propsData.data_socure}}</div>
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
              <i class="icon-dbsshujukubeifenDBS-copy-copy-copy" v-if="this.propsData.data_socure == 'CLV-Data'"></i>
              <i class="icon-renqun1" v-if="this.propsData.data_socure == 'DMP-Data'"></i>
            </span>
          </div>
          <div ref="refData1div" v-if="ifDrag">{{propsData.data_socure}}</div>
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
      </div>
    </el-col>
    <popupDrag
      :openData="openData"
      :propsData="propsData"
      :openDataContent="openDataContent"
      :ifDataExtension="ifDataExtension"
      :statusTestRunVal="statusTestRunVal"
      @backlevel="backlevel"
      @searchDmpList="searchDmpList"
      @sltDataContent="sltDataContent"
    ></popupDrag>
    <smsPopup
      :openData="openSms"
      :propsSms="propsSms"
      :openDataContent="openSmsContent"
      :statusTestRunVal="statusTestRunVal"
      @backlevelSms="backlevelSms"
      @searchSmsList="searchSmsList"
      @sltSmsContent="sltSmsContent"
    ></smsPopup>
    <popupTicket :openData="openTicket"
    :openDataContent="openTicketContent"
    :statusTestRunVal="statusTestRunVal"
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
        <el-button @click="cancelTime()">Cancel</el-button>
        <el-button type="primary" @click="doneTime()">Done</el-button>
      </span>
      <popupOpenTime :timeType="timeType"
      :ifDisabled="ifDisabled"
      :ifActiveDis="ifActiveDis"
      @timeCarryOnce="timeCarryOnce"></popupOpenTime>
    </el-dialog>
  </div>
</template>
<script>
import "@/assets/css/part.less";
import jsplumb from "jsplumb";
import $ from "jquery";
import popupDrag from "./module/popupDrag.vue";
import smsPopup from "@/components/public/smsPopup.vue";
import popupTicket from "./module/popupTicket.vue";
import popupOpenTime from "@/components/public/popupOpenTime.vue";
import { constants } from 'fs';
import { clearInterval, setTimeout } from 'timers';
export default {
  name: "marketingActive",
  data() {
    return {
      saveSave:true,
      saveUpdate:false,
      saveTest:true,
      saveRunning:true,
      saveStop:false,
      testDis:true,
      runDis:true,
      titleDis:false,
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
        dateEndVal:'',
        timestamp:'',
        timestampEnd:'',
        timeTypeData:'',
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
        dmpTable:[],
        crowdCountIcon:false,
        brandVal: null,
        periodVal: null,
        periodShow: "",
        brandShow: "",
        registerVal: "",
        newPeriod: "",
        newBuy: "",
        newMbmber: "",
        data_socure: '',
        data_code:"",
        SearchDmp:"",
        shoppings:"",
        regBrandVal:null,
        crowdDmp:"",
        clvCrowdCountNum:""
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
        couponShow:false,
        SearchSms: "",
        editMsg: "",
        ifShowInput: false,
        tableSelectVal: "",
        dataSelected: 2,
        ifSms: '',
        ifSmsDmp:'',
        sendSmsVal: null,
        editTitleVal:""
      },
      couponName: "",
      ifDataExtension: "",
      cron_express: "",
      currentTimeVal: "",
      statusTestRunVal: "",
      systemId: "",
      dargSms: false,
      sortDrag: "",
      ifDisabled:false,
      ifActiveDis:false,
      sourcesType:[],
      getSaveData:'',
      warnTips:"",
      circleBorder: false, // 控制border-1变色
      squareBorder: false, // 控制border-2变色
      rhombusBorder: false, // 控制border-3变色
    };
  },
  created() {
    this.titlePrompt()
    this.brandLists();
    this.periodLists();
    this.registerLists();
    this.sendSmsLists();
    this.sourcesList();
    this.dmpTables();
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
    titlePrompt() {
      this.$alert('请先修改title', '提示', {
        confirmButtonText: '确定',
        showClose:false,
        callback: action => {
          
        }
      })
    },
    // goToHome() {
    //   if(this.warnTips == 1) {
    //     this.$confirm('Journey Builder未保存,是否继续？', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.$router.push('./')
    //     }).catch(() => {
    //         return false
    //     })
    //   }else{
    //     this.$router.push('./')
    //   }
    // },
    editTitle() {
      if(this.saveUpdate != true) {
        this.currentTimeVal = ''
        this.$nextTick(() => {
          this.$refs.titleInput.$el.querySelector('input').focus()
        })
      }
    },
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
        if(this.timeType.dateTimeVal == '' || this.timeType.dateTimeVal == null ||
          this.timeType.dateEndVal == '' || this.timeType.dateEndVal == null) {
            this.$message("请完善时间信息");
            return false
        }
        if(new Date(this.timeType.dateTimeVal).getTime()  >= new Date(this.timeType.dateEndVal).getTime()) {
          this.$message('结束时间必须大于开始时间')
          return false
        }
      }else if(this.timeType.executeType == 1) {
        if(this.timeType.dateTimeVal == '' || this.timeType.dateTimeVal == null) {
          this.$message('请选择激活时间')
          return false
        }
      }
      let timestamp = new Date(this.timeType.dateTimeVal)
      if(this.timeType.dateEndVal && this.timeType.executeType == 2) {
        let timestampEnd = new Date(this.timeType.dateEndVal)
        this.timeType.timestampEnd = timestampEnd.getFullYear() + '-' + (timestampEnd.getMonth() + 1) + '-' + timestampEnd.getDate() + ' ' + timestampEnd.getHours() + ':' + timestampEnd.getMinutes() + ':' + timestampEnd.getSeconds()
      }else{
        this.timeType.dateEndVal = ''
        this.timeType.timestampEnd = ''
      }
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
      let objData = {
        crotabData:this.cron_express,
        schulder_time:this.timeType.dateTimeVal,
        retired_time:this.timeType.dateEndVal,
        periodData:datas
      }
      this.timeType.timeTypeData = objData
      if(this.saveUpdate == true) {
        if(this.timeType.timeTypeData.crotabData != this.getSaveData.cron_express ||
          parseInt(new Date(this.timeType.timeTypeData.schulder_time).getTime()) != parseInt(new Date(this.getSaveData.schulder_time).getTime()) ||
          parseInt(new Date(this.timeType.timeTypeData.retired_time).getTime()) != parseInt(new Date(this.getSaveData.retired_time).getTime())) {
            this.testDis = true
            this.runDis = true
        }
      }
      this.openTime = false;
      this.warnTips = 1
    },
    cancelTime() {
      if(!this.timeType.timeTypeData) {
        this.timeType.dateTimeVal = ''
        this.timeType.dateEndVal = ''
        this.timeType.timeVal = 'Days'
        this.timeType.timeWeek = ''
        this.timeType.timeMonths = ''
        this.timeType.timePicker = ''
      }else{
        this.timeType.dateTimeVal = this.timeType.timeTypeData.schulder_time
        this.timeType.dateEndVal = this.timeType.timeTypeData.retired_time
        this.timeType.timeVal = this.timeType.timeTypeData.periodData.loopType
        this.timeType.timeWeek = this.timeType.timeTypeData.periodData.wloopValue
        this.timeType.timeMonths = this.timeType.timeTypeData.periodData.mloopValue
        this.timeType.timePicker = this.timeType.timeTypeData.periodData.effectTime
      }
      this.openTime = false
    },
    updateJorney() {
      if(this.propsData.data_socure == 'CLV-Data' || this.propsData.data_socure == '') {
        if(this.ifDataExtension.period == undefined ||this.ifDataExtension.register == undefined) {
          this.$message('请完成所有数据输入')
          return false
        }
      }else if(this.propsData.data_socure == 'DMP-Data' || this.propsData.data_socure == '') {
        if(this.ifDataExtension.crowd_id == '' || this.ifDataExtension.crowd_id == undefined) {
          this.$message('请完成所有数据输入')
          return false
        }
      }
      if(this.currentTimeVal == '' ||
        this.propsSms.ifSms.sms_channel_id == 'undefined' ||
        this.propsSms.ifSms.id == 'undefined' ||
        !this.ifDataExtension.brand ||
        this.timeType.timestamp == '') {
          this.$message('请完成所有数据输入')
          return false
      }
      if(this.ifProDrag == true) {
        if(this.propsTicket.ifPromotion.camp_coupon_id == undefined && this.propsTicket.ifPromotion.coupon_id == undefined) {
          this.$message('请完成所有数据输入')
          return false
        }
      }
      let getSessionItem = JSON.parse(sessionStorage.getItem("user"));
      let data = {
        rule_name: this.currentTimeVal,
        sms_channel_id: this.propsSms.ifSms.sms_channel_id,
        template_id: this.propsSms.ifSms.template_id,
        brand_id: this.ifDataExtension.brand,
        vip_channel_name: this.ifDataExtension.register || '',
        schulder_time: this.timeType.timestamp,
        camp_coupon_id: this.propsTicket.ifPromotion.camp_coupon_id || '',
        coupon_id: this.propsTicket.ifPromotion.coupon_id || '',
        enter_first: this.ifDataExtension.newPeriod || '',
        purchase_week: this.ifDataExtension.newMbmber || '',
        purchase_first: this.ifDataExtension.newBuy || '',
        cron_express: this.cron_express,
        command_name:this.propsData.data_socure,
        command_code: this.propsData.data_code,
        created_by:getSessionItem.user_info,
        excluded_guide:this.ifDataExtension.excluded_guide || ''
      };
      if (this.timeType.timestampEnd) {
        data.retired_time = this.timeType.timestampEnd
      }
      if(this.propsData.data_socure == 'DMP-Data') {
        data.crowd_id = this.ifDataExtension.crowd_id
        data.crowd_name = this.ifDataExtension.crowd_name
      }
      if(this.propsData.clvCrowdCountNum != '') {
        data.crowd_count = this.propsData.clvCrowdCountNum
      }
      if(this.ifDataExtension.reg_brand_id != null ) {
        data.reg_brand_id = this.ifDataExtension.reg_brand_id
      }
      if(this.ifDataExtension.period) {
        data.cycle_id = this.ifDataExtension.period
      }
      let urlData = ""
      if(this.systemId) {
        data.id = this.systemId
        urlData = "rule/update"
      }else{
        urlData = "rule/insert"
      }
      this.$.post(urlData, data).then(res => {
        this.$message(res.data.msg)
        if (res.data.code == 200) {
          this.warnTips = 2
          if(this.saveSave == true) {
            this.saveSave = false
            this.saveUpdate = true
            this.testDis = false
            this.titleDis = true
            if(urlData == "rule/insert") {
              this.systemId = res.data.data
            }
            this.$router.push({path:'/activeDetail',query:{id:this.systemId}})
          }else{
            this.testDis = false
          }
          sessionStorage.setItem("saveData", JSON.stringify(data))
          this.getSaveData = JSON.parse(sessionStorage.getItem("saveData"))
        }
      });
    },
    getCrowdCount() {
      this.$.get('rule/getCrowdCount?id='+this.systemId).then(res=>{
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
            this.propsData.clvCrowdCountNum = res.data.data
          }
        }else{
          this.$message(res.data.data)
        }
      })
    },
    testRunJourney(val) {
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
            this.$message('Processing');
            this.runDis = false
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
            this.saveUpdate = true
            this.saveTest = true
            this.saveRunning = true
            this.saveStop = false
            this.$message('Stop');
          }
        } else {
          this.$message('Processing');
        }
      });
    },
    dataOrigin() {
      if(!this.ifDataExtension) {
        this.propsData.brandVal = null
        this.propsData.periodVal = null
        this.propsData.newPeriod = ''
        this.propsData.newBuy = ''
        this.propsData.newMbmber = ''
        this.propsData.shoppings = ''
        this.propsData.registerVal = ''
        this.propsData.regBrandVal = ''
      }else{
        this.propsData.brandVal = this.ifDataExtension.brand
        this.propsData.periodVal = this.ifDataExtension.period
        if(this.propsData.registerVal) {
          this.propsData.registerVal = this.ifDataExtension.register.split(",")
        }
        this.propsData.regBrandVal = this.ifDataExtension.reg_brand_id
        this.propsData.newPeriod = this.ifDataExtension.newPeriod
        this.propsData.newBuy = this.ifDataExtension.newBuy
        this.propsData.newMbmber = this.ifDataExtension.newMbmber
        this.propsData.shoppings = this.ifDataExtension.excluded_guide
      }
    },
    backlevel(val) {
      switch (val) {
        case 1:
          if(this.ifDataExtension != '') {
            this.openDataContent = false;
            this.openData = true;
          }else{
            this.openDataContent = false;
          }
        break;
        case 2:
          this.dataSummary()
        break;
        case 'edit':
          this.openDataContent = true;
          this.openData = false;
        break;
        case 'cancel':
          this.openDataContent = false
          this.dataOrigin()
        break;
      }
    },
    PromotionLevel(val) {
      switch (val) {
        case 1:
          if(this.propsTicket.ifPromotion != '') {
            this.openTicketContent = false;
            this.openTicket = true;
          }else{
            this.openTicketContent = false;
          }
        break;
        case 2:
          this.promotionSummary()
        break;
        case 'edit':
          this.openTicketContent = true;
          this.openTicket = false;
        break;
        case 'cancel':
          this.openTicketContent = false
        break;
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
      this.propsTicket.checkedActive = activeData;
      this.propsTicket.checkedDiscounts = discountsData;
    },
    dmpTables() {
      this.$.get("crowd/getCrowdList",{params:{crowdName:this.propsData.SearchDmp}}).then(res=>{
        this.propsData.dmpTable = res.data.data
      })
    },
    promotionSummary() {
      if (this.propsTicket.checkedActive == undefined && this.propsTicket.checkedDiscounts == undefined || 
      this.propsTicket.checkedActive == '' && this.propsTicket.checkedDiscounts == '') {
        this.$message({
          showClose: true,
          message: "请您选择优惠券或活动券",
          type: "warning"
        });
        return false;
      }
      let obj = {
        camp_coupon_id: this.propsTicket.checkedActive,
        coupon_id: this.propsTicket.checkedDiscounts
      }
      this.propsTicket.ifPromotion = obj
      if(this.saveUpdate == true) {
        if(this.propsTicket.ifPromotion.camp_coupon_id != this.getSaveData.camp_coupon_id ||
        this.propsTicket.ifPromotion.coupon_id != this.getSaveData.coupon_id) {
          this.testDis = true
          this.runDis = true
        }
      }
      this.openTicketContent = false;
      this.openTicket = true;
      this.warnTips = 1
    },
    dataSummary() {
      if(this.propsData.data_socure == 'CLV-Data') {
        if(this.propsData.brandVal == null || this.propsData.periodVal == null || this.propsData.registerVal.length === 0) {
          this.$message({
            showClose: true,
            message: "请您选择必选项",
            type: "warning"
          });
          return false;
        }
      }else if(this.propsData.data_socure == 'DMP-Data') {
        if(this.propsData.brandVal == null || !this.propsData.crowdDmp.crowd_id) {
          this.$message("请您填写必填项")
          return false
        }
      }
      let item_data = this.propsData.brandList.filter(item => item.id == this.propsData.brandVal);
      if(this.propsData.data_socure == 'CLV-Data') {
        let registerVal = this.propsData.registerVal.join(",");
        let item2_data = this.propsData.periodList.filter(item => item.id == this.propsData.periodVal);
        let regBrand = this.propsData.brandList.filter(item => item.id == this.propsData.regBrandVal);
        let objData = {
          brand: this.propsData.brandVal,
          period: this.propsData.periodVal,
          register: registerVal,
          brandShow: item_data[0].brand_name,
          periodShow: item2_data[0].cycle_type,
          newPeriod: this.propsData.newPeriod,
          newBuy: this.propsData.newBuy,
          newMbmber: this.propsData.newMbmber,
          excluded_guide: this.propsData.shoppings,
          reg_brand_id: this.propsData.regBrandVal,
          crowd_count:''
        };
        this.ifDataExtension = objData;
        if(this.propsData.regBrandVal != null) {
          this.ifDataExtension.reg_brand_id_show = regBrand[0].brand_name
        }
        this.clvCrowdCount()
        return false
      }else if(this.propsData.data_socure == 'DMP-Data') {
        let dmpObjData = {
          brandShow:item_data[0].brand_name,
          brand:this.propsData.brandVal,
          crowd_id:this.propsData.crowdDmp.crowd_id,
          crowd_name:this.propsData.crowdDmp.crowd_name,
          crowd_count:this.propsData.crowdDmp.crowd_count
        }
        this.ifDataExtension = dmpObjData
      }
      if(this.saveUpdate == true) {
        if(this.ifDataExtension.brand != this.getSaveData.brand_id ||
        this.ifDataExtension.register != this.getSaveData.vip_channel_name ||
        this.ifDataExtension.crowd_name != this.getSaveData.crowd_name ||
        this.ifDataExtension.period != this.getSaveData.cycle_id ||
        this.ifDataExtension.newPeriod != this.getSaveData.enter_first ||
        this.ifDataExtension.newBuy != this.getSaveData.purchase_first ||
        this.ifDataExtension.newMbmber != this.getSaveData.purchase_week ||
        this.ifDataExtension.reg_brand_id != this.getSaveData.reg_brand_id ||
        this.ifDataExtension.excluded_guide != this.getSaveData.excluded_guide){
          this.testDis = true
          this.runDis = true
        }
      }
      this.openDataContent = false;
      this.openData = true;
      this.warnTips = 1
    },
    alertClvCount() {
        let getSessionItem = JSON.parse(sessionStorage.getItem("user"));
        let data = {
          rule_name: this.currentTimeVal,
          brand_id: this.ifDataExtension.brand,
          cycle_id: this.ifDataExtension.period,
          vip_channel_name: this.ifDataExtension.register,
          enter_first: this.ifDataExtension.newPeriod,
          purchase_week: this.ifDataExtension.newMbmber ,
          purchase_first: this.ifDataExtension.newBuy,
          excluded_guide:this.ifDataExtension.excluded_guide,
          command_code: this.propsData.data_code,
          command_name:this.propsData.data_socure,
          created_by:getSessionItem.user_info
        };
        if(this.ifDataExtension.reg_brand_id != null ) {
          data.reg_brand_id = this.ifDataExtension.reg_brand_id
        }
        if(this.propsData.clvCrowdCountNum != '') {
          data.crowd_count = this.propsData.clvCrowdCountNum
        }
        if(this.systemId == '') {
          this.$.post("rule/insert",data).then(res=>{
            if(res.data.code == 200) {
              this.systemId = res.data.data
              this.getCrowdCount()
              sessionStorage.setItem("saveData", JSON.stringify(data))
              this.getSaveData = JSON.parse(sessionStorage.getItem("saveData"))
            }else{
              this.$message(res.data.msg)
            }
          })
        }else{
          data.id = this.systemId
          this.$.post("rule/update",data).then(res=>{
            if(res.data.code == 200) {
              this.getCrowdCount()
              sessionStorage.setItem("saveData", JSON.stringify(data))
              this.getSaveData = JSON.parse(sessionStorage.getItem("saveData"))
            }else{
              this.$message(res.data.msg)
            }
        })
      }
      this.openDataContent = false;
      this.openData = true;
    },
    clvCrowdCount() {
      if(this.ifDataExtension.brand != this.getSaveData.brand_id ||
        this.ifDataExtension.register != this.getSaveData.vip_channel_name ||
        this.ifDataExtension.period != this.getSaveData.cycle_id ||
        this.ifDataExtension.newPeriod != this.getSaveData.enter_first ||
        this.ifDataExtension.newBuy != this.getSaveData.purchase_first ||
        this.ifDataExtension.newMbmber != this.getSaveData.purchase_week ||
        this.ifDataExtension.reg_brand_id != this.getSaveData.reg_brand_id ||
        this.ifDataExtension.excluded_guide != this.getSaveData.excluded_guide) {
          this.$alert('人群将会重新计算，请不要频繁操作', '提示', {
            confirmButtonText: '确定',
            showClose:false,
            callback: action => {
              this.alertClvCount()
            }
          })
      }else{
        this.alertClvCount()
      }
    },
    backlevelSms(val) {
      this.propsSms.dataSelected = 2
      if(this.propsSms.ifSms != '') {
        this.openSmsContent = false;
        this.openSms = true;
      }else{
        this.openSmsContent = false;
      }
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
            this.$nextTick(()=>{
              this.dragInit();
            })
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
          templateName:this.propsSms.SearchSms
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
    searchDmpList(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.dmpTables();
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
        this.$refs.refData2.style.position = "absolute";
        this.$refs.refData2.style.top = top + "px";
        this.$refs.refData2.style.left = left + "px";
        this.$refs.refData2div.style.position = "absolute";
        this.$refs.refData2div.style.top = top + 50 + "px";
        this.$refs.refData2div.style.left = left + 5 + "px";

        this.$refs.refData3.style.position = "absolute";
        this.$refs.refData3.style.top = top + "px";
        this.$refs.refData3.style.left = left + 150 + "px";
        this.$refs.refData3div.style.position = "absolute";
        this.$refs.refData3div.style.top = top + 50 + "px";
        this.$refs.refData3div.style.left = left + 150 + 5 + "px";

        this.$refs.refData4.style.position = "absolute";
        this.$refs.refData4.style.top = top + "px";
        this.$refs.refData4.style.left = left + 300 + "px";
        this.$refs.refData4div.style.position = "absolute";
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
        this.$refs.newData.style.position = "absolute";
        this.$refs.newData.style.top = top + "px";
        this.$refs.newData.style.left = left + "px";
        this.$refs.newrefDatadiv.style.position = "absolute";
        this.$refs.newrefDatadiv.style.top = top + 50 + "px";
        this.$refs.newrefDatadiv.style.left = left + -5 + "px";
      });
    },
    appendDiv(left, top,text,code,className) {
      this.propsData.data_socure = text
      this.propsData.data_code = code
      this.ifDrag = true;
      this.$nextTick(() => {
        this.$refs.refData1.style.position = "absolute";
        this.$refs.refData1.style.top = top + "px";
        this.$refs.refData1.style.left = left + "px";
        this.$refs.refData1div.style.position = "absolute";
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
        this.$refs.newData.style.position = "absolute";
        this.$refs.newData.style.top = top + "px";
        this.$refs.newData.style.left = left + 50 + "px";
        this.$refs.newrefDatadiv.style.position = "absolute";
        this.$refs.newrefDatadiv.style.top = top + 50 + "px";
        this.$refs.newrefDatadiv.style.left = left + 45 + "px";

        this.$refs.refData2.style.position = "absolute";
        this.$refs.refData2.style.top = top + "px";
        this.$refs.refData2.style.left = left + 170 + "px";
        this.$refs.refData2div.style.position = "absolute";
        this.$refs.refData2div.style.top = top + 50 + "px";
        this.$refs.refData2div.style.left = left + 175 + "px";

        this.$refs.refData3.style.position = "absolute";
        this.$refs.refData3.style.top = top + "px";
        this.$refs.refData3.style.left = left + 295 + "px";
        this.$refs.refData3div.style.position = "absolute";
        this.$refs.refData3div.style.top = top + 50 + "px";
        this.$refs.refData3div.style.left = left + 300 + "px";

        this.$refs.refData4.style.position = "absolute";
        this.$refs.refData4.style.top = top + "px";
        this.$refs.refData4.style.left = left + 430 + "px";
        this.$refs.refData4div.style.position = "absolute";
        this.$refs.refData4div.style.top = top + 50 + "px";
        this.$refs.refData4div.style.left = left + 435 + "px";
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
        this.$refs.newData.style.position = "absolute";
        this.$refs.newData.style.top = top + "px";
        this.$refs.newData.style.left = left + -90 + "px";
        this.$refs.newrefDatadiv.style.position = "absolute";
        this.$refs.newrefDatadiv.style.top = top + 50 + "px";
        this.$refs.newrefDatadiv.style.left = left + -95 + "px";

        this.$refs.refData2.style.position = "absolute";
        this.$refs.refData2.style.top = top + "px";
        this.$refs.refData2.style.left = left + 30 + "px";
        this.$refs.refData2div.style.position = "absolute";
        this.$refs.refData2div.style.top = top + 50 + "px";
        this.$refs.refData2div.style.left = left + 35 + "px";

        this.$refs.refData3.style.position = "absolute";
        this.$refs.refData3.style.top = top + "px";
        this.$refs.refData3.style.left = left + 180 + "px";
        this.$refs.refData3div.style.position = "absolute";
        this.$refs.refData3div.style.top = top + 50 + "px";
        this.$refs.refData3div.style.left = left + 185 + "px";

        this.$refs.refData4.style.position = "absolute";
        this.$refs.refData4.style.top = top + "px";
        this.$refs.refData4.style.left = left + 320 + "px";
        this.$refs.refData4div.style.position = "absolute";
        this.$refs.refData4div.style.top = top + 50 + "px";
        this.$refs.refData4div.style.left = left + 325 + "px";
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
      if(this.ifDataExtension != '') {
        this.openData = true;
      }else{
        this.openDataContent = true
      }
    },
    popupTicket() {
      if(this.propsData.brandVal == null) {
        this.$message({
          showClose: true,
          message: '请您先将数据源里的必选内容选完',
          type: 'warning'
        });
        return false
      }else{
        this.discountLists();
        if(this.propsTicket.ifPromotion != '') {
          this.openTicket = true;
        }else{
          this.openTicketContent = true;
        }
      }
    },
    sms() {
      this.propsSms.dataSelected = 2
      this.propsSms.editTitleVal = ''
      this.propsSms.editMsg = ''
      this.propsSms.couponShow = this.ifProDrag
      if(this.propsData.brandVal == null) {
        this.$message({
          showClose: true,
          message: '请您先将数据源里的必选内容选完',
          type: 'warning'
        });
        return false
      }else{
        this.smsLists();
        if(this.propsSms.ifSms != '') {
          this.openSms = true;
        }else{
          this.openSmsContent = true
        }
      }
    },
    selectTime() {
      this.openTime = true;
      if(this.statusTestRunVal == 2) {
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
    sltDataContent(val) {
      this.openData = false;
      if (val == "close1") {
        this.openDataContent = false;
      } else if (val == "openNext") {
        this.openDataContent = true;
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
          this.saveMessage()
        break;
        case 'inputBlur':
          this.inputBlur(val.value, val.id , val.templt);
        break;
        case 'tableIndex':
          if(val.id) {
            if (this.propsSms.ifSmsDmp == '') {
              this.propsSms.ifSmsDmp = {}
            }
            this.propsSms.ifSmsDmp.template_text = val.document_text
            this.propsSms.ifSmsDmp.id = val.id
          }
        break;
        case 'cancel':
          this.openSmsContent = false
          if(!this.propsSms.ifSms) {
            this.propsSms.sendSmsVal = null
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
    inputBlur(val, id,templt) {
      if (val == "") {
        this.$message("请您输入文案内容");
        return false;
      }
      let upDate = {
        brand_id: this.ifDataExtension.brand,
        template_name:templt,
        document_text: val,
        id: id
      };
      this.$.post("template/update", upDate).then(res => {
        if (res.data.code == 200) {
          this.$message(res.data.msg)
          this.smsLists();
        } else {
          this.$message(res.data.msg)
        }
      });
    },
    saveMessage() {
      if(this.propsSms.sendSmsVal == null) {
        this.$message('请您选择短信渠道')
        return false
      }
      let sms_data = this.propsSms.sendSmsList.filter(item => item.channel_content == this.propsSms.sendSmsVal)
      let reg = ""
      if (this.propsSms.dataSelected == 2) {
        if(this.propsSms.ifSmsDmp.template_text == undefined) {
          this.$message('请填写必填项')
          return false
        }
        let objData = {
          template_text: this.propsSms.ifSmsDmp.template_text,
          sms_channel_content:this.propsSms.sendSmsVal,
          sms_channel_id: sms_data[0].id,
          template_id:this.propsSms.ifSmsDmp.id
        }
        this.propsSms.ifSms = objData;
      } else if (this.propsSms.dataSelected == 3) {
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
      if(this.saveUpdate == true) {
        if(this.propsSms.ifSms.id != this.getSaveData.template_id ||
        this.propsSms.ifSms.sms_channel_id != this.getSaveData.sms_channel_id) {
          this.testDis = true
          this.runDis = true
        }
      }
      this.warnTips = 1
    },
    smsCreatedMessage() {
      let getSessionItem = JSON.parse(sessionStorage.getItem("user"));
      let sms_data = this.propsSms.sendSmsList.filter(item => item.channel_content == this.propsSms.sendSmsVal)
      let insertData = {
        brand_id: this.ifDataExtension.brand,
        template_name:this.propsSms.editTitleVal,
        document_text: this.propsSms.editMsg,
        uuid:(new Date()).valueOf(),
        created_by:getSessionItem.user_info
      }
      this.$.post("template/insert", insertData).then(res => {
        if (res.data.code == 200) {
          this.$message('SMS Created')
          this.smsLists();
          let objDataThree = {
            template_text: this.propsSms.editMsg,
            sms_channel_content:this.propsSms.sendSmsVal,
            sms_channel_id: sms_data[0].id,
            template_id:res.data.data
          };
          this.propsSms.ifSms = objDataThree;
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
        appendTo: "body",
        containment: "parent",
        start: function(event, ui) {
          if (that.ifDrag) {return false}
          that.circleBorder = true
        },
        stop: function(event, ui) {
          that.circleBorder = false
        }
      });
      $(".marketing-r").droppable({
        scope: "dragflag",
        drop: function(event, ui) {
          if (
            minleft <= ui.offset.left &&
            ui.offset.left <= minleft + maxleft &&
            mintop <= ui.offset.top &&
            ui.offset.top < mintop + maxtop
          ) {
            that.appendDiv(ui.offset.left, ui.offset.top,ui.draggable[0].title,ui.draggable[0].slot,ui.draggable[0].firstChild.className);
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
        containment: "parent",
        start: function(event, ui) {
          if (that.sortDrag == 'sms') {
            if(event.currentTarget.classList[0] == 'msg-style') {return false}
            that.rhombusBorder = true
          } else if(that.sortDrag == 'pro'){
            if(event.currentTarget.classList[0] == 'crowds-style') {return false}
            that.rhombusBorder = true
          } else {
            that.squareBorder = true
          }
        },
        stop: function(event, ui) {
          that.squareBorder = false
          that.rhombusBorder = false
        }
      });
      $(".marketing-r").droppable({
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
      $(".marketing-r").droppable({
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
  background-color: #fff;
  height: 95%;
  overflow: scroll;
  padding: 15px;
  .marketing-l {
    height:99%;
    overflow-y:scroll;
    .marketing-theme-tit {
      height: 40px;
      line-height: 40px;
    }
  }
  .marketing-r {
    .marketing-r-t{
      text-align: right;
      .pd-back {
        padding: 6px 12px;
        background: none;
        border: 1px solid #ece2e1;
        color: #e6e5e4;
      }
      .ifColor {
        color: #409eff;
      }
    }
    .marketing-r-b{
      padding: 70px 0 0 50px;
    }
  }
}
</style>


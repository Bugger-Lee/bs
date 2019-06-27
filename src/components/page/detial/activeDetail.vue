<template>
  <div class="activeDetail">
    <div class="marketing">
      <div class="marketing-header">
        <el-col :span="12" class="marketing-header-l">
          <span class="l-icon ml10">
            <i class="el-icon-location"></i>
          </span>
          <div class="l-tit">
            <div class="l-tit-t">
              <p>
                <a href>Journeys Dashboard</a>
                <i>> Journey</i>
              </p>
              <p>{{this.userNameTie}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="12" class="marketing-header-r">
          <el-button-group class="mr05">
            <el-button type="primary" class="pd-btn pd-back ifColor" v-if="this.detailUpdate == true" @click="detailStatus('update')">Update</el-button>
            <el-button type="primary" class="pd-btn pd-back ifColor" v-if="this.detailTest == true" @click="detailStatus('test')">Test</el-button>
            <el-button type="primary" class="pd-btn pd-back ifColor" v-if="this.detailRun == true" @click="detailStatus('run')">Run</el-button>
            <el-button type="primary" class="pd-btn pd-back ifColor" v-if="this.detailStop == true" @click="detailStatus('stop')">Stop</el-button>
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
            <div class="window" id="data1" ref="refData1" v-if="ifDrag">
              <span class="crowd-style" @click="dataExtension()">
                <i class="icon-dbsshujukubeifenDBS-copy-copy-copy" v-if="this.propsData.defaultData.command_name == 'CLV人群'"></i>
                <i class="icon-renqun1" v-if="this.propsData.defaultData.command_name == 'DMP-Data'"></i>
              </span>
            </div>
            <div ref="refData1div" v-if="ifDrag">{{this.propsData.defaultData.command_name}}</div>
            <div class="window" id="return1" ref="refData2" v-if="ifSmsDrag">
              <span class="msg-style" @click="sms()">
                <i class="icon-duanxin2-copy" style="font-size:32px;"></i>
              </span>
            </div>
            <div ref="refData2div" v-if="ifSmsDrag">SMS</div>
            <div class="window" id="return2" ref="refData3" v-if="ifSmsDrag">
              <span class="ctl-style" @click="selectTime()">
                <i class="icon-time1"></i>
              </span>
            </div>
            <div ref="refData3div" v-if="ifSmsDrag">Time</div>
            <div class="window" id="return3" ref="refData4" v-if="ifSmsDrag">
              <span class="crowd-style">
                <i class="icon-wancheng1"></i>
              </span>
            </div>
            <div ref="refData4div" v-if="ifSmsDrag">Over</div>
          </div>
          <div v-else>
            <div class="window" id="data1" ref="refData1" v-if="ifDrag">
              <span class="crowd-style" @click="dataExtension()">
                <i class="icon-dbsshujukubeifenDBS-copy-copy-copy" v-if="this.propsData.defaultData.command_name == 'CLV人群'"></i>
                <i class="icon-renqun1" v-if="this.propsData.defaultData.command_name == 'DMP-Data'"></i>
              </span>
            </div>
            <div ref="refData1div" v-if="ifDrag">{{this.propsData.defaultData.command_name}}</div>
            <div class="window" id="return12" ref="refData2" v-if="ifSmsDrag">
              <span class="msg-style" @click="sms()">
                <i class="icon-duanxin2-copy" style="font-size:32px;"></i>
              </span>
            </div>
            <div ref="refData2div" v-if="ifSmsDrag">SMS</div>
            <div class="window" id="return23" ref="refData3" v-if="ifSmsDrag">
              <span class="ctl-style" @click="selectTime()">
                <i class="icon-time1"></i>
              </span>
            </div>
            <div ref="refData3div" v-if="ifSmsDrag">Time</div>
            <div class="window" id="newreturn" ref="newData">
              <span class="crowds-style" @click="popupTicket()" style="background-color:#ffcd43;">
                <i class="icon-quanyi-copy-copy"></i>
              </span>
            </div>
            <div ref="newrefDatadiv">Coupon</div>
            <div class="window" id="return34" ref="refData4" v-if="ifSmsDrag">
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
        @backlevelSms ="backlevelSms"
        @searchSmsList ="searchSmsList"
        @sltSmsContent ="sltSmsContent">
    </smsPopup>
    <popupTicket :openData="openTicket" 
      :propsTicket="propsTicket"
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
import smsPopup from "./module/smsPopup.vue"
import popupTicket from "./module/popupTicket.vue"
import popupOpenTime from "@/components/public/popupOpenTime.vue"
import popupDrag from "./module/popupDrag.vue"
import { constants } from 'fs';
export default {
  data() {
    return {
      detailUpdate:true,
      detailTest:true,
      detailRun:true,
      detailStop:false,
      ifDrag: true,
      ifSmsDrag: true,
      openData:false,
      openSms:false,
      openTicket:false,
      openTicketContent:false,
      openDataContent:false,
      openSmsContent:false,
      openTime:false,
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
          defaultData:''
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
        ifSms:''
      },
      timeType:{
        timeVal:'Days',
        dateTimeVal:'',
        executeType:'',
        timestamp:'',
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
      userNameTie:''
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
  },
  methods: {
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
        this.cron_express = ''
      }
      this.openTime = false
    },
    dragInit1(top, left) {
      this.$nextTick(() => {
        this.$refs.refData1.style.position = "fixed";
        this.$refs.refData1.style.top = top + "px";
        this.$refs.refData1.style.left = left + "px";
        this.$refs.refData1div.style.position = "fixed";
        this.$refs.refData1div.style.top = top + 50 + "px";
        this.$refs.refData1div.style.left = left + -5 + "px";

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
        this.jsPlumb("data1", "return1");
        this.jsPlumb("return1", "return2");
        this.jsPlumb("return2", "return3");
      });
    },
    dragInit2(top, left) {
      this.showFirst = false
      this.$nextTick(() => {
        this.$refs.refData1.style.position = "fixed";
        this.$refs.refData1.style.top = top + "px";
        this.$refs.refData1.style.left = left + "px";
        this.$refs.refData1div.style.position = "fixed";
        this.$refs.refData1div.style.top = top + 50 + "px";
        this.$refs.refData1div.style.left = left + -5 + "px";

        this.$refs.newData.style.position = "fixed";
        this.$refs.newData.style.top = top + "px";
        this.$refs.newData.style.left = left + 150 + "px";
        this.$refs.newrefDatadiv.style.position = "fixed";
        this.$refs.newrefDatadiv.style.top = top + 50 + "px";
        this.$refs.newrefDatadiv.style.left = left + 147 + "px";

        this.$refs.refData2.style.position = "fixed";
        this.$refs.refData2.style.top = top + "px";
        this.$refs.refData2.style.left = left + 300 + "px";
        this.$refs.refData2div.style.position = "fixed";
        this.$refs.refData2div.style.top = top + 50 + "px";
        this.$refs.refData2div.style.left = left + 305 + "px";

        this.$refs.refData3.style.position = "fixed";
        this.$refs.refData3.style.top = top + "px";
        this.$refs.refData3.style.left = left + 450 + "px";
        this.$refs.refData3div.style.position = "fixed";
        this.$refs.refData3div.style.top = top + 50 + "px";
        this.$refs.refData3div.style.left = left + 450 + 5 + "px";

        this.$refs.refData4.style.position = "fixed";
        this.$refs.refData4.style.top = top + "px";
        this.$refs.refData4.style.left = left + 600 + "px";
        this.$refs.refData4div.style.position = "fixed";
        this.$refs.refData4div.style.top = top + 50 + "px";
        this.$refs.refData4div.style.left = left + 600 + 5 + "px";
        let allconn = jsplumb.jsPlumb.getAllConnections();
        for (var i = 0; i < allconn.length + 1; i++) {
          jsplumb.jsPlumb.deleteConnection(allconn[0]);
        }
        jsplumb.jsPlumb.deleteConnection(allconn[0]);
        this.jsPlumb("data1", "newreturn");
        this.jsPlumb("newreturn", "return12");
        this.jsPlumb("return12", "return23");
        this.jsPlumb("return23", "return34");
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
    popupTicket() {
      this.openTicket = true
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
        let data = {
          id:this.$route.query.id,
          rule_name:this.userNameTie,
          sms_channel_id:this.propsSms.ifSms.sms_channel_id,
          template_id:temp_data_id,
          brand_id:this.ifDataExtension.brand_id,
          cycle_id:this.ifDataExtension.cycle_id,
          vip_channel_name:this.ifDataExtension.vip_channel_name,
          schulder_time:this.timeType.timestamp,
          camp_coupon_id:this.ifTicket.camp_coupon_id,
          coupon_id:this.ifTicket.coupon_id,
          enter_first:this.ifDataExtension.enter_first,
          purchase_first:this.ifDataExtension.purchase_first,
          purchase_week:this.ifDataExtension.purchase_week,
          cron_express:this.cron_express,
          command_name:"CLV人群",
          command_code:'clv-job',
          created_by:getSessionItem.user_info
        }
        this.$.post('rule/update',data).then(res=>{
          if(res.data.code == 200) {
            this.$message(res.data.msg)
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
            this.$message(res.data.msg)
            if(this.statusTestRunVal == 3) {
              this.detailUpdate = true
              this.detailRun = true
              this.detailTest = true
              this.detailStop = false
            }else if(this.statusTestRunVal == 2){
              this.detailUpdate = false
              this.detailRun = false
              this.detailTest = false
              this.detailStop = true
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
          this.propsData.defaultData = res.data.data
          this.userNameTie = res.data.data.rule_name
          this.propsData.brandVal = this.ifDataExtension.brand_name
          this.propsData.periodVal = this.ifDataExtension.cycle_type
          this.propsSms.sendSmsVal =  this.propsSms.ifSms.sms_channel_content
          if(res.data.data.camp_coupon_id || res.data.data.coupon_id) {
            this.showFirst = true
            this.dragInit2(200, 320);
          }else{
            this.showFirst = true
            this.dragInit1(200, 320);
          }
          if(res.data.data.status == 2) {
            this.detailStop = true
            this.detailUpdate = false
            this.detailTest = false
            this.detailRun = false
          }
          if(res.data.data.cron_express == '') {
            this.timeType.executeType = 1
          }else{
            this.timeType.executeType = 2
          }
          let timestamp = new Date(res.data.data.schulder_time)
          this.timeType.dateTimeVal  = timestamp.getFullYear() + '-' + (timestamp.getMonth() + 1) + '-' + timestamp.getDate() + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds()
          if(this.ifDataExtension.vip_channel_name.length > 0) {
            this.propsData.registerVal = this.ifDataExtension.vip_channel_name.split(',')
          }
          this.propsData.newBuy = this.ifDataExtension.purchase_first
          this.propsData.newPeriod = this.ifDataExtension.enter_first
          this.propsData.newMbmber = this.ifDataExtension.purchase_week
          if (res.data.data.cron_express) {
          this.cronChangeDate(res.data.data)
          this.timeType.timeVal = this.cronChangeDate(res.data.data).loopType
          let dayVal = this.cronChangeDate(res.data.data).loopTime.split(':')
          this.timeType.timePicker = new Date(0,0,0,dayVal[0],dayVal[1])
          let timeMonths = this.cronChangeDate(res.data.data).loopValue
          let date_new = new Date()
          this.timeType.timeMonths = new Date(date_new.getFullYear(),date_new.getMonth(),timeMonths)
          this.timeType.timeWeek = this.cronChangeDate(res.data.data).loopValue
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
      this.$.get("http://bestsellerdmp.bestseller.com.cn/jbuilder-api/crowd/getCrowdList",{params:{crowdName:this.propsData.SearchDmp}}).then(res=>{
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
        this.ifDataExtension = {}
        this.ifDataExtension.crowdId = val.id
        this.ifDataExtension.crowdName = val.name
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
        this.openTicketContent = false
        this.openTicket = true
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
      this.openTicket = true
      this.openTicketContent = false
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
      let reVal = this.propsData.registerVal.join(',')
      let item_data = this.propsData.brandList.filter(item => item.brand_name == this.propsData.brandVal)
      let item2_data = this.propsData.periodList.filter(item => item.cycle_type == this.propsData.periodVal)
      let objData = {
        brand_id:item_data[0].id,
        cycle_id:item2_data[0].id,
        vip_channel_name:reVal,
        brand_name:this.propsData.brandVal,
        cycle_type:this.propsData.periodVal,
        enter_first:this.propsData.newPeriod,
        purchase_first:this.propsData.newBuy,
        purchase_week:this.propsData.newMbmber,
      }
      this.ifDataExtension = objData
      this.openDataContent = false
      this.openData = true
    },
    backlevelSms() {
      this.openSmsContent = false
      this.openSms = true
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
      if (val.name == 'close1') {
        this.openSmsContent = false
      } else if (val.name == 'openNext') {
        this.openSmsContent = true
      }else if(val.name == 'saveMsg') {
        this.saveMessage()
      }else if(val.name == 'inputBlur') {
        this.inputBlur(val.value,val.id)
      } else if (val.name = "tableIndex") {
        if(val.id) {
          this.propsSms.ifSms.template_text = val.document_text 
          this.propsSms.ifSms.template_id= val.id
        }
      }
    },
    inputBlur(val,id) {
        if(val == '') {
          this.$message('文案不可以为空')
          return false
        }
        let upDate = {
          cycle_id:this.ifDataExtension.cycle_id,
          brand_id:this.ifDataExtension.brand_id,
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
      let smsObj = this.propsSms.sendSmsList.filter(item => item.channel_content == this.propsSms.sendSmsVal)
      let objData = {
        template_text:this.propsSms.editMsg,
        sms_channel_id: smsObj[0].id,
        sms_channel_content:this.propsSms.sendSmsVal
      }
      if(this.propsSms.dataSelected == 2) {
        let doc_text = this.propsSms.smsTable.filter(item => item.id == this.propsSms.ifSms.template_id)
        this.propsSms.ifSms.template_text = doc_text[0].document_text
        this.propsSms.ifSms.sms_channel_content = this.propsSms.sendSmsVal
        this.openSmsContent = false
        this.openSms = true
      }else if(this.propsSms.dataSelected == 3){
        if(!this.propsSms.editMsg) {
          this.$message('模板内容不可以为空')
          return false
        }
        let insertData = {
          cycle_id:this.ifDataExtension.cycle_id,
          brand_id:this.ifDataExtension.brand_id,
          document_text:this.propsSms.editMsg,
          uuid:(new Date()).valueOf()
        }
        this.$.post("template/insert",insertData).then(res=>{
          if(res.data.code == 200) {
            this.smsLists()
            let objData = {
              template_text:this.propsSms.editMsg,
              sms_channel_id: smsObj[0].id,
              sms_channel_content:this.propsSms.sendSmsVal
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
    },
    sms() {
      this.smsLists();
      this.openSms = true
    },
    selectTime() {
      this.openTime = true
    }
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

<template>
  <div class="popupDrag">
    <div v-if="propsData.routerType == 1">
      <el-dialog
        :visible.sync="openDataProps"
        :close-on-click-modal="false"
        width="60%">
        <span slot="title" class="data-title">
          <span class="icon-shouye"></span>Data Extension Summary
        </span>
        <div class="data-content">
          <p>
            <span class="redStar">*</span>Data Extension
          </p>
          <div class="data-content-c" v-if="ifDataExtension == ''">
            <img src="../../../assets/img/noneData.png">
            <p class="c-explain-one">Let's get going!</p>
            <p>Select the data extension whose contacts should enter this journey</p>
            <el-button
              type="primary"
              class="c-explain-select"
              @click="clickPopup('openNext')"
            >Select Data Extension</el-button>
          </div>
          <div v-if="ifDataExtension != ''" class="data-content-apply">
            <p class="data-content-apply-header">
              <!-- <span style="font-size:16px;font-weight:600;">20180202-May_0192k</span> -->
              <span style="font-size:16px;font-weight:600;">DATA EXTENSION PROPERTIES</span>
              <el-button class="bth" @click="backlevel('edit')">Edit</el-button>
            </p>
            <div class="data-content-apply-content mt10">
              <P><span>品牌 : {{ifDataExtension.brandShow}}</span><span></span></P>
              <P><span>周期 : {{ifDataExtension.periodShow}}</span><span></span></P>
              <P><span>渠道 : {{ifDataExtension.register}}</span><span></span></P>
              <P><span>是否新进入周期 : {{ifDataExtension.newPeriod}}</span><span></span></P>
              <P><span>是否为首次购买 : {{ifDataExtension.newBuy}}</span><span></span></P>
              <P><span>注册一周未购买 : {{ifDataExtension.newMbmber}}</span><span></span></P>
              <P><span>活动券 : {{ifDataExtension.camp_coupon_id}}</span><span></span></P>
              <P><span>优惠券 : {{ifDataExtension.coupon_id}}</span><span></span></P>
              <P><span>短信通道 : {{ifDataExtension.sms_channel_id_show}}</span><span></span></P>
              <P><span>定时发送时间 : {{ifDataExtension.schulder_time}}</span><span></span></P>
            </div>
          </div>
        </div>
        <span slot="footer">
          <el-button @click="openDataProps = false">Cancel</el-button>
          <el-button  @click="openDataProps = false" type="primary">Done</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="openDataContentProps"
        :close-on-click-modal="false"
        class="data-content"
        :show-close="false"
        width="98%">
        <el-col :span="3" class="data-content-l">
          <div class="data-content-summary" :class="{'data-Selected':dataSelected == 1}" @click="tabSelect(1)">
            <span>
              <i class="icon-shouye"></i>
            </span>
            <p class="summary-title mt10">Summary</p>
          </div>
          <div class="data-content-summary" :class="{'data-Selected':dataSelected == 2}" @click="tabSelect(2)">
            <p>
              <i class="redStar">*</i>Data
            </p>
            <p>Extension</p>
          </div>
          <div class="data-content-summary" :class="{'data-Selected':dataSelected == 3}" @click="tabSelect(3)">
            <p><i class="redStar">*</i>Sales</p>
            <p>Promotion</p>
          </div>
        </el-col>
        <el-col :span="21" v-if="this.dataSelected == 2" class="data-content-r">
          <div class="r-header">
            <p class="r-header-t">
              <span>Data Extension</span>
              <span class="el-icon-back" @click="backlevel(1)"></span>
            </p>
            <p class="r-header-b">Select your audience to enter the Journey</p>
          </div>
          <div class="r-content">
            <el-col :span="5" class="r-content-l">
              <p class="r-content-l-t">Folders</p>
              <el-tree :data="dataExtensions" class="r-content-l-b">
                <span slot-scope="{ node, data }">
                  <span>
                    <i :class="data.con"></i>
                    <i :class="data.icon"></i>
                    {{ node.label }}
                  </span>
                </span>
              </el-tree>
            </el-col>
            <el-col :span="1" class="r-content-c">
              <span></span>
            </el-col>
            <el-col :span="19" class="r-content-r">
              <div class="select-option">
                <el-col :span="12">
                  <div class="ml10">
                    <span class="redStar">*</span>
                    <span>选择品牌</span>
                    <el-select v-model="propsData.brandVal" clearable placeholder="请选择品牌" class="select-option-classify">
                      <el-option
                        v-for="item in propsData.brandList"
                        :key="item.id"
                        :label="item.brand_name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="ml10">
                    <span class="redStar">*</span>
                    <span>选择周期</span>
                    <el-select v-model="propsData.periodVal"  clearable placeholder="请选择周期" class="select-option-classify">
                      <el-option
                        @click.native="periodChange()"
                        v-for="item in propsData.periodList"
                        :key="item.id"
                        :label="item.cycle_type"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="ml10">
                    <span class="redStar">*</span>
                    <span>注册渠道</span>
                    <el-select v-model="propsData.registerVal" clearable multiple placeholder="请选择注册渠道" class="select-option-classify">
                      <el-option
                        v-for="item in propsData.registerList"
                        :key="item.id"
                        :value="item.channel_name"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="ml10 mt20">
                    <span class="redStar">*</span>
                    <span>定时发送时间</span>
                    <el-date-picker
                      v-model="propsData.dateTimeVal"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                  <div class="select-option-ipt" v-if="ifNewPeriod">
                    <span class="mr15">是否新进入周期:</span>
                    <el-radio v-model="propsData.newPeriod" label="是">是</el-radio>
                    <el-radio v-model="propsData.newPeriod" label="否">否</el-radio>
                  </div>
                  <div class="select-option-ipt" v-if="ifNewBuy">
                    <span class="mr15">是否为首次购买:</span>
                    <el-radio v-model="propsData.newBuy" label="是">是</el-radio>
                    <el-radio v-model="propsData.newBuy" label="否">否</el-radio>
                  </div>
                  <div class="select-option-ipt" v-if="ifNewMbmber">
                    <span class="mr15">注册一周未购买:</span>
                    <el-radio v-model="propsData.newMbmber" label="是">是</el-radio>
                    <el-radio v-model="propsData.newMbmber" label="否">否</el-radio>
                  </div>
                </el-col>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="21" v-if="this.dataSelected == 3" class="data-content-r">
          <div class="r-header">
            <p class="r-header-t">
              <span>Sales Promotion</span>
              <span class="el-icon-back" @click="backlevel(1)"></span>
            </p>
            <p class="r-header-b">Select your audience to enter the Journey</p>
          </div>
          <div class="r-content">
            <el-col :span="5" class="r-content-l">
              <p class="r-content-l-t">Folders</p>
              <el-tree :data="SalesPromotions" class="r-content-l-b">
                <span slot-scope="{ node, data }">
                  <span>
                    <i :class="data.con"></i>
                    <i :class="data.icon"></i>
                    {{ node.label }}
                  </span>
                </span>
              </el-tree>
            </el-col>
            <el-col :span="1" class="r-content-c">
              <span></span>
            </el-col>
            <el-col :span="19" class="r-content-r">
              <div class="select-msg">
                <div class="select-msg-search">
                  <el-input
                    class="select-msg-search-ipt"
                    placeholder="请根据券编码搜索"
                    prefix-icon="el-icon-search"
                    @keyup.enter.native="searchDate"
                    v-model="propsData.SearchSales">
                  </el-input>
                </div>
                <div class="select-msg-table">
                  <el-table :data="salesTable" style="width: 100%" height="220" @selection-change="ifChecked">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="sal_id" label="劵编码" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="coupon_type" label="类型" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="brand" label="品牌" show-overflow-tooltip> </el-table-column>
                    <el-table-column  label="详情" show-overflow-tooltip>
                      <template slot-scope="scope">{{scope.row.act_desc}}</template>
                    </el-table-column>
                    <el-table-column prop="created_time" label="创建时间" :formatter="formatDate" show-overflow-tooltip> </el-table-column>
                  </el-table>
                </div>
                <div class="select-msg-page">
                  <el-pagination
                    @current-change="handleSizeChange"
                    :current-page.sync="currentPage"
                    :page-size="10"
                    class="page-el-pagination"
                    background
                    layout="total, prev, pager, next"
                    :total="propsData.salesTable.length">
                  </el-pagination>
                </div>
              </div>
            </el-col>
          </div>
        </el-col>
        <span slot="footer">
          <el-button @click="openDataContentProps = false" >Cancel</el-button>
          <el-button type="primary" @click="backlevel(2)">Summary</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-if="propsData.routerType == 2">
      <el-dialog
        :visible.sync="openDataProps"
        :close-on-click-modal="false"
        width="60%">
        <span slot="title" class="data-title">
          <span class="icon-shouye"></span>Data Extension Summary
        </span>
        <div class="data-content">
          <p>
            <span class="redStar">*</span>Data Extension
          </p>
          <div class="data-content-c" v-if="ifDataExtension == ''">
            <img src="../../../assets/img/noneData.png">
            <p class="c-explain-one">Let's get going!</p>
            <p>Select the data extension whose contacts should enter this journey</p>
            <el-button
              type="primary"
              class="c-explain-select"
              @click="clickPopup('openNext')"
            >Select Data Extension</el-button>
          </div>
          <div v-if="ifDataExtension != ''" class="data-content-apply">
            <p class="data-content-apply-header">
              <!-- <span style="font-size:16px;font-weight:600;">20180202-May_0192k</span> -->
              <span style="font-size:16px;font-weight:600;">DATA EXTENSION PROPERTIES</span>
              <el-button class="bth" @click="backlevel('edit')">Edit</el-button>
            </p>
            <div class="data-content-apply-content mt10">
              <P><span>品牌 : {{ifDataExtension.brand_name}}</span><span></span></P>
              <P><span>周期 : {{ifDataExtension.cycle_type}}</span><span></span></P>
              <P><span>渠道 : {{ifDataExtension.vip_channel_name}}</span><span></span></P>
              <P><span>是否新进入周期 : {{ifDataExtension.enter_first}}</span><span></span></P>
              <P><span>是否为首次购买 : {{ifDataExtension.purchase_first}}</span><span></span></P>
              <P><span>注册一周未购买 : {{ifDataExtension.purchase_week}}</span><span></span></P>
              <P><span>活动券 : {{ifDataExtension.camp_coupon_id}}</span><span></span></P>
              <P><span>优惠券 : {{ifDataExtension.coupon_id}}</span><span></span></P>
              <P><span>短信通道 : {{ifDataExtension.sms_channel_content}}</span><span></span></P>
              <P><span>调度命令 : {{ifDataExtension.command_code}}</span><span></span></P>
              <P><span>定时发送时间 : {{ifDataExtension.schulder_time}}</span><span></span></P>
            </div>
          </div>
        </div>
        <span slot="footer">
          <el-button @click="openDataProps = false">Cancel</el-button>
          <el-button  @click="openDataProps = false" type="primary">Done</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="openDataContentProps"
        :close-on-click-modal="false"
        class="data-content"
        :show-close="false"
        width="98%">
        <el-col :span="3" class="data-content-l">
          <div class="data-content-summary" :class="{'data-Selected':dataSelected == 1}" @click="tabSelect(1)">
            <span>
              <i class="icon-shouye"></i>
            </span>
            <p class="summary-title mt10">Summary</p>
          </div>
          <div class="data-content-summary" :class="{'data-Selected':dataSelected == 2}" @click="tabSelect(2)">
            <p>
              <i class="redStar">*</i>Data
            </p>
            <p>Extension</p>
          </div>
          <div class="data-content-summary" :class="{'data-Selected':dataSelected == 3}" @click="tabSelect(3)">
            <p><i class="redStar">*</i>Sales</p>
            <p>Promotion</p>
          </div>
        </el-col>
        <el-col :span="21" v-if="this.dataSelected == 2" class="data-content-r">
          <div class="r-header">
            <p class="r-header-t">
              <span>Data Extension</span>
              <span class="el-icon-back" @click="backlevel(1)"></span>
            </p>
            <p class="r-header-b">Select your audience to enter the Journey</p>
          </div>
          <div class="r-content">
            <el-col :span="5" class="r-content-l">
              <p class="r-content-l-t">Folders</p>
              <el-tree :data="dataExtensions" class="r-content-l-b">
                <span slot-scope="{ node, data }">
                  <span>
                    <i :class="data.con"></i>
                    <i :class="data.icon"></i>
                    {{ node.label }}
                  </span>
                </span>
              </el-tree>
            </el-col>
            <el-col :span="1" class="r-content-c">
              <span></span>
            </el-col>
            <el-col :span="19" class="r-content-r">
              <div class="select-option">
                <el-col :span="12">
                  <div class="ml10">
                    <span class="redStar">*</span>
                    <span>选择品牌</span>
                    <el-select v-model="propsData.brandVal" clearable placeholder="请选择品牌" class="select-option-classify">
                      <el-option
                        v-for="item in propsData.brandList"
                        :key="item.id"
                        :value="item.brand_name"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="ml10">
                    <span class="redStar">*</span>
                    <span>选择周期</span>
                    <el-select v-model="propsData.periodVal"  clearable placeholder="请选择周期" class="select-option-classify">
                      <el-option
                        @click.native="periodChange()"
                        v-for="item in propsData.periodList"
                        :key="item.id"
                        :value="item.cycle_type"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="ml10">
                    <span class="redStar">*</span>
                    <span>注册渠道</span>
                    <el-select v-model="propsData.registerVal" clearable multiple placeholder="请选择注册渠道" class="select-option-classify">
                      <el-option
                        v-for="item in propsData.registerList"
                        :key="item.id"
                        :value="item.channel_name"
                      ></el-option>
                    </el-select>
                  </div>
                  <!-- <div class="ml10">
                    <span class="redStar">*</span>
                    <span>短信通道</span>
                    <el-select v-model="propsData.sendSmsVal" clearable placeholder="请选择短信通道" class="select-option-classify">
                      <el-option
                        v-for="item in propsData.sendSmsList"
                        :key="item.id"
                        :value="item.channel_content"
                      ></el-option>
                    </el-select>
                  </div> -->
                </el-col>
                <el-col :span="12">
                  <div class="ml10 mt20">
                    <span class="redStar">*</span>
                    <span>定时发送时间</span>
                    <el-date-picker
                      v-model="propsData.dateTimeVal"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                  <div class="select-option-ipt" v-if="ifNewPeriod">
                    <span class="mr15">是否新进入周期:</span>
                    <el-radio v-model="propsData.newPeriod" label="是">是</el-radio>
                    <el-radio v-model="propsData.newPeriod" label="否">否</el-radio>
                  </div>
                  <div class="select-option-ipt" v-if="ifNewBuy">
                    <span class="mr15">是否为首次购买:</span>
                    <el-radio v-model="propsData.newBuy" label="是">是</el-radio>
                    <el-radio v-model="propsData.newBuy" label="否">否</el-radio>
                  </div>
                  <div class="select-option-ipt" v-if="ifNewMbmber">
                    <span class="mr15">注册一周未购买:</span>
                    <el-radio v-model="propsData.newMbmber" label="是">是</el-radio>
                    <el-radio v-model="propsData.newMbmber" label="否">否</el-radio>
                  </div>
                </el-col>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="21" v-if="this.dataSelected == 3" class="data-content-r">
          <div class="r-header">
            <p class="r-header-t">
              <span>Sales Promotion</span>
              <span class="el-icon-back" @click="backlevel(1)"></span>
            </p>
            <p class="r-header-b">Select your audience to enter the Journey</p>
          </div>
          <div class="r-content">
            <el-col :span="5" class="r-content-l">
              <p class="r-content-l-t">Folders</p>
              <el-tree :data="SalesPromotions" class="r-content-l-b">
                <span slot-scope="{ node, data }">
                  <span>
                    <i :class="data.con"></i>
                    <i :class="data.icon"></i>
                    {{ node.label }}
                  </span>
                </span>
              </el-tree>
            </el-col>
            <el-col :span="1" class="r-content-c">
              <span></span>
            </el-col>
            <el-col :span="19" class="r-content-r">
              <div class="select-msg">
                <div class="select-msg-search">
                  <el-input
                    class="select-msg-search-ipt"
                    placeholder="请根据券编码搜索"
                    prefix-icon="el-icon-search"
                    @keyup.enter.native="searchDate"
                    v-model="propsData.SearchSales">
                  </el-input>
                </div>
                <div class="select-msg-table">
                  <el-table :data="salesTable" style="width: 100%" height="220" ref="multipleTable" @selection-change="ifChecked">
                    <el-table-column type="selection"  width="55"></el-table-column>
                    <el-table-column prop="sal_id" label="劵编码" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="coupon_type" label="类型" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="brand" label="品牌" show-overflow-tooltip> </el-table-column>
                    <el-table-column  label="详情" show-overflow-tooltip>
                      <template slot-scope="scope">{{scope.row.act_desc}}</template>
                    </el-table-column>
                    <el-table-column prop="created_time" label="创建时间" :formatter="formatDate" show-overflow-tooltip> </el-table-column>
                  </el-table>
                </div>
                <div class="select-msg-page">
                  <el-pagination
                    @current-change="handleSizeChange"
                    :current-page.sync="currentPage"
                    :page-size="10"
                    class="page-el-pagination"
                    background
                    layout="total, prev, pager, next"
                    :total="propsData.salesTable.length">
                  </el-pagination>
                </div>
              </div>
            </el-col>
          </div>
        </el-col>
        <span slot="footer">
          <el-button @click="openDataContentProps = false" >Cancel</el-button>
          <el-button type="primary" @click="backlevel(2)">Summary</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import "@/assets/css/part.less";
import { setInterval } from 'timers';
export default {
  name: "popupDrag",
  data() {
    return {
      dataSelected: 2,
      dataExtensions: [
        {
          label: "Data Extensions",
          con: "el-icon-arrow-right",
          icon: "icon-wenjian"
        }
      ],
      SalesPromotions:[
        {
          label: "Sales Promotion",
          con: "el-icon-arrow-right",
          icon: "icon-wenjian"
        }
      ],
      ifNewPeriod:false,
      ifNewBuy:false,
      ifNewMbmber:false,
      multipleSelection:[],
      // 分页
      currentPage: 1
    };
  },
  props: ["openData", "openDataContent","propsData","ifDataExtension"],
  computed: {
    openDataProps: {
      get() {
        return this.openData
      },
      set(v) {
        this.$emit('sltDataContent', 'close');
      }
    },
    openDataContentProps:{
      get() {
        return this.openDataContent
      },
      set(v) {
        this.$emit('sltDataContent', 'close1');
      }
    },
    salesTable() {
      let result = [];
      for(var i=0;i<this.propsData.salesTable.length;i+=10){
          result.push(this.propsData.salesTable.slice(i,i+10));
      }
      return result[this.currentPage-1]
    },
  },
  created() {
    if(this.propsData.routerType == 2) {
      if(this.propsData.periodVal != '') {
        this.ifNewPeriod = true
      }
      if(this.propsData.periodVal == 1 || this.propsData.periodVal == '注册期') {
        this.ifNewMbmber = true
        this.ifNewBuy = false
      }else{
        this.ifNewBuy = true
        this.ifNewMbmber = false
      }
    }
  },
  methods: {
    defaultdate() {
      // 活动券
      let arr = this.ifDataExtension.camp_coupon_id.split(',')
      let arr2 = this.ifDataExtension.coupon_id.split(',')
      arr = arr.concat(arr2)
      let result_arr = []
      for(var i=0;i<arr.length;i++) {
        for(var j=0;j<this.propsData.salesTable.length;j++) {
          if(arr[i] == this.propsData.salesTable[j].sal_id) {
            result_arr.push(this.propsData.salesTable[j])
          }
        }
      }
      this.ifChecked(result_arr)
    },
    checked() {
      // 活动券
      if(this.propsData.routerType == 1) {return false}
      let arr = this.ifDataExtension.camp_coupon_id.split(',')
      let arr2 = this.ifDataExtension.coupon_id.split(',')
      arr = arr.concat(arr2)
      let result_arr = []
      for(var i=0;i<arr.length;i++) {
        for(var j=0;j<this.propsData.salesTable.length;j++) {
          if(arr[i] == this.propsData.salesTable[j].sal_id) {
            result_arr.push(this.propsData.salesTable[j])
          }
        }
        // 优惠券
      result_arr.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row,true)
      });
      }
    },
    formatDate(row, column, created_time ,index) {
      if(created_time==null || created_time=="") return "";
      let date = new Date(created_time);
      let Y = date.getFullYear() + '-';
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D ;
    },
    // 搜索框
    searchDate(e) {
      this.$emit('searchDate', e)
    },
    // 监听
    clickPopup(value) {
      this.$emit("sltDataContent", value);
    },
    // 取消  确定
    backlevel(val) {
      this.$emit("backlevel",val)
    },
    ifChecked(val) {
      this.multipleSelection = val
      let allTicket = {
        active:[],
        discounts:[]
      }
      for (var i = 0; i < this.multipleSelection.length; i++) {
        let str = this.multipleSelection[i].sal_id
        let ticketStr = this.multipleSelection[i].coupon_type
        if(ticketStr == "活动券") {
          allTicket.active.push(str)
        }else if(ticketStr == "优惠券"){
          allTicket.discounts.push(str)
        }
      }
      this.$emit('ifCheckedVal', allTicket)
    },
    tabSelect(val) {
      if (val == '1') {
        this.$emit("backlevel",val)
      } else {
        this.dataSelected = val
        if (val == '3') {
          this.$nextTick(() => {
          this.checked()

          })
        }
      }
    },
    periodChange() {
      if(this.propsData.periodVal != '') {
        this.ifNewPeriod = true
      }
      if(this.propsData.periodVal == 1 || this.propsData.periodVal == '注册期') {
        this.ifNewMbmber = true
        this.ifNewBuy = false
        this.propsData.newBuy = ''
      }else{
        this.ifNewBuy = true
        this.ifNewMbmber = false
      }
    },
    // 翻页
    handleSizeChange(val) {
      this.currentPage = val
      if(this.propsData.routerType == 2) {
        this.checked()
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>



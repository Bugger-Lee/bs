<template>
  <div class="popupDrag">
    <el-dialog
      :visible.sync="openDataProps"
      :close-on-click-modal="false"
      width="50%">
      <span slot="title" class="data-title">
        <span class="icon-quanyi-copy-copy" style="background-color:#ffcd43;"></span>Promotion Summary
      </span>
      <div class="data-content">
        <p>
          <span class="redStar">*</span>Promotion
        </p>
        <div class="data-content-c" v-if="propsTicket.ifPromotion == ''">
          <img src="../../../../assets/img/noneData.png">
          <p class="c-explain-one">Let's get going!</p>
          <p>Select the data extension whose contacts should enter this journey</p>
          <el-button
            type="primary"
            class="c-explain-select"
            @click="clickPopup('openNext')"
          >Select Promotion</el-button>
        </div>
        <div v-if="propsTicket.ifPromotion != ''" class="data-content-apply" style="min-height:100px;">
          <p class="data-content-apply-header">
            <span style="font-size:16px;font-weight:600;">DATA EXTENSION PROPERTIES</span>
            <el-button class="bth" @click="PromotionLevel('edit')" v-if="this.statusTestRunVal != 2">Edit</el-button>
          </p>
          <div class="data-content-apply-content mt10">
            <P class="pttb" v-if="propsTicket.ifPromotion.camp_coupon_id != ''"><span>Promotion ID : {{propsTicket.ifPromotion.camp_coupon_id}}</span><span></span></P>
            <P class="pttb" v-if="propsTicket.ifPromotion.coupon_id != ''"><span>Discount ID : {{propsTicket.ifPromotion.coupon_id}}</span><span></span></P>
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
      class="data-content minWidthNum"
      :show-close="false"
      width="98%">
      <el-col :span="3" class="data-content-l">
        <div class="data-content-summary" :class="{'data-Selected':dataSelected == 1}" @click="tabSelect(1)">
          <span style="background-color:#ffcd43;">
            <i class="icon-quanyi-copy-copy"></i>
          </span>
          <p class="summary-title mt10">Summary</p>
        </div>
        <div class="data-content-summary" :class="{'data-Selected':dataSelected == 3}" @click="tabSelect(3)">
          <p><i class="redStar">*</i>Sales</p>
          <p>Promotion</p>
        </div>
      </el-col>
      <el-col :span="21" v-if="this.dataSelected == 3" class="data-content-r">
        <div class="r-header">
          <p class="r-header-t">
            <span>Sales Promotion</span>
            <span class="el-icon-back" @click="PromotionLevel(1)"></span>
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
                  placeholder="Search by coupon"
                  prefix-icon="el-icon-search"
                  style="width:45%;"
                  @keyup.enter.native="searchDate"
                  v-model="propsTicket.SearchSales">
                </el-input>
              </div>
              <div class="select-msg-table">
                <el-table :data="salesTable" ref="multipleTable" style="width: 100%" height="220" @selection-change="ifChecked">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="sal_id" label="Coupon ID" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="coupon_type" label="Type" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="brand" label="Brand" show-overflow-tooltip> </el-table-column>
                  <el-table-column  label="Content" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.act_desc}}</template>
                  </el-table-column>
                  <el-table-column prop="created_time" label="Create Time" :formatter="formatDate" show-overflow-tooltip> </el-table-column>
                </el-table>
              </div>
              <div class="select-msg-page">
                <el-pagination
                  @current-change="handleSizeChange"
                  :current-page.sync="currentPage"
                  :page-size="10"
                  class="page-el-pagination"
                  background
                  layout="slot,prev, pager, next"
                  :total="propsTicket.salesTable.length"
                  >
                  <slot>
                    <span>All {{propsTicket.salesTable.length}} Item</span>
                  </slot>
                </el-pagination>
              </div>
            </div>
          </el-col>
        </div>
      </el-col>
      <span slot="footer">
        <el-button @click="PromotionLevel('cancel')" >Cancel</el-button>
        <el-button type="primary" @click="PromotionLevel(2)">Summary</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "@/assets/css/part.less";
import { setInterval } from 'timers';
export default {
  name: "popupDrag",
  data() {
    return {
      dataSelected: 3,
      SalesPromotions:[
        {
          label: "Sales Promotion",
          con: "el-icon-arrow-right",
          icon: "icon-wenjian"
        }
      ],
      multipleSelection:[],
      // 分页
      currentPage: 1
    };
  },
  props: ["openData", "openDataContent","propsTicket","statusTestRunVal"],
  computed: {
    openDataProps: {
      get() {
        return this.openData
      },
      set(v) {
        this.$emit('sltPromotion', 'close');
      }
    },
    openDataContentProps:{
      get() {
        if(this.openDataContent) {
            setTimeout(()=>{
              this.checked()
            },500)
        }
        return this.openDataContent
      },
      set(v) {
        this.$emit('sltPromotion', 'close1');
      }
    },
    salesTable() {
      let result = [];
      for(var i=0;i<this.propsTicket.salesTable.length;i+=10){
          result.push(this.propsTicket.salesTable.slice(i,i+10));
      }
      return result[this.currentPage-1]
    },
  },
  methods: {
    // 搜索框
    searchDate(e) {
      this.$emit('searchDate', e)
    },
    // 监听
    clickPopup(value) {
      this.$emit("sltPromotion", value);
    },
    // 取消  确定
    PromotionLevel(val) {
      this.$emit("PromotionLevel",val)
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
    checked() {
      if(!this.propsTicket.ifPromotion.camp_coupon_id && !this.propsTicket.ifPromotion.coupon_id) {
        return false
      }else{
        let arr = this.propsTicket.ifPromotion.camp_coupon_id.split(',')
        let arr2 = this.propsTicket.ifPromotion.coupon_id.split(',')
        arr = arr.concat(arr2)
        let result_arr = []
        for(var i=0;i<arr.length;i++) {
          for(var j=0;j<this.propsTicket.salesTable.length;j++) {
            if(arr[i] == this.propsTicket.salesTable[j].sal_id) {
              result_arr.push(this.propsTicket.salesTable[j])
            }
          }
          result_arr.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row,true)
          })
        }
      }
    },
    tabSelect(val) {
      if (val == '1') {
        this.$emit("PromotionLevel",val)
      } else {
        this.dataSelected = val
        this.$nextTick(() => {
          this.checked()
        })
      }
    },
    // 翻页
    handleSizeChange(val) {
      this.currentPage = val
      this.checked()
    }
  }
};
</script>
<style lang="less" scoped>
</style>



<template>
  <div class="popupDrag">
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
        <div class="data-content-c">
          <img src="@/assets/img/noneData.png">
          <p class="c-explain-one">Let's get going!</p>
          <p>Select the data extension whose contacts should enter this journey</p>
          <el-button
            type="primary"
            class="c-explain-select"
            @click="clickPopup('openNext')"
          >Select Data Extension</el-button>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="openDataProps = false">Cancel</el-button>
        <el-button type="primary">Done</el-button>
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
                  <el-select v-model="propsData.registerVal" clearable placeholder="请选择注册渠道" class="select-option-classify">
                    <el-option
                      v-for="item in propsData.registerList"
                      :key="item.id"
                      :label="item.channel_name"
                      :value="item.channel_name"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="select-option-ipt" v-if="ifNewPeriod">
                  <span class="mr15">是否为新进入周期:</span>
                  <el-radio v-model="newPeriod" label="1">是</el-radio>
                  <el-radio v-model="newPeriod" label="2">否</el-radio>
                </div>
                <div class="select-option-ipt" v-if="ifNewBuy">
                  <span class="mr15">是否为首次购买:</span>
                  <el-radio v-model="newBuy" label="1">是</el-radio>
                  <el-radio v-model="newBuy" label="2">否</el-radio>
                </div>
                <div class="select-option-ipt" v-if="ifNewMbmber">
                  <span class="mr15">是否为注册一周未购买会员:</span>
                  <el-radio v-model="newMbmber" label="1">是</el-radio>
                  <el-radio v-model="newMbmber" label="2">否</el-radio>
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
                  placeholder="Search"
                  prefix-icon="el-icon-search"
                  @keyup.enter.native="searchDate"
                  v-model="propsData.SearchSales">
                </el-input>
              </div>
              <div class="select-msg-table">
                <el-table :data="propsData.salesTable" style="width: 100%" height="220">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="sal_id" label="劵编码" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="coupon_type" label="类型" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="brand" label="品牌" show-overflow-tooltip> </el-table-column>
                  <el-table-column  label="有效期" show-overflow-tooltip>
                     <template slot-scope="scope"> {{scope.row.start_date}} - ({{scope.row.end_date}}) </template>
                  </el-table-column>
                  <el-table-column prop="created_time" label="创建时间" show-overflow-tooltip> </el-table-column>
                </el-table>
              </div>
              <div class="select-msg-page">
                <p class="select-msg-page-l">
                  <span>1 to 25 of 268 items</span>
                  <el-select v-model="pageVal" placeholder="25" class="sizebig">
                    <el-option
                      v-for="item in pageList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </p>
                <p class="select-msg-page-r">
                  <span>page</span>
                  <input type="text" value="1" v-model="pageRightVal" class="r-ipt"/>
                  <span>of 11</span>
                </p>
              </div>
            </div>
          </el-col>
        </div>
      </el-col>
      <span slot="footer">
        <el-button @click="openDataContentProps = false" >Cancel</el-button>
        <el-button type="primary" @click="openDataContentProps = false">Summary</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "@/assets/css/part.less";
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
        pageList: [{
          label: '10'
        }, {
          label: '20'
        }, {
          label: '30'
        }],
        pageVal:'',
        newPeriod:'',
        newBuy:'',
        newMbmber:'',
        pageRightVal:'',
        ifNewPeriod:false,
        ifNewBuy:false,
        ifNewMbmber:false
    };
  },
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
    }
  },
  props: ["openData", "openDataContent","propsData"],
  methods: {
    searchDate(e) {
      this.$emit('searchDate', e)
    },
    clickPopup(value) {
      this.$emit("sltDataContent", value);
    },
    backlevel(val) {
      this.$emit("backlevel",val)
    },
    tabSelect(val) {
      this.dataSelected = val
    },
    periodChange() {
      if(this.propsData.periodVal != '') {
        this.ifNewPeriod = true
      }
      if(this.propsData.periodVal == 1) {
        this.ifNewMbmber = true
        this.ifNewBuy = false
      }else{
        this.ifNewBuy = true
         this.ifNewMbmber = false
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>



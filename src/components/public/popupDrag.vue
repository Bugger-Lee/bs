<template>
  <div class="popupDrag">
    <el-dialog
      :visible.sync="openDataProps"
      :close-on-click-modal="false"
      width="60%">
      <span slot="title" class="data-title">
        <span class="icon-shouye"></span>{{popupDatas.popupOneTitle1}}
      </span>
      <div class="data-content">
        <p>
          <span class="redStar">*</span>{{popupDatas.popupOneTitle2}}
        </p>
        <div class="data-content-c">
          <img src="@/assets/img/noneData.png">
          <p class="c-explain-one">{{popupDatas.pupupImgTit1}}</p>
          <p>{{popupDatas.pupupImgTit2}}</p>
          <el-button
            type="primary"
            class="c-explain-select"
            @click="clickPopup('openNext')"
          >{{popupDatas.popupBtn}}</el-button>
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
          <p class="summary-title mt10">{{popupDatas.tabSelect1}}</p>
        </div>
        <div class="data-content-summary" :class="{'data-Selected':dataSelected == 2}" @click="tabSelect(2)">
          <p>
            <i class="redStar">*</i>{{popupDatas.tabSelect2One}}
          </p>
          <p>{{popupDatas.tabSelect2Two}}</p>
        </div>
        <div class="data-content-summary" :class="{'data-Selected':dataSelected == 3}" @click="tabSelect(3)">
          <p><i class="redStar">*</i>{{popupDatas.tabSelect3One}}</p>
          <p>{{popupDatas.tabSelect3Two}}</p>
        </div>
      </el-col>
      <el-col :span="21" v-if="this.dataSelected == 2" class="data-content-r">
        <div class="r-header">
          <p class="r-header-t">
            <span>{{popupDatas.popupTwoTit1}}</span>
            <span class="el-icon-back"></span>
          </p>
          <p class="r-header-b">{{popupDatas.popupTwoTit2}}</p>
        </div>
        <div class="r-content">
          <el-col :span="5" class="r-content-l">
            <p class="r-content-l-t">Folders</p>
            <el-tree :data="popupDatas.dataExtensions" class="r-content-l-b">
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
                  <el-select v-model="brandVal" clearable placeholder="请选择品牌" class="select-option-classify">
                    <el-option
                      v-for="item in brandList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="ml10">
                  <span class="redStar">*</span>
                  <span>选择周期</span>
                  <el-select v-model="periodVal" clearable placeholder="请选择周期" class="select-option-classify">
                    <el-option
                      v-for="item in periodList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="ml10">
                  <span class="redStar">*</span>
                  <span>选择周期</span>
                  <el-select v-model="registerVal" clearable placeholder="请选择注册渠道" class="select-option-classify">
                    <el-option
                      v-for="item in registerList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="select-option-ipt">
                  <span class="mr15">是否为新进入周期:</span>
                  <el-radio v-model="newPeriod" label="1">是</el-radio>
                  <el-radio v-model="newPeriod" label="2">否</el-radio>
                </div>
                <div class="select-option-ipt">
                  <span class="mr15">是否为首次购买:</span>
                  <el-radio v-model="newBuy" label="1">是</el-radio>
                  <el-radio v-model="newBuy" label="2">否</el-radio>
                </div>
                <div class="select-option-ipt">
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
            <span>{{popupDatas.popupthreeTit1}}</span>
            <span class="el-icon-back"></span>
          </p>
          <p class="r-header-b">{{popupDatas.popupthreeTit2}}</p>
        </div>
        <div class="r-content">
          <el-col :span="5" class="r-content-l">
            <p class="r-content-l-t">Folders</p>
            <el-tree :data="popupDatas.SalesPromotions" class="r-content-l-b">
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
                  v-model="SearchSales">
                </el-input>
              </div>
              <div class="select-msg-table">
                <el-table :data="popupDatas.salesTable" style="width: 100%" height="220">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="date" :label="popupDatas.popupTable1" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="name" :label="popupDatas.popupTable2" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="address" :label="popupDatas.popupTable3" show-overflow-tooltip> </el-table-column>
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
        <el-button @click="openDataContentProps = false">Cancel</el-button>
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
      brandList: [{
          value: '1',
          label: '黄金糕'
        }, {
          value: '2',
          label: '双皮奶'
        }, {
          value: '3',
          label: '蚵仔煎'
        }],
        periodList: [{
          value: '1',
          label: '周期1'
        }, {
          value: '2',
          label: '周期2'
        }, {
          value: '3',
          label: '周期3'
        }],
        registerList: [{
          value: '1',
          label: '渠道1'
        }, {
          value: '2',
          label: '渠道2'
        }, {
          value: '3',
          label: '渠道3'
        }],
        pageList: [{
          label: '10'
        }, {
          label: '20'
        }, {
          label: '30'
        }],
        pageVal:'',
        brandVal: '',
        periodVal:'',
        registerVal:'',
        newPeriod:'',
        newBuy:'',
        newMbmber:'',
        SearchSales:'',
        pageRightVal:''
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
        this.$emit('sltDataContent', v);
      }
    }
  },
  props: ["openData", "openDataContent","popupDatas"],
  methods: {
    clickPopup(value) {
      this.$emit("sltDataContent", value);
    },
    tabSelect(val) {
      this.dataSelected = val
    }
  }
};
</script>
<style lang="less" scoped>
</style>



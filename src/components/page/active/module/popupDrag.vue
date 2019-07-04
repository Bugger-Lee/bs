<template>
  <div class="popupDrag">
    <el-dialog
      :visible.sync="openDataProps"
      :close-on-click-modal="false"
      width="60%">
      <span slot="title" class="data-title">
        <span class="icon-dbsshujukubeifenDBS-copy-copy-copy"></span>Data Extension Summary
      </span>
      <div class="data-content">
        <p>
          <span class="redStar">*</span>Data Extension
        </p>
        <div class="data-content-c" v-if="ifDataExtension == ''">
          <img src="../../../../assets/img/noneData.png">
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
            <span style="font-size:16px;font-weight:600;">DATA EXTENSION PROPERTIES</span>
            <el-button class="bth" @click="backlevel('edit')" v-if="this.statusTestRunVal != 2">Edit</el-button>
          </p>
          <div class="data-content-apply-content mt10">
            <P class="pttb" v-if="ifDataExtension.brandShow"><span>Brands : {{ifDataExtension.brandShow}}</span><span></span></P>
            <P class="pttb" v-if="ifDataExtension.periodShow"><span>Periods : {{ifDataExtension.periodShow}}</span><span></span></P>
            <P class="pttb" v-if="ifDataExtension.crowd_name"><span>Crowd Name : {{ifDataExtension.crowd_name}}</span><span></span></P>
            <P class="pttb" v-if="ifDataExtension.register"><span>Registered Channels : {{ifDataExtension.register}}</span><span></span></P>
            <P class="pttb" v-if="ifDataExtension.reg_brand_id_show"><span>Registered Brands : {{ifDataExtension.reg_brand_id_show}}</span><span></span></P>
            <P class="pttb" v-if="ifDataExtension.newPeriod"><span>New Entry : {{ifDataExtension.newPeriod}}</span><span></span></P>
            <P class="pttb" v-if="ifDataExtension.newBuy"><span>First Purchase : {{ifDataExtension.newBuy}}</span><span></span></P>
            <P class="pttb" v-if="ifDataExtension.newMbmber"><span>No Purchase (within a week) : {{ifDataExtension.newMbmber}}</span><span></span></P>
            <P class="pttb" v-if="ifDataExtension.excluded_guide"><span>是否排除导购 : {{ifDataExtension.excluded_guide}}</span><span></span></P>
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
            <i class="icon-dbsshujukubeifenDBS-copy-copy-copy"></i>
          </span>
          <p class="summary-title mt10">Summary</p>
        </div>
        <div class="data-content-summary" :class="{'data-Selected':dataSelected == 2}" @click="tabSelect(2)">
          <p>
            <i class="redStar">*</i>Data
          </p>
          <p>Extension</p>
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
          <el-col :span="19" class="r-content-r" v-if="propsData.data_socure == 'CLV-Data'">
            <div class="select-option">
              <el-col :span="12">
                <div class="ml10">
                  <span class="redStar">*</span>
                  <span>Select Brands</span>
                  <el-select v-model="propsData.brandVal" clearable placeholder="Pls select brands" class="select-option-classify">
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
                  <span>Select Periods</span>
                  <el-select v-model="propsData.periodVal"  clearable placeholder="Pls select periods" class="select-option-classify">
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
                  <span>Registered Channels</span>
                  <el-select v-model="propsData.registerVal" clearable multiple placeholder="Pls select registered channels" class="select-option-classify">
                    <el-option
                      v-for="item in propsData.registerList"
                      :key="item.id"
                      :value="item.channel_name"
                    ></el-option>
                  </el-select>
                </div>
                <div class="ml10">
                  <span>Registered Brands</span>
                  <el-select v-model="propsData.regBrandVal" clearable placeholder="Pls select brands" class="select-option-classify">
                    <el-option
                      v-for="item in propsData.brandList"
                      :key="item.id"
                      :label="item.brand_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="select-option-ipt" v-if="ifNewPeriod">
                  <span class="mr15">New Entry:</span>
                  <el-radio v-model="propsData.newPeriod" label="Y">Yes</el-radio>
                  <el-radio v-model="propsData.newPeriod" label="N">No</el-radio>
                </div>
                <div class="select-option-ipt" v-if="ifNewBuy">
                  <span class="mr15">First Purchase:</span>
                  <el-radio v-model="propsData.newBuy" label="Y">Yes</el-radio>
                  <el-radio v-model="propsData.newBuy" label="N">No</el-radio>
                </div>
                <div class="select-option-ipt" v-if="ifNewMbmber">
                  <span class="mr15">No Purchase</span>  
                  <el-radio v-model="propsData.newMbmber" label="Y">Yes</el-radio>
                  <el-radio v-model="propsData.newMbmber" label="N">No</el-radio>
                </div>
                <p v-if="ifNewMbmber">
                  <span class="mr15" style="color:red;font-size:10px;">(within a week)</span>  
                </p>
                <div class="select-option-ipt">
                  <span class="mr15">是否排除导购:</span>
                  <el-radio label="Y" v-model="propsData.shoppings">Yes</el-radio>
                  <el-radio label="N" v-model="propsData.shoppings">No</el-radio>
                </div>
              </el-col>
            </div>
          </el-col>
          <el-col :span="19" class="r-content-r" v-if="propsData.data_socure == 'DMP-Data'">
            <div class="select-msg">
              <div class="select-msg-search">
                <el-col :span="12">
                  <el-input
                    class="select-msg-search-ipt"
                    placeholder="Search by Title"
                    prefix-icon="el-icon-search"
                    style="width:85%;"
                    @keyup.enter.native="searchDmpList"
                    v-model="propsData.SearchDmp">
                  </el-input>
                </el-col>
                <el-col :span="12">
                  <div class="ml10">
                    <span class="redStar">*</span>
                    <span>Select Brands</span>
                    <el-select v-model="propsData.brandVal" clearable placeholder="Pls select brands" class="select-option-classify">
                      <el-option
                        v-for="item in propsData.brandList"
                        :key="item.id"
                        :label="item.brand_name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </div>
              <div class="select-msg-table">
                <el-table :data="dmpTable" style="width: 100%" highlight-current-row  @current-change="dmpTableIndex" height="220">
                  <el-table-column prop="name" label="Crowd Title" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="crowd_count" label="Quantity" show-overflow-tooltip> </el-table-column>
                  <!-- <el-table-column prop="status" label="Status" show-overflow-tooltip></el-table-column> -->
                  <el-table-column prop="creator" label="Creator" show-overflow-tooltip> </el-table-column>
                  <el-table-column prop="create_time" label="Create Time" show-overflow-tooltip> </el-table-column>
                  <el-table-column prop="update_time" label="Update Time" :formatter="formatDate" show-overflow-tooltip> </el-table-column>
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
                  :total="propsData.dmpTable.length"
                  >
                  <slot>
                    <span>All {{propsData.dmpTable.length}} Item</span>
                  </slot>
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
      ifNewPeriod:false,
      ifNewBuy:false,
      ifNewMbmber:false,
      currentPage:1
    };
  },
  props: ["openData", "openDataContent","propsData","ifDataExtension","statusTestRunVal"],
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
    dmpTable() {
      let result = [];
      for(var i=0;i<this.propsData.dmpTable.length;i+=10){
          result.push(this.propsData.dmpTable.slice(i,i+10));
      }
      return result[this.currentPage-1]
    },
  },
  methods: {
    // 监听
    clickPopup(value) {
      this.$emit("sltDataContent", value);
    },
    // dmp列表搜索
    searchDmpList(e) {
      this.$emit('searchDmpList',e)
    },
    // 取消  确定
    backlevel(val) {
      this.$emit("backlevel",val)
    },
    dmpTableIndex(val) {
      if(!val) {
        return false
      }
      val.DmpName='dmpTableIndex'
      this.$emit("sltDataContent", val);
    },
    tabSelect(val) {
      if (val == '1') {
        this.$emit("backlevel",val)
      } else {
        this.dataSelected = val
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
        this.propsData.newMbmber = ''
      }
    },
    handleSizeChange(val) {
      this.currentPage = val
    }
  }
};
</script>
<style lang="less" scoped>
</style>



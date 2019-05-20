<template>
  <div class="popupDrag">
    <el-dialog
      :visible.sync="openDataProps"
      :close-on-click-modal="false"
      width="60%">
      <span slot="title" class="data-title">
        <span class="icon-shouye"></span>SMS Activity Summary
      </span>
      <div class="data-content">
        <p>
          <span class="redStar">*</span>Message Definition
        </p>
        <div class="data-content-c">
          <img src="@/assets/img/noneData2.png" style="height:240px;">
          <p class="c-explain-one">Let's get started!</p>
          <p>Select or create a message</p>
          <el-button
            type="primary"
            class="c-explain-select"
            @click="clickPopup('openNext')"
          >Select Message</el-button>
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
          <p class="summary-title mt10">Summary</p>
        </div>
        <div class="data-content-summary" :class="{'data-Selected':dataSelected == 2}" @click="tabSelect(2)">
          <p>
            <i class="redStar">*</i>Message
          </p>
          <p>Definition</p>
        </div>
        <div class="data-content-summary" :class="{'data-Selected':dataSelected == 3}" @click="tabSelect(3)">
          <p><i class="redStar">*</i>Create</p>
          <p>Message</p>
        </div>
      </el-col>
      <el-col :span="21" v-if="this.dataSelected == 2" class="data-content-r">
        <div class="r-header">
          <p class="r-header-t">
            <span>Select an SMS Message</span>
            <span class="el-icon-back"></span>
          </p>
          <p class="r-header-b">Select a text message template</p>
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
              <div class="select-msg" >
                <div class="select-msg-search">
                  <el-input
                    class="select-msg-search-ipt"
                    placeholder="Search"
                    prefix-icon="el-icon-search"
                    v-model="SearchSms">
                  </el-input>
                </div>
                <div class="select-msg-table">
                  <el-table :data="smsTable" style="width: 100%" height="220">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="date" label="标题" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address" label="中心" show-overflow-tooltip> </el-table-column>
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
       <el-col :span="21" v-if="this.dataSelected == 3" class="data-content-r">
        <div class="r-sms-content">
          <div class="r-header">
            <p class="r-header-t">
              <span>Create Message</span>
              <span class="el-icon-close"></span>
            </p>
          </div>
          <div class="sms-edit">
            <el-col :span="8" class="sms-edit-l">
              <p class="sms-edit-l-tit">CONTENT</p>
              <div class="sms-edit-l-content">
                <p><i class="el-icon-edit"></i>Edit message template</p>
                <textarea rows="6" placeholder="请编辑短信模板" v-model="editMsg">

                </textarea>
              </div>
            </el-col>
            <el-col :span="16" class="sms-edit-r">
              <p class="sms-edit-r-tit">LOOK OVER</p>
              <div class="sms-edit-r-content">
                <div class="content-tit">
                  <span><i class="icon-dengluyonghu"></i></span>
                  <p style="font-size:13px;">[FROM NAME]</p>
                </div>
                <div class="content-tit-see ml15 mt20">
                  <span>{{this.editMsg}}</span>
                </div>
              </div>
            </el-col>
          </div>
        </div>
      </el-col>
      <span slot="footer">
        <el-button @click="openDataContentProps = false">Cancel</el-button>
        <el-button type="primary" @click="openDataContentProps = false">Save Meaasge</el-button>
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
          label: "SMS Content",
          con: "el-icon-arrow-right",
          icon: "icon-wenjian"
        }
      ],
      smsTable:[{}],
      pageList:[{}],
      pageVal:'',
      brandVal: '',
      periodVal:'',
      registerVal:'',
      newPeriod:'',
      newBuy:'',
      newMbmber:'',
      SearchSales:'',
      pageRightVal:'',
      SearchSms: '',
      editMsg:''
    }
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



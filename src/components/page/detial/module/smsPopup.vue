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
        <div class="data-content-c" v-if="propsSms.ifSms == ''">
          <img src="../../../../assets/img/noneData2.png" style="height:240px;">
          <p class="c-explain-one">Let's get started!</p>
          <p>Select or create a message</p>
          <el-button
            type="primary"
            class="c-explain-select"
            @click="clickPopup({name:'openNext'})"
          >Select Message</el-button>
        </div>
        <div v-if="propsSms.ifSms != ''" class="data-content-apply">
          <p class="data-content-apply-header">
            <span style="font-size:16px;font-weight:600;">Message Definition</span>
            <el-button class="bth" @click="clickPopup({name:'openNext'})">Edit</el-button>
          </p>
          <div class="data-content-apply-content mt10">
            <P><span>Content : {{propsSms.ifSms.template_text}}</span><span></span></P>
            <P><span>Sms Channel : {{propsSms.ifSms.sms_channel_content}}</span><span></span></P>
          </div>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="openDataProps = false">Cancel</el-button>
        <el-button type="primary" @click="openDataProps = false">Done</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="openDataContentProps"
      :close-on-click-modal="false"
      class="data-content"
      :show-close="false"
      width="98%">
      <el-col :span="3" class="data-content-l">
        <div class="data-content-summary" :class="{'data-Selected':propsSms.dataSelected == 1}" @click="tabSelect(1)">
          <p class="summary-title mt10">Summary</p>
        </div>
        <div class="data-content-summary" :class="{'data-Selected':propsSms.dataSelected == 2}" @click="tabSelect(2)">
          <p>
            <i class="redStar">*</i>Message
          </p>
          <p>Definition</p>
        </div>
        <div class="data-content-summary" :class="{'data-Selected':propsSms.dataSelected == 3}" @click="tabSelect(3)">
          <p><i class="redStar">*</i>Create</p>
          <p>Message</p>
        </div>
      </el-col>
      <el-col :span="21" v-if="propsSms.dataSelected == 2" class="data-content-r">
        <div class="r-header">
          <p class="r-header-t">
            <span>Select an SMS Message</span>
            <span class="el-icon-back"  @click="backlevelSms(1)"></span>
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
                  <el-col :span="12">
                    <el-input
                      class="select-msg-search-ipt"
                      placeholder="Search by Template"
                      prefix-icon="el-icon-search"
                      @keyup.enter.native="searchSmsList"
                      v-model="propsSms.SearchSms">
                    </el-input>
                  </el-col>
                  <el-col :span="12">
                    <div class="ml10">
                      <span class="redStar">*</span>
                      <span>Sms Channel</span>
                      <el-select v-model="propsSms.sendSmsVal" clearable placeholder="Pls Sms Channel" style="display:inline-block;"  class="select-option-classify">
                        <el-option
                          v-for="item in propsSms.sendSmsList"
                          :key="item.id"
                          :value="item.channel_content"
                        ></el-option>
                      </el-select>
                    </div>
                  </el-col>
                </div>
                <div class="select-msg-table">
                  <el-table :data="propsSms.smsTable" style="width: 100%" height="220" setCurrentRow>
                    <el-table-column prop="template_name" label="Template" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cycle_type" label="Period" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="brand_name" label="Brand" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="document_text" label="Sms Content" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span v-if="scope.$index != change_index" @click="clickText(scope.$index)">{{scope.row.document_text}}</span>
                        <el-input v-else :placeholder="scope.row.document_text" v-model="input_text" @blur="clickPopup({name:'inputBlur',value:input_text,id:scope.row.id})"></el-input>
                      </template>  
                    </el-table-column>
                    <el-table-column prop="create_time" label="Created Time" show-overflow-tooltip> </el-table-column>
                  </el-table>
                </div>
                <div class="select-msg-page">
                  <el-pagination
                  @size-change="handleSizeChange"
                  :current-page.sync="currentPage"
                  :page-size="10"
                  class="page-el-pagination"
                  background
                  layout="total, prev, pager, next"
                  :total="propsSms.smsTable.length">
                </el-pagination>
                </div>
              </div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="21" v-if="propsSms.dataSelected == 3" class="data-content-r">
        <div class="r-sms-content">
          <div class="r-header">
            <p class="r-header-t">
              <span>Create Message</span>
              <span class="el-icon-back" @click="backlevelSms(1)"></span>
            </p>
          </div>
          <div class="sms-edit">
            <el-col :span="8" class="sms-edit-l">
              <p class="sms-edit-l-tit">CONTENT</p>
              <div class="sms-edit-l-content">
                <p><i class="el-icon-edit"></i>Edit message template</p>
                <textarea rows="6" placeholder="请编辑短信模板" v-model="propsSms.editMsg">

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
                  <span>{{this.propsSms.editMsg}}</span>
                </div>
              </div>
            </el-col>
          </div>
        </div>
      </el-col>
      <span slot="footer">
        <el-button @click="openDataContentProps = false">Cancel</el-button>
        <el-button type="primary" @click="clickPopup({name:'saveMsg'})">Save Meaasge</el-button>
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
      dataExtensions: [
        {
          label: "SMS",
          icon: "icon-wenjian",
          id:1,
          children: [
            {
              id:2,
              label: 'sms Content',
              icon: "icon-wenjian",
            }
          ]
        }
      ],
      brandVal: '',
      periodVal:'',
      registerVal:'',
      newPeriod:'',
      newBuy:'',
      newMbmber:'',
      SearchSales:'',
      currentPage:1,
      change_index: -1, //点击的index
      input_text: ''
    }
  },
  computed: {
    openDataProps: {
      get() {
        return this.openData
      },
      set(v) {
        this.$emit('sltSmsContent', {name:'close'});
      }
    },
    openDataContentProps:{
      get() {
        return this.openDataContent
      },
      set(v) {
        this.$emit('sltSmsContent', {name:'close1'});
      }
    },
    smsTable() {
      let result = [];
      for(var j=0;j<this.propsSms.smsTable.length;j++){
          this.propsSms.smsTable[j].ifChange = true
      }
      for(var i=0;i<this.propsSms.smsTable.length;i+=10){
          result.push(this.propsSms.smsTable.slice(i,i+10));
      }
      return result[this.currentPage-1]
    }
  },
  props: ["openData", "openDataContent","propsSms"],
  methods: {
    clickPopup(value) {
      this.$emit("sltSmsContent", value);
      if(value.name=='inputBlur') {
        this.change_index = -1
        this.input_text = ''
      }
    },
    clickText(index) {
      this.change_index = index
    },
    searchSmsList(e) {
      this.$emit('searchSmsList',e)
    },
    backlevelSms() {
      this.$emit('backlevelSms')
    },
    tabSelect(val) {
      if(val == 1) {
        this.$emit("backlevelSms")
      }else{
        this.propsSms.dataSelected = val
      }
    },
    // 分页
    handleSizeChange(val) {
      this.currentPage = val
    }
  }
};
</script>
<style lang="less" scoped>
</style>



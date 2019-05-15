<template>
  <div class="popupDrag">
    <el-dialog
      title="Data Extension Summary"
      :visible.sync="openData"
      :close-on-click-modal="false"
      width="60%"
    >
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
            @click="clickPopup()"
          >Select Data Extension</el-button>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="openData = false">Cancel</el-button>
        <el-button type="primary" @click="openData = false">Done</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="openDataContent"
      :close-on-click-modal="false"
      class="data-content"
      :show-close="false"
      width="98%"
    >
      <el-col :span="3" class="data-content-l">
        <div class="data-content-summary" :class="{'data-Selected':dataSelected == 1}">
          <span>
            <i class="icon-shouye"></i>
          </span>
          <p class="summary-title mt10">Summary</p>
        </div>
        <div class="data-content-summary" :class="{'data-Selected':dataSelected == 2}">
          <p>
            <i class="redStar">*</i>Data
          </p>
          <p>Extension</p>
        </div>
        <div class="data-content-summary" :class="{'data-Selected':dataSelected == 3}">
          <p>Sales</p>
          <p>Promotion</p>
        </div>
      </el-col>
      <el-col :span="21" v-if="this.dataSelected == 2" class="data-content-r">
        <div class="r-header">
          <p class="r-header-t">
            <span>Data Extension</span>
            <span class="el-icon-back"></span>
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
              
          </el-col>
        </div>
      </el-col>
      <span slot="footer">
        <el-button @click="openDataContent = false">Cancel</el-button>
        <el-button type="primary" @click="openData = false">Summary</el-button>
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
          con:"el-icon-arrow-right",
          icon: "icon-wenjian"
        }
      ]
    };
  },
  props: ["openData", "openDataContent"],
  methods: {
    clickPopup() {
      this.$emit("sltDataContent");
    }
  }
};
</script>
<style lang="less" scoped>
</style>



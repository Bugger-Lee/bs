<template>
  <div class="marketingActive">
    <div class="marketing">
      <div class="marketing-header">
        <el-col :span="12" class="marketing-header-l">
          <span class="l-icon ml10">
            <i class="el-icon-location"></i>
          </span>
          <div class="l-tit">
            <p class="l-tit-t">
              <a href>Journeys Dashboard</a>
              <i>> Journey</i>
            </p>
            <!-- <p class="l-tit-b">New Journey - April 2019</p> -->
          </div>
        </el-col>
        <el-col :span="12" class="marketing-header-r">
          <span>Save</span>
          <span>Activate</span>
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
                  <li>
                    <span class="crowd-style">
                      <i class="icon-shouye"></i>
                    </span>
                    <p>Data</p>
                    <p>Extension</p>
                  </li>
                  <li>
                    <span class="crowd-style">
                      <i class="icon-shouye"></i>
                    </span>
                    <p>DMP</p>
                  </li>
                </ul>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>ACTIVITIES</span>
              </template>
              <el-submenu index="2-1" class="marketing-el-submenu-children">
                <span slot="title">Messages</span>
                <el-menu-item-group>
                  <ul class="theme-l-tmp">
                    <li>
                      <span class="msg-style">
                        <i class="icon-shouye"></i>
                      </span>
                      <p>SMS</p>
                    </li>
                    <li>
                      <span class="msg-style">
                        <i class="icon-shouye"></i>
                      </span>
                      <p>Email</p>
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
                        <i class="icon-shouye"></i>
                      </span>
                      <p>Wait By</p>
                      <p>Duration</p>
                    </li>
                    <li>
                      <span class="ctl-style">
                        <i class="icon-shouye"></i>
                      </span>
                      <p>Wait By</p>
                      <p>Attribute</p>
                    </li>
                    <li>
                      <span class="ctl-style">
                        <i class="icon-shouye"></i>
                      </span>
                      <p>Wait Until</p>
                      <p>Date</p>
                    </li>
                  </ul>
                </el-menu-item-group>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="1" class="middle-style"></el-col>
        <el-col :span="18" class="marketing-drag">
          <ul class="imaginary"  v-if="!ifDrag">
            <li class="imaginary-circle"></li>
            <li class="imaginary-wire">---------></li>
            <li class="imaginary-square"></li>
            <li class="imaginary-wire">-------></li>
            <li class="imaginary-rhombus"></li>
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
          <div class="window" ref="refData" v-if="ifDrag">
            <span class="crowd-style" @click="dataExtension()">
              <i class="icon-shouye"></i>
            </span>
          </div>
        </el-col>
        <el-dialog
          title="Data Extension Summary"
          :visible.sync="openData"
          width="60%">
          <span slot="title" class="data-title">
            <span class="icon-shouye"></span>Data Extension Summary
          </span>
          <div class="data-content">
            <p><span class="redStar">*</span>Data Extension</p>
            <div class="data-content-c">
              <img src="@/assets/img/noneData.png"/>
              <p class="c-explain-one">Let's get going!</p>
              <p>Select the data extension whose contacts should enter this journey</p>
              <el-button type="primary" class="c-explain-select" @click="sltDataContent()">Select Data Extension</el-button>
            </div>
          </div>
          <span slot="footer">
            <el-button @click="openData = false">Cancel</el-button>
            <el-button type="primary" @click="openData = false">Done</el-button>
          </span>
        </el-dialog>
        <el-dialog
          :visible.sync="openDataContent"
          class="data-content"
          :show-close=false
          width="98%">
          <el-col :span="3">
            <div class="data-content-summary">
              <span>
                <i class="icon-shouye"></i>
              </span>
              <p class="summary-title mt10">Summary</p>
            </div>
            <div class="data-content-summary">
              <p><i class="redStar">*</i>Data</p>
              <p>Extension</p>
            </div>
            <div class="data-content-summary">

            </div>
          </el-col>
          <el-col :span="19">
          </el-col>
          <span slot="footer">
            <el-button @click="openDataContent = false">Cancel</el-button>
            <el-button type="primary" @click="openData = false">Summary</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/part.less";
import jsplumb from "jsplumb";
import $ from "jquery";
import { log } from "util";
export default {
  name: "marketingActive",
  data() {
    return {
      ifDrag: false,
      openData:false,
      openDataContent:false
    };
  },
  mounted() {
    this.dragInit();
    this.jsPlumb();
  },
  methods: {
    jsPlumb() {
      jsplumb.jsPlumb.ready(function() {
        jsplumb.jsPlumb.connect({

        });
      });
    },
    dataExtension() {
      this.openData = true
    },
    appendDiv(left, top) {
      this.ifDrag = true
    },
    sltDataContent() {
      this.openData = false
      this.openDataContent = true
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
        appendTo: "body"
      });
      $(".marketing-drag").droppable({
        scope: "dragflag",
        drop: function(event, ui) {
          if (
            minleft <= ui.offset.left &&
            ui.offset.left <= minleft + maxleft &&
            mintop <= ui.offset.top &&
            ui.offset.top < mintop + maxtop
          ) {
            that.appendDiv(ui.offset.left, ui.offset.top);
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.marketingActive {
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
      line-height: 60px;
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
          i {
            color: #fff;
            font-size: 20px;
            line-height: 30px;
          }
        }
        .l-tit {
          display: inline-block;
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
        span {
          padding: 4px 10px;
          background-color: #0070d2;
          border-radius: 5px;
          color: #fff;
          margin-right: 15px;
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
        // margin-left: 17.5%;
        padding: 70px 0 0 50px;
        height: 100%;
      }
    }
  }
}
</style>


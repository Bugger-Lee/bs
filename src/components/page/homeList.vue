<template>
  <div class="homeList">
    <div class="list">
      <div class="list-head">
        <el-col :span="12" class="list-head-l ml15">
          <span class="list-head-icon">
            <i class="el-icon-location"></i>
          </span>
          <span>Journeys Dashboard</span>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="Search Journeys"
            clearable
            prefix-icon="el-icon-search"
            v-model="searchListVal"
          ></el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="JourneyVal" clearable placeholder="Create New Journey" class="fr">
            <el-option
              v-for="item in selectList"
              :key="item.id"
              :label="item.label"
              @click.native="newActive()"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-col>
      </div>
      <div class="list-num ml15">
        <el-col :span="24">217 Journeys</el-col>
      </div>
      <div class="list-content mt20">
        <el-col :span="6" class="list-content-l">
          <p class="list-content-l-tit ml15">Folders</p>
          <div class="list-content-l-tree">
            <el-tree :data="data" style="font-size:14px;">
              <span  slot-scope="{ node, data }">
                  <span>
                      <i :class="data.icon" class="mr05"></i>{{ node.label }}
                  </span>              
              </span>
            </el-tree>
          </div>
        </el-col>
        <div class="list-content-r">
          <el-col :span="17" style="width:100%;">
            <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="TITLE" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.address }}</template>
              </el-table-column>
              <el-table-column prop="name" label="STATUS" show-overflow-tooltip></el-table-column>
              <el-table-column prop="date" label="TIME" show-overflow-tooltip></el-table-column>
              <el-table-column prop="address" label="CREATOR" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-col>
          <el-pagination
            class="mt20"
            style="display:inline-block;float:right;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { log } from 'util';
export default {
  name: "homeList",
  data() {
    return {
      selectList: [
        {
          id: 1,
          label: "Create Journey from Scratch"
        }
      ],
      JourneyVal: "",
      searchListVal: "",
      data: [
        {
          label:"All Journeys",
          icon:'icon-quanbu',
        },
        {
          label: "My  Journeys",
          icon: 'icon-wenjian',
          children: [
            {
              label: "CLV",
              icon: 'icon-wenjian'
            }
          ]
        }
      ],
      tableData3: [
        {
          date: "2016-05-03",
          name: "等待开始",
          address: "Journeys  Active"
        },
        {
          date: "2016-05-02",
          name: "进行中",
          address: "Journeys  Active"
        },
        {
          date: "2016-05-04",
          name: "已结束",
          address: "Journeys  Active"
        },
        {
          date: "2016-05-01",
          name: "等待开始",
          address: "Journeys  Active"
        },
        {
          date: "2016-05-08",
          name: "已结束",
          address: "Journeys  Active"
        },
        {
          date: "2016-05-06",
          name: "已结束",
          address: "Journeys  Active"
        },
        {
          date: "2016-05-07",
          name: "已结束",
          address: "Journeys  Active"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleNodeClick() {},
    newActive() {
      this.$router.push('/marketingActive')
    }
  }
};
</script>

<style scoped lang="less">
.homeList {
  width: 98%;
  height: 98%;
  background: #f3f2f2;
  margin: 0 auto;
  border-radius: 10px;
  .list {
    width: 100%;
    height: 100%;
    .list-head {
      width: 100%;
      height: 70px;
      line-height: 70px;
      .list-head-l {
        float: left;
        clear: right;
        span {
          font-weight: 600;
        }
        .list-head-icon {
          width: 32px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          border-radius: 5px;
          background-color: #fcb95b;
          display: inline-block;
          i {
            color: #fff;
            font-size: 20px;
          }
        }
      }
      .list-head-r {
        float: right;
      }
    }
    .list-num {
      font-size: 12px;
      padding: 0 0 15px 0;
    }
    .list-content {
      width: 100%;
      border-top: 1px solid #dddbda;
      height: 82%;
      border-radius: 0px 0px 10px 10px;
      .list-content-l {
        height: 96%;
        .list-content-l-tit {
          height: 40px;
          line-height: 40px;
        }
        .list-content-l-tree {
          width: 96%;
          height: 92%;
          background: #fff;
          border: 1px solid #ccc;
          margin-left: 5px;
        }
      }
      .list-content-r {
        height: 97%;
        background: #fff;
        width: 75%;
        float: right;
      }
    }
  }
}
</style>

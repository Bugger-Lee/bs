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
            @keyup.enter.native="searchHomeList"
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
        <el-col :span="24">{{this.JourneyTotal}}  Journeys</el-col>
      </div>
      <div class="list-content mt20">
        <el-col :span="6" class="list-content-l">
          <p class="list-content-l-tit ml15">Folders</p>
          <div class="list-content-l-tree">
            <el-tree :data="modelClv" style="font-size:14px;" class="mt10">
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
              :data="tableData"
              :height="tableHeight"
              tooltip-effect="dark"
              style="width: 100%"
              v-loadmore="getMoreDate"
            >
              <el-table-column prop="rule_name" label="TITLE" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.rule_name}}</template>
              </el-table-column>
              <el-table-column prop="status_name" label="STATUS" show-overflow-tooltip></el-table-column>
              <el-table-column prop="cycle_type" label="SOURCES" show-overflow-tooltip></el-table-column>
              <el-table-column prop="command_code" label="TYPE" show-overflow-tooltip></el-table-column>
              <div style="text-align:center;" slot="append"><i class="el-icon-loading" style="color:#1589ee;font-size:25px;"></i></div>
            </el-table>
          </el-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      modelClv: [
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
      tableData: [],
      JourneyTotal:'',
      ruleName:'',
      tableHeight: window.innerHeight - 200
    };
  },
  created() {
    this.homeLists()
  },
  methods: {
    handleSelectionChange() {},
    handleNodeClick() {},
    newActive() {
      this.$router.push('/marketingActive')
    },
    getMoreDate() {
      // console.log(123)
    },
    homeLists() {
      this.$.get("rule/getList",{params:{ruleName:this.ruleName}}).then(res=>{
        if (res.data.code ==200) {
        this.tableData = res.data.data
        this.JourneyTotal = res.data.size
        }
      })
    },
    searchHomeList(e) {
      var keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){
        this.ruleName = this.searchListVal
        this.homeLists()
      }
    }
  },
  directives: {
    loadmore: {
      // 指令的定义
      bind(el, binding, vnode) {
        const selectWrap = el.querySelector('.el-table__body-wrapper')
        selectWrap.addEventListener('scroll', function() {
          const sign = 20
          const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
          if (scrollDistance <= sign) {
            binding.value()
          }
        })
      }
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

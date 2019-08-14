<template>
  <el-col :span="20" class="tableLists">
    <div class="table-header">
      <el-input
        placeholder="Search by Title"
        clearable
        style="width:20%;"
        size="small"
        prefix-icon="el-icon-search"
        @keyup.enter.native="searchHomeList"
        v-model="searchListVal"
      ></el-input>
      <el-select v-model="JourneyVal" size="small" clearable style="line-height:0px;">
        <el-option
          v-for="item in selectList"
          :key="item.command_name"
          @click.native="newActive()"
          :value="item.command_name"
        ></el-option>
      </el-select>
      <el-select v-model="locationPage" size="small" class="locationPage">
        <el-option
          v-for="item in selectLocaltion"
          :key="item.value"
          @click.native="locationNew()"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      size="mini"
      tooltip-effect="dark"
      v-loadmore="getMoreDate"
    >
      <el-table-column prop="rule_name" label="Journey Title" show-overflow-tooltip>
        <template slot-scope="scope">
          <span @click="goToDetail(scope.row.id)" class="mouseAfter">{{ scope.row.rule_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status_name" label="Status" show-overflow-tooltip></el-table-column>
      <el-table-column prop="command_name" label="Crowd Type" show-overflow-tooltip></el-table-column>
      <el-table-column prop="crowd_count" label="Crowd Count" show-overflow-tooltip></el-table-column>
      <el-table-column label="Time" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.schulder_time}}</span>
          <span v-if='scope.row.retired_time'>- {{scope.row.retired_time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_by" label="Creator" show-overflow-tooltip></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteIndexList(scope, tableData)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
      <div style="text-align:center; padding: 10px 0" slot="append" v-if="showLoading"><i class="el-icon-loading" style="color:#1589ee;font-size:35px;"></i></div>
    </el-table>
  </el-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex' //引入mapActions 和 mapGetters
export default {
  name: "homeList",
  data() {
    return {
      selectList: [],
      JourneyVal: "All Journeys",
      locationPage:"",
      searchListVal: "",
      tableData: [],
      totalDate: [], //总数据
      page: 1,//当前页
      total_page: '',//总页数
      JourneyTotal:'',
      ruleName:'',
      showLoading: false,
      crowdVal:'',
      selectLocaltion:[{
        value:"新建"
      }]
    };
  },
  created() {
    this.homeLists()
    this.orderLists()
    console.log(this.Gcommon.count)
    this.Acommon({count: 2})
    console.log(this.Gcommon.count)
  },
  computed: {
    ...mapGetters(['Gcommon']) // 引入计算数据
  },
  methods: {
    ...mapActions(['Acommon']), //引入修改vuex数据方法
    newActive() {
      if(this.JourneyVal == 'All Journeys') {
        this.crowdVal = ''
      }else{
        this.crowdVal = this.JourneyVal
      }
      this.homeLists()
    },
    locationNew() {
      if(this.locationPage == "新建") {
        this.$router.push('./marketingActive')
      }
    },
    getMoreDate() {
      if (this.showLoading) {
        return false
      }
      this.showLoading = true
      if (this.total_page>this.page) {
        setTimeout(() => {
          this.showLoading = false
          this.tableData = this.tableData.concat(this.totalDate[this.page])
          this.page ++
        }, 500);
      } else {
        this.showLoading = false
      }
    },
    splitDate() {
      let result = [];
      for(var i=0;i<this.totalDate.length;i+=15){
          result.push(this.totalDate.slice(i,i+15));
      }
      this.totalDate = result
      this.total_page = result.length
      this.page = 1
      this.tableData = result[0]
    },
    homeLists() {
      this.$.get("rule/getList",{params:{ruleName:this.ruleName,crowdType:this.crowdVal}}).then(res=>{
        if (res.data.code ==200) {
          this.totalDate = res.data.data
          this.JourneyTotal = res.data.size
          this.splitDate()
        }
      })
    },
    // 删除
    deleteIndexList(val) {
      this.$confirm('是否删除此条Journey', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$.post("rule/delete?id="+val.row.id).then(res=>{
            this.$message(res.data.msg)
            if(res.data.code == 200) {
              this.homeLists()
            }
          })
        }).catch(() => {
            return false
        })
    },
    // 调度命令
    orderLists() {
      this.$.get("command/getList?commandName=").then(res=>{
        let item = {
          command_name: 'All Journeys',
          id:10
        }
        this.selectList = res.data.data
        this.selectList.push(item)
      })
    },
    searchHomeList(e) {
      var keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){
        this.ruleName = this.searchListVal
        this.homeLists()
      }
    },
    goToDetail(id) {
      this.$router.push({path:'/activeDetail',query:{id:id}})
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
.tableLists{
  background-color: #fff;
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 15px;
  .table-header{
    width: 100%;
    height: 60px;
    line-height: 60px;
    .locationPage{
      line-height:0px;
      float:right;
      line-height: 60px;
    }
  }
}
</style>

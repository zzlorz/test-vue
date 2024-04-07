<template>
  <el-col id="tasklist" v-show="tasklistshow">
    <div style="line-height: 72px;font-size: 20px;font-weight: bold;padding:0 20px;text-align:left;">
      <span id="lefttool" style="margin-right:10px;">
        <i class="el-icon-s-unfold" @click="leftbarTrigger(true)"></i>
      </span>
      <span style="font-size:22px;">{{task.title}}</span>
      <span style="float: right" v-show="detail.disabled"><i class="el-icon-brush" @click="brush('trash')" style="transform: rotate(180deg);font-weight: bold;cursor: pointer;"></i></span>
    </div>
    <div class="inputbox" ref="inputboxstyle" v-if="inputshow" style="position: relative;" v-show="inputSearch">
      <div>
        <el-input
          :placeholder="placeholder"
          v-model="searchStr"
          clearable
          @keyup.enter.native="taskadd"
          @focus="focus"
          @blur="blur"
          >
        </el-input>
      </div>
      <div style="width:90px;line-height: 46px;height:38px;font-size: 18px;color: #999;position: absolute;right: 10px;top:0;">
        <div class="toolbox" ref="toolbox" id="toolbox">
          <span style="margin-right: 6px">
            <Level v-bind:levelData="task.level" @command="levelCommand" ref="hello"></Level>
          </span>
          <span>
            <el-dropdown trigger="click"  @command="togroup">
              <span class="el-dropdown-link">
                <i class="el-icon-upload2" style="transform: rotate(90deg);font-size: 18px;color: #999;"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index) in orderlist" :key="index" :command='{item:item,index:index}'>
                  <i class="el-icon-s-unfold"></i>
                  <span>{{item.name}}</span>
                </el-dropdown-item>
                <el-dropdown-item :divided="divided" :command='{name:"收集箱",id:""}'><i class="el-icon-receiving"></i><span>收集箱</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <div style="width: 30px;height: 38px;float: right;overflow: hidden;">
            <el-date-picker
              size="small"
              v-model="changeheader"
              align="right"
              type="date"
              placeholder="选择日期"
              >
              </el-date-picker>
          </div>
        </div>
      </div>
    </div>
    <div ref="setHeight" :style="{height: (window_height - 130) + 'px'}">
      <el-scrollbar style="height:100%;">
      <div>
        <div class="task">
          <div v-for="(item,index) in getdatas" :key="index">
            <div v-if="item.istitle">
              <div style="padding:0 20px;">
                <el-divider content-position="left"><span style="font-size: 10px;color: #999">{{item.name}}</span></el-divider>
              </div>
            </div>
            <div v-else class="taskitem">
              <Taskitem @todetail="todetail" @check="check" v-bind:itemActive="activesTask[index]" v-bind:itemData="item" v-bind:itemIndex="index"></Taskitem>
              <el-dropdown trigger="click"  @command="taskCommand" style="float: right;">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >
                      <div>日期</div>
                      <el-tooltip class="item" effect="dark" content="今天" placement="bottom">
                        <a :class="item.plantime===quickDate.today?'selectdate active':'selectdate'" @click="quickChange({id:item.id, index:index, plantime: quickDate.today})"><i class="el-icon-sunny"></i></a>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="明天" placement="bottom">
                        <a :class="item.plantime===quickDate.tomorrow?'selectdate active':'selectdate'" @click="quickChange({id:item.id, index:index, plantime: quickDate.tomorrow})"><i class="el-icon-sunrise-1"></i></a>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="下周" placement="bottom">
                        <a :class="item.plantime===quickDate.week?'selectdate active':'selectdate'" @click="quickChange({id:item.id, index:index, plantime: quickDate.week})"><i class="el-icon" style="font-style:normal;font-size:16px;padding:4px 14px;">7</i></a>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="自定义" placement="bottom">
                        <a :class="item.plantime===quickDate.month?'selectdate active':'selectdate'" @click="quickChange({id:item.id, index:index, plantime: quickDate.month})"><i class="el-icon-date"></i></a>
                      </el-tooltip>
                    </el-dropdown-item>
                    <el-dropdown-item >
                      <div>优先级</div>
                      <a :class="item.level===3?'selectdate active':'selectdate'" @click="eee({id:item.id, index:index})"><span class="level3">!!!</span></a>
                      <a :class="item.level===2?'selectdate active':'selectdate'"><span class="level2">!!</span></a>
                      <a :class="item.level===1?'selectdate active':'selectdate'"><span class="level1">!</span></a>
                      <a :class="item.level===0?'selectdate active':'selectdate'"><span class="level0">!!!</span></a>
                    </el-dropdown-item>
                    <el-dropdown-item :command="{id:item.id, index:index}"><span><i class="el-icon-delete"></i>删除</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
      </el-scrollbar>
    </div>
  </el-col>
</template>
<script>
import Taskitem from '@/components/taskitem.vue'
import Level from '@/components/level.vue'
import Fullremark from '@/components/fullremark.vue'
import { setTimeout } from 'timers'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'tasklist',
  components: {
    Taskitem,
    Level,
    Fullremark
  },
  data () {
    return {
      showLoad: true,
      showIcon: false,
      transmitData: {title: 1111},
      tasktype: '',
      quickDate: {},
      orderlist: [],
      labellist: [],
      leftbarshow: false,
      tasklistshow: true,
      inputshow: true,
      divided: true,
      info: {id: '', text: '', time: ''},
      dialogVisible: false,
      searchStr: '',
      inputSearch: true,
      imageUrl: '',
      isViped: '',
      taskHeight: 0,
      task: {
        title: '收集箱',
        name: '',
        orderid: '',
        level: 0,
        plantime: '',
        ordername: ''
      },
      currentTask: {},
      getdatas: [],
      groupName: [],
      detail: {disabled: false},
      activesTask: [],
      placeholder: '添加任务至"收集箱"，回车即可保存',
      changeheader: '',
      editdetail: false,
      setDetaileHeight: ''
    }
  },
  computed: {
    ...mapState(
      ['changeBar',
        'checkStatus',
        'levelChange',
        'titleChange',
        'detailChange',
        'detailPlanChange'
        // 'orderlist'
      ]
    )
  },
  watch: {
    isBarChange (val) {
      this.tasktype = val.type
      this.fromChangeBar(val)
    },
    checkStatus (val) {
      this.check({item: val.item, index: val.index, type: val.type})
    },
    levelChange (val) {
      this.getdatas[val.index].level = val.level
    },
    titleChange (val) {
      this.getdatas[val.index].name = val.name
    },
    detailChange (val) {
      this.$set(this.getdatas, val.index, val.detail)
    },
    detailPlanChange (val) {
      let changeitem = JSON.parse(JSON.stringify(this.getdatas[val.index]))
      this.getdatas.splice(val.index, 1)
      let allData = JSON.parse(JSON.stringify(this.getdatas))
      changeitem.plantime = val.plantime
      for (let i = 0; i < allData.length; i++) {
        if (changeitem.plantime <= allData[i].plantime) {
          allData.splice(i, 0, changeitem)
          break
        }
      }
      this.getdatas = this.taskClassify(allData, this.tasktype)
      for (let i = 0; i < this.getdatas.length; i++) {
        if (this.getdatas[i].id === val.id) {
          this.$set(this.activesTask, i, true)
          let detail = JSON.parse(JSON.stringify(this.getdatas[i]))
          detail.index = i
          this.$store.commit('todetail', detail)
          this.currentTask = detail
        } else {
          this.$set(this.activesTask, i, false)
        }
      }
      if (this.tasktype === 'today' && changeitem.plantime !== this.moment().format('YYYY-MM-DD')) {
        this.$store.commit('leftBarChange', {detailshow: false})
      } else {
        this.$store.commit('leftBarChange', {detailshow: true})
      }
    },
    getOrder (val) {
      this.orderlist = val.orderlist
      this.labellist = val.labellist
    }
  },
  created () {
    this.quickDate = {
      today: this.moment().format('YYYY-MM-DD'),
      tomorrow: this.moment().add(1, 'days').format('YYYY-MM-DD'),
      week: this.moment().add(7, 'days').format('YYYY-MM-DD'),
      month: this.moment().add(30, 'days').format('YYYY-MM-') + this.moment().format('DD')
    }
    this.init()
  },
  mounted () {
    setTimeout(() => {
      this.showLoad = true
    }, 1500)
    window.addEventListener('keyup', function () {
      if (this.showDetail) {
        let changevalue = ''
        if (changevalue !== this.detail.detail) {
          this.editdetail = true
        } else {
          this.editdetail = false
        }
      } else {
        return false
      }
    })
  },
  methods: {    
    whChange () {
      if (this.width < 921) {
        if (this.detailshow) {
          this.tasklistshow = true
          this.detailshow = false
        }
      } else {
        this.detailshow = true
      }
    },
    brush (type) {
      this.$alert('垃圾桶中的任务将被永久删除。确认清空垃圾桶？', '清空垃圾桶', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            // return false
            this.$http({
              url: '/worklist/taskbrush',
              method: 'post'
            }).then(res => {
              if (res.errcode === 0) {
                this.$store.commit('leftBarChange', {detailshow: false})
                this[type] = []
                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                })
              }
            })
          }
        }
      })
    },
    ...mapMutations(['leftbarTrigger']),
    focus () {
      this.$refs.inputboxstyle.style.border = '1px solid #82c367'
    },
    blur () {
      this.$refs.inputboxstyle.style.border = '1px solid #fff'
    },
    togroup (res) {
      let str = ''
      let task = this.task
      if (task.title === '今天' || task.title === '七天') {
        str = '添加 “今天” 的任务至 “' + res.item.name + '”'
      } else if (task.title === '收集箱' || task.id) {
        str = '添加任务至 “' + res.item.name + '”，回车即可保存'
      }
      this.task.orderid = res.item.id
      this.task.ordername = res.item.name
      this.task.index = res.index
      this.placeholder = str
    },
    levelCommand (res) {
      this.task.level = res
    },
    fromChangeBar (data) {
      this.$http({url: '/worklist/tasks',
        method: 'post',
        data: {parma: data.type, orderid: data.orderid, name: data.name}
      }).then(res => {
        this.inputshow = true
        this.task.level = 0
        if (data.orderid) {
          this.placeholder = '添加任务至 “' + data.name + '”，回车即可保存'
          this.task.orderid = data.orderid
          this.task.ordername = data.name
        } else {
          if (data.name === '七天' || data.name === '今天') {
            this.placeholder = '添加 “今天” 的任务至 “ 收集箱 ”'
          }
          if (data.name === '收集箱') {
            this.placeholder = '添加任务至 “收集箱”，回车即可保存'
          }
        }
        this.getdatas = this.taskClassify(res.data, this.tasktype)
        this.resetActive(res.data)
      })
      if (data.type === 'complete' || data.type === 'trash') {
        this.inputSearch = false
      } else {
        this.inputSearch = true
      }
      if (data.type !== 'orderlist') {
        this.task.name = ''
      } else {
        this.task.name = data.name
      }
      if (data.type === 'trash') {
        this.detail.disabled = true
      } else {
        this.detail.disabled = false
      }
      this.task.title = data.name
      this.task.id = data.orderid
      if (data.type === 'labellist') {
        this.task.title = '# ' + data.name
      }
      this.task.type = data.type
      this.changeheader = ''
    },
    resetActive (res) {
      res = JSON.parse(JSON.stringify(res))
      let activesTask = []
      for (let i = 0; i < res.length; i++) {
        activesTask[i] = false
      }
      this.activesTask = activesTask
    },
    check ({item, index}) {
      this.$http({
        url: '/worklist/check',
        method: 'post',
        data: {id: item.id, status: (item.status === 0 ? 1 : 0)}
      }).then(res => {
        if (res.errcode === 0) {
          this.changeStatus(item, index)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    changeStatus (item, index) {
      let activesTask = []

      this.getdatas.splice(index, 1)
      this.activesTask.splice(index, 1)
      let nocheckdata = _this.getdatas
      for (let i = 0; i < nocheckdata.length; i++) {
        activesTask[i] = false
      }
      this.activesTask = activesTask
      this.getdatas = this.taskClassify(nocheckdata, this.tasktype)
      this.$store.commit('leftBarChange', {detailshow: false})
      this.detail = {}
    },
    handleOpen (key, keyPath) {
    },
    taskadd () {
      let task = this.task
      let today = this.moment().format('YYYY-MM-DD')
      task.name = this.searchStr
      if (this.task.type === 'today' || this.task.type === 'week') {
        task.plantime = today
      }
      if (this.changeheader) {
        task.plantime = this.moment(this.changeheader).format('YYYY-MM-DD')
      }
      this.$http({
        url: '/worklist/taskadd',
        method: 'post',
        data: task
      }).then(res => {
        if (res.errcode === 0) {
          if (task.orderid && task.type === 'inbox') {
          } else {
            let newData = JSON.parse(JSON.stringify(this.getdatas))
            newData.push(res.data[0])
            this.getdatas = this.taskClassify(newData, this.tasktype)
          }
          this.searchStr = ''
          this.changeheader = ''
          if (this.currentTask.name && this.currentTask.name !== '' && this.currentTask.name !== null) {
            this.$store.commit('leftBarChange', {detailshow: true})
          } else {
            this.$store.commit('leftBarChange', {detailshow: false})
          }
        }
      })
    },
    todetail (index) {
      if (this.windowWidth < 921) {
        this.tasklistshow = false
        this.detailshow = true
      }
      let activesTask = this.activesTask
      for (let i = 0; i < activesTask.length; i++) {
        activesTask[i] = false
      }
      this.activesTask = activesTask
      this.$set(this.activesTask, index, true)
      this.changeheader = ''

      let detail = {}
      detail = JSON.parse(JSON.stringify(this.getdatas[index]))
      detail.index = index
      this.currentTask = detail
      this.$store.commit('todetail', detail)
    },
    changeGroup (info) {
      this.visible = true
    },
    changeTip () {
    },
    bbb (info) {},
    ccc (info) {},
    quickChange (info) {
      let detail = {}
      detail = JSON.parse(JSON.stringify(this.getdatas[info.index]))
      detail.index = info.index
      detail.plantime = info.plantime
      this.$http({
        url: '/worklist/plantimeupdate',
        method: 'post',
        data: {id: detail.id, plantime: detail.plantime}
      }).then(res => {
        if (res.errcode === 0) {
          this.$store.commit('todetail', detail)
          this.$store.commit('detailPlanChange', detail)
        }
      })
    },
    taskCommand (info) {
      this.$http({
        url: '/worklist/taskdelete',
        method: 'post',
        data: {id: info.id}
      }).then(res => {
        if (res.errcode === 0) {
          this.getdatas.splice(info.index, 1)
          this.$message({showClose: true, message: res.msg, type: 'success', offset: 4})
          this.$store.commit('leftBarChange', {detailshow: false})
        }
      })
    },
    handleOrderClose () {
    },
    init () {
      this.$http({
        url: '/worklist/tasks',
        method: 'post',
        data: {parma: 'inbox'}
      }).then(res => {
        if (res.errcode !== 0) {
          // this.$refs.body.style.display = 'block'
          this.showLoad = true
          this.$message.error(res.msg)
          setTimeout(() => {
            this.$router.push({path: '/login'})
          }, 2000)
          return false
        }
        this.getdatas = this.taskClassify(res.data, 'inbox')
        this.resetActive(res.data)
      })
    }
  }
}
</script>
<style>
</style>

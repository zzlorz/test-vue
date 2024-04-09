<template>
  <div class="container">
    <!-- <div style="width: 100px;height:100%;background: #4438CA;float: left;">
    </div> -->
    <div class="main">
      <div class="m-header">
        <div class="m-title">
          <span>PHOTOS THEME</span>
        </div>
        <div class="m-bar">
          <el-dropdown @command="command" style="line-height: normal;" trigger="click">
            <el-avatar class="m-avatar" size="small" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided :tabindex="0"><el-icon class="el-icon-switch-button"></el-icon> 退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
        </div>
      </div>
      <div class="m-content">
        <div class="m-info">
          <div>
            <el-tree
              :data="treeData"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick">
            </el-tree>
          </div>
        </div>
        <div class="m-photo" ref="getListDomHeight" v-loading="loading">
          <div class="theme">
            <div class="theme-item" v-for="(o, index) in list" :key="index+'o'">
              <el-card :body-style="{ padding: '0px',textAlign: 'center' }">
                <el-image :src="imgPrefix+o.theme_cover" class="image" fit="cover" style="height: 200px;width: 100%;"></el-image>
                <div style="padding: 14px;">
                  <h4 class="photo-title">{{o.theme_title}}</h4>
                  <div class="bottom clearfix">
                    <time class="time">{{ o.create_date | parseTimeFormat }}</time>
                    <div>
                      <el-button size="mini" type="primary" icon="el-icon-edit" circle class="button" @click="toedit(o.theme_id)"></el-button>
                      <el-popconfirm title="确定删除吗？" @confirm="delConfirm(index)">
                        <el-button type="danger" size="mini" icon="el-icon-delete" circle slot="reference"></el-button>
                      </el-popconfirm>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
          <el-pagination style="text-align: center;padding-top: 30px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listQuery.pages"
            :page-size="listQuery.limit"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {getThemeList} from '@/api/admin.js'
import {deleteItem} from '@/api/theme.js'
import {parseTime} from '@/utils/parseTime.js'
import supabase from '@/utils/supabaseQuery'
export default {
  name: 'admin',
  components: {
  },
  filters: {
    parseTimeFormat (value) {
      return parseTime(new Date(value), '{y}-{m}-{d} {h}:{i}')
    }
  },
  data () {
    return {
      imgPrefix: 'http://cdn.youlaji.com/',
      currentDate: new Date(),
      listQuery: {
        pages: 1,
        limit: 20
      },
      list: [],
      total: 0,
      loading: true,
      treeData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
  },
  created () {
    console.log(document.cookie)
    this.getData()
  },
  mounted () {
  },
  methods: {
    handleClick () {},
    handleNodeClick (data) {
      console.log(data)
    },
    command (value) {
      console.log(value)
    },
    async getData () {
      this.loading = true
      const { data: todos } = await supabase.from('youlaji_blog_test').select('*')
      this.list = todos
      this.total = todos.length
      this.loading = false
      // getThemeList(this.listQuery).then(res => {
      //   this.list = res.data
      //   this.total = res.total
      //   this.loading = false
      // })
    },
    add () {
      this.$router.push('/admin/theme/add/')
    },
    toedit (id) {
      this.$router.push('/admin/theme/edit/' + id)
    },
    delConfirm (index) {
      this.loading = true
      console.log(this.list[index])
      const self = this
      deleteItem({theme_id: this.list[index].theme_id}).then(res => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 1000,
          onClose () {
            self.loading = false
            self.list.splice(index, 1)
          }
        })
      })
    },
    handleCurrentChange (value) {
      this.listQuery.pages = value
      this.getData()
    },
    handleSizeChange (value) {
      alert(value)
    }
  }
}
</script>
<style scoped>
.container{
  width: 100%;
  height: 100%;
}
.container .main{
  height:100%;
  background: #F9FAFC;
}
.m-header{
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  height: 50px;
  border-bottom: 1px solid #e7e8ea;
  line-height: 50px;
  justify-content: space-between;
  align-items:center;
  box-sizing: border-box;
}
.m-bar{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items:center;
  padding: 0 40px;
}
.m-avatar{
  margin-right: 20px;
}
.m-content{
  display: -webkit-flex;
  display: flex;
  height: calc(100% - 50px);
  flex-wrap: nowrap;
  position:relative;
}
.m-photo{
  flex: 16;
  justify-content: center;
  border-right: 1px solid #e7e8ea;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
.m-title{
  padding-left: 40px;
  font-weight: bold;
}
.theme{
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}
.theme-item{
  width: 235px;
  margin: 0 20px 20px 0;
}
.m-info{
  flex: 2;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  background: #fff;
}
.time{font-size: 12px;color: #999;}
.photo-title{
  padding-bottom: 10px;
  color: #585858;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.bottom{
  display: flex;
  justify-content: space-between;
  align-items:center;
}
</style>

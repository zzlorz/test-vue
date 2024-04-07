<template>
  <div>
    <div id="leftbar" ref="leftbar" :class="leftbarTrigger?'leftset':''">
      <div :style="{'height':`${window_height}px`}">
        <el-scrollbar style="position: relative;width: 100%;height:100%;" >
          <div style="margin: 15px;line-height: 40px;overflow: hidden;">
            <el-autocomplete
             :class="{activeSearch: leftbarSearch}"
              popper-class="my-autocomplete"
              v-model="state"
              :clearable="true"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect">
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.address }}</span>
              </template>
            </el-autocomplete>
            <div :class="{activeSearch: !leftbarSearch}">
              <el-dropdown trigger="click" @command="handleCommand" style="float: left;">
                <span class="el-dropdown-link">
                    <img style="height: 40px;width: 40px;border-radius: 50%;overflow: hidden;float: left;" :src="`http://localhost:3000/`+userInfo.avatar">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='set'><a href="#/user">设置</a></el-dropdown-item>
                    <el-dropdown-item command='signout'>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div style="float: right;font-size: 18px;color: #b6d7a8;">
                <i class="el-icon-message" style="margin-right: 10px;"></i>
                <i class="el-icon-search" @click="showLeftbarSearch"></i>
              </div>
            </div>
          </div>
          <div style="overflow: hidden;">
            <ul class="dateselect">
              <li v-for="(item,index) in leftbar.group0" :key="item.index" v-if="item.is_show==1" @click="changeBar('',item.name,index,item.key,item.is_vip,'group0')" :class="actives.group0[index]?'active':''">
                <div class="baritem">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                  <div class="taskcount">{{item.count==0?'':item.count}}</div>
                </div>
              </li>
            </ul>
          </div>
          <div style="overflow: hidden;">
            <div>
              <el-tabs v-model="activeName" >
                <!-- !@tab-click="handleClick" -->
                  <el-tab-pane label="清单" name="first" class="order-style">
                    <ul class="dateselect">
                    <li v-for="(item,index) in leftbar.orderlist" :key="item.index" :class="actives.orderlist[index]?'active':''" @click="changeBar(item.id,item.name,index,'orderlist','','orderlist')">
                      <div class="baritem">
                        <i class="el-icon-s-unfold mr10" style="font-size: 14px;"></i>
                        <span>{{item.name}}</span>
                        <p class="fr">
                          <span class="num">{{item.count==0?'':item.count}}</span>
                          <el-dropdown trigger="click"  @command="orderCommand" style="float: left;">
                            <span class="el-dropdown-link">
                                <i class="el-icon-more"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="{info:item,index:index,type:'edit'}"><i class="el-icon-edit-outline"></i><span>编辑</span></el-dropdown-item>
                                <el-dropdown-item :command="{info:item,index:index,type:'delete'}"><i class="el-icon-delete"></i><span>删除</span></el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                          <div class="order_theme" v-if="item.theme!=='default'" :class="item.theme" ></div>
                        </p>
                      </div>
                    </li>
                    <li @click="addOrderBtn" style="cursor: pointer;">
                      <div class="baritem"><i class="el-icon-plus" style="font-size: 14px;"></i>添加清单</div>
                    </li>
                  </ul>
                  </el-tab-pane>
                  <el-tab-pane label="标签" name="second" class="label-style">
                    <ul class="dateselect">
                      <li v-for="(item,index) in leftbar.labellist" :key="item.index" :class="actives.labellist[index]?'active':''" @click="changeBar(item.id,item.name,index,'labellist','','labellist')">
                      <div class="baritem">
                        <i class="el-icon-price-tag mr10" style="font-size: 14px;transform:rotate(45deg);"></i>
                        <span>{{item.name}}</span>
                        <p class="fr">
                          <span class="num">{{item.count==0?'':item.count}}</span>
                          <el-dropdown trigger="click"  @command="labelCommand" style="float: left;">
                            <span class="el-dropdown-link">
                                <i class="el-icon-more"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="{info:item,index:index,type:'edit'}"><i class="el-icon-edit-outline"></i><span>编辑</span></el-dropdown-item>
                                <el-dropdown-item :command="{info:item,index:index,type:'delete'}"><i class="el-icon-delete"></i><span>删除</span></el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                          <div class="order_theme" v-if="item.theme!=='default'" :class="item.theme" ></div>
                        </p>
                      </div>
                    </li>
                    <li @click="addTip" style="cursor: pointer;">
                      <div class="baritem"><i class="el-icon-plus" style="font-size: 14px;"></i>添加标签</div>
                    </li>
                  </ul>
                  </el-tab-pane>
                </el-tabs>
            </div>
          </div>
          <div style="overflow: hidden;border-top:1px solid #599f3c;">
            <div>
              <ul class="dateselect">
                <li v-for="(item,index) in leftbar.group1" :key="item.index" @click="changeBar('',item.name, index, item.key, item.is_vip, 'group1')" :class="actives.group1[index]?'active':''">
                  <div class="baritem">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                    <div class="taskcount">{{item.count == 0 ? '' : item.count}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div style="overflow: hidden;border-top:1px solid #599f3c;">
            <div>
              <ul class="dateselect">
                <li v-for="(item,index) in leftbar.group2" :key="item.index" @click="changeBar('', item.name, index, item.key, item.is_vip, 'group2')" :class="actives.group2[index]?'active':''">
                  <div class="baritem">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                    <div class="taskcount">{{item.count==0?'':item.count}}</div>
                  </div>
                  <!-- <Leftbaritem v-bind:item="item"></Leftbaritem> -->
                </li>
              </ul>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div style="width:100%;height:30px;line-height:30px;color:#fff;background:#599F3C;position:absolute;left:0;bottom:1px;">
        <div style="float;left;margin-left:18px;text-align:left;">
          <i class="el-icon-medal" style="margin-right:10px;"></i>
          <span style="font-size:12px;">升级到高级会员</span>
          <i class="el-icon-arrow-right" style="margin-right:18px;float:right;line-height:30px;"></i>
        </div>
      </div>
    </div>
    <el-dialog
      :title="ordertitle"
      :visible.sync="dialogOrder"
      width="30%"
      style="text-align:left;"
      >
      <span>
        <el-form ref="form" :model="order" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="order.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="颜色">
            <el-button v-for="(item,index) in orderColor" :key="item.index" @click="getOrderColor(index,item)" :type="item.type" size="mini" :icon="item.checked?'el-icon-check':'el-icon-minus'" circle></el-button>
          </el-form-item>
          <el-form-item label="是否隐藏">
            <el-switch v-model="order.display"></el-switch>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOrder = false" size="small">取 消</el-button>
        <el-button type="primary" @click="orderSubmit" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="labeltitle"
      :visible.sync="dialogLabel"
      width="30%"
      style="text-align:left;"
      >
      <span>
        <el-form ref="form" :model="label" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="label.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="颜色">
            <el-button v-for="(item,index) in labelColor" :key="item.index" @click="getLabelColor(index,item)" :type="item.type" size="mini" :icon="item.checked?'el-icon-check':'el-icon-minus'" circle></el-button>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogLabel = false" size="small">取 消</el-button>
        <el-button type="primary" @click="labelSubmit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Leftbaritem from '../baritem.vue'
export default {
  name: 'leftbar',
  components: {
    Leftbaritem: Leftbaritem
  },
  data () {
    return {
      leftbarSearch: true,
      restaurants: [],
      state: 'wqeq',
      dialogOrder: false,
      dialogLabel: false,
      activeName: 'first',
      isViped: '',
      leftbar: [],
      actives: {},
      ordertitle: '添加清单',
      labeltitle: '添加标签',
      orderColor: [
        {type: 'default', checked: true},
        {type: 'primary', checked: false},
        {type: 'success', checked: false},
        {type: 'info', checked: false},
        {type: 'danger', checked: false},
        {type: 'warning', checked: false}
      ],
      order: {
        name: '',
        display: true,
        theme: 'default',
        id: ''
      },
      labelColor: [
        {type: 'default', checked: true},
        {type: 'primary', checked: false},
        {type: 'success', checked: false},
        {type: 'info', checked: false},
        {type: 'danger', checked: false},
        {type: 'warning', checked: false}
      ],
      label: {
        name: '',
        theme: 'default',
        id: ''
      }
    }
  },
  computed: {
    ...mapState(['userInfo', 'leftBarChange', 'windowChange', 'leftbarTrigger'])
  },
  watch: {
    leftBarChange (val) {
      this.init(val)
    }
  },
  mounted () {
    this.init()
    this.restaurants = this.loadAll()
  },
  methods: {
    showLeftbarSearch () {
      this.leftbarSearch = !this.leftbarSearch
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
        { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
        { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
        { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
        { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
        { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
        { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
        { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
        { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
        { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
        { "value": "枪会山", "address": "上海市普陀区棕榈路" },
        { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
        { "value": "钱记", "address": "上海市长宁区天山西路" },
        { "value": "壹杯加", "address": "上海市长宁区通协路" },
        { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
        { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
        { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
        { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
        { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
        { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
        { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
        { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
        { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
        { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
        { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
        { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
        { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
        { "value": "浏阳蒸菜", "address": "天山西路430号" },
        { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
        { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
        { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
        { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
        { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
        { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
        { "value": "阳阳麻辣烫", "address": "天山西路389号" },
        { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
      ]
    },
    handleSelect (item) {
    },
    handleIconClick (ev) {
    },
    handleCommand (command) {
      if (command === 'signout') {
        this.$router.push({path: '/login'})
        this.$store.commit('token', '')
      }
    },
    addTip () {
      this.dialogLabel = true
      this.labeltitle = '添加标签'
      this.label = {
        name: '',
        theme: 'default',
        id: ''
      }
      this.labelColor = [
        {type: 'default', checked: true},
        {type: 'primary', checked: false},
        {type: 'success', checked: false},
        {type: 'info', checked: false},
        {type: 'danger', checked: false},
        {type: 'warning', checked: false}
      ]
    },
    changeBar (orderid, name, index, type, isVip, group) {
      if (!orderid) {
        if (isVip === 1 && isVip !== this.isViped) {
          this.$alert('升级成会员', '会员', {
            confirmButtonText: '立即升级',
            callback: action => {
            }
          })
          return
        }
      }
      this.$store.commit('changeBar', {type: type, orderid: orderid, name: name, orderlist: this.leftbar.orderlist, labellist: this.leftbar.labellist})
      let actives = JSON.stringify(this.actives)
      actives = JSON.parse(actives)
      for (let key in actives) {
        for (let i = 0; i < actives[key].length; i++) {
          actives[key][i] = false
        }
      }
      actives[group][index] = true
      this.actives = actives
    },
    orderCommand (parmas) {
      if (parmas.type === 'delete') {
        this.$confirm('删除清单会删除其下的所有任务。确认删除清单(' + parmas.info.name + ')？', '删除清单', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$http({
            url: '/worklist/orderdelete',
            method: 'post',
            data: {id: parmas.info.id}
          }).then(res => {
            if (res.errcode === 0) {
              this.init('default')
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }
          })
        }).catch(action => {
        })
      } else {
        this.ordertitle = '编辑清单'
        this.order = JSON.parse(JSON.stringify(parmas.info))
        this.order.index = parmas.index
        this.order.display = parmas.info.display === !!1
        let orderColor = this.orderColor
        for (let i = 0; i < orderColor.length; i++) {
          if (orderColor[i].type === parmas.info.theme) {
            orderColor[i].checked = true
          } else {
            orderColor[i].checked = false
          }
        }
        this.dialogOrder = true
      }
    },
    labelCommand (parmas) {
      if (parmas.type === 'delete') {
        this.$confirm('删除标签会删除所有任务相关联的的标签。确认删除标签(' + parmas.info.name + ')？', '删除标签', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$http({
            url: '/worklist/labeldelete',
            method: 'post',
            data: {id: parmas.info.id}
          }).then(res => {
            if (res.errcode === 0) {
              this.init('default')
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }
          })
        }).catch(action => {
        })
      } else {
        this.labeltitle = '编辑标签'
        this.label = JSON.parse(JSON.stringify(parmas.info))
        this.label.index = parmas.index
        let labelColor = this.labelColor
        for (let i = 0; i < labelColor.length; i++) {
          if (labelColor[i].type === parmas.info.theme) {
            labelColor[i].checked = true
          } else {
            labelColor[i].checked = false
          }
        }
        this.dialogLabel = true
      }
    },
    addOrderBtn () {
      this.dialogOrder = true
      this.ordertitle = '添加清单'
      this.order = {
        name: '',
        display: true,
        theme: 'default',
        id: ''
      }
      this.orderColor = [
        {type: 'default', checked: true},
        {type: 'primary', checked: false},
        {type: 'success', checked: false},
        {type: 'info', checked: false},
        {type: 'danger', checked: false},
        {type: 'warning', checked: false}
      ]
    },
    orderSubmit () {
      let url = '/worklist/orderadd'
      let orderinfo = this.order
      orderinfo.display ? orderinfo.display = 1 : orderinfo.display = 0
      if (this.order.name === '') {
        this.$message('标题不能为空')
        return
      }
      if (this.order.id) {
        url = '/worklist/orderupdate'
      }
      this.$http({
        url: url,
        method: 'post',
        data: orderinfo
      }).then(res => {
        if (res.errcode === 0) {
          this.dialogOrder = false
          if (this.order.id) {
            for (let key in orderinfo) {
              if (key === 'theme') {
                orderinfo[key] = 'default'
              } else {
                orderinfo[key] = ''
              }
            }
            this.order = orderinfo
            this.init()
          } else {
            this.leftbar.orderlist.push(res.rows)
          }
        }
      })
    },
    labelSubmit () {
      let url = '/worklist/labeladd'
      let labelinfo = this.label
      if (this.label.name === '') {
        this.$message('标题不能为空')
        return
      }
      if (this.label.id) {
        url = '/worklist/labelupdate'
      }
      this.$http({
        url: url,
        method: 'post',
        data: labelinfo
      }).then(res => {
        if (res.errcode === 0) {
          this.dialogLabel = false
          if (this.label.id) {
            for (let key in labelinfo) {
              if (key === 'theme') {
                labelinfo[key] = 'default'
              } else {
                labelinfo[key] = ''
              }
            }
            this.label = labelinfo
            this.init()
          } else {
            this.leftbar.labellist.push(res.rows)
          }
        }
      })
    },
    getOrderColor (index, item) {
      let orderColor = this.orderColor
      for (let i = 0; i < orderColor.length; i++) {
        orderColor[i].checked = false
      }
      orderColor[index].checked = true
      this.order.theme = item.type
    },
    getLabelColor (index, item) {
      let labelColor = this.labelColor
      for (let i = 0; i < labelColor.length; i++) {
        labelColor[i].checked = false
      }
      labelColor[index].checked = true
      this.label.theme = item.type
    },
    init (val) {
      this.$http({
        url: '/worklist/order',
        method: 'get'
      }).then(res => {
        if (res.errcode === 0) {
          this.leftbar = res.groupObj
          let leftbar = res.groupObj
          let actives = {}
          if (val) {
            if (!val.detailshow) {
              this.$store.commit('detailShow', false)
              return false
            } else {
              this.$store.commit('detailShow', true)
              return false
            }
          } else {
            for (let key in leftbar) {
              actives[key] = []
              for (var i = 0; i < leftbar[key].length; i++) {
                if (leftbar[key][i].key === 'inbox') {
                  actives[key].push(true)
                } else {
                  actives[key].push(false)
                }
              }
            }
            this.actives = actives
            this.$store.commit('detailShow', false)
          }
        } else {
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
.activeSearch{
  display: none;
}
</style>

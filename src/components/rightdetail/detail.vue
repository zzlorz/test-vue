<template>
  <el-col id="detail" :class="detailShow && window_width<921?'showImportant':''">
    <div class="empty" v-if="!detailShow">
      <span class="emptytext">点击任务标题查看详情</span>
    </div>
    <div v-if="detailShow">
      <div style="border-bottom: 1px solid rgb(236, 233, 233);font-size: 13px;">
        <div style="margin:10px;line-height: 40px;overflow: hidden;text-align:left;">
          <div style="float: left">
            <span id="backtask" v-show="detailShow && window_width<921" style="font-size: 20px;margin-right: 10px;"><i class="el-icon-caret-left" @click="backtaskFn"></i></span>
            <span :class="detail.status==1?'completed':'level'+detail.level">
              <el-checkbox :disabled="detail.delstatus==1" valid-v-model="detail.status!=0" @change="check(detail, detail.index)"></el-checkbox>
            </span>
          </div>
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link">
              <div id="detailtime" v-if="!detail.disabled" :class="detail.type=='overdue'?'detailtimecolor':''">
                <el-date-picker
                  size="small"
                  :disabled="detail.delstatus==1"
                  v-model="detail.plantime"
                  align="right"
                  type="date"
                  class="dateupdate"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  @change="detailTmetimeChange"
                  >
                </el-date-picker>
              </div>
              <span :class="detail.type=='overdue'?'errorcolor':''">
                <span>{{detail.plantime|dateformats}}</span>
              </span>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >
                  <el-tooltip class="item" effect="dark" content="今天" placement="bottom">
                    <a :class="detail.plantime===quickDate.today?'selectdate active':'selectdate'" @click="quickChange({id:detail.id, index:detail.index, plantime: quickDate.today})"><i class="el-icon-sunny"></i></a>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="明天" placement="bottom">
                    <a :class="detail.plantime===quickDate.tomorrow?'selectdate active':'selectdate'" @click="quickChange({id:detail.id, index:detail.index, plantime: quickDate.tomorrow})"><i class="el-icon-sunrise-1"></i></a>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="下周" placement="bottom">
                    <a :class="detail.plantime===quickDate.week?'selectdate active':'selectdate'" @click="quickChange({id:detail.id, index:detail.index, plantime: quickDate.week})"><i class="el-icon" style="font-style:normal;font-size:16px;padding:4px 12px;">7</i></a>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="下月" placement="bottom">
                    <a :class="detail.plantime===quickDate.month?'selectdate active':'selectdate'" @click="quickChange({id:detail.id, index:detail.index, plantime: quickDate.month})"><i class="el-icon-moon"></i></a>
                  </el-tooltip>
                </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="float: right" v-if="detail.disabled">
              <i class="el-icon-s-operation" :class="`level${detail.level}`" style="transform: rotate(90deg);font-size: 18px;"></i>
          </span>
          <Level v-if="detail.delstatus!=1" @command="detailLevel" v-bind:levelData="Number(detail.level)" style="float: right;"></Level>
        </div>
      </div>
      <div style="margin:10px;line-height: 30px;">
        <el-input v-model="detail.name" placeholder="请输入任务标题" v-if="detail.delstatus==1" :disabled='detail.delstatus==1' class="input-reset"></el-input>
        <el-input v-model="detail.name" placeholder="请输入任务标题" v-if="detail.delstatus!=1" class="input-reset" @blur="titleChange"></el-input>
        <div :style="{height: (window_height - 200) + 'px'}">
          <el-scrollbar style="position: relative;width: 100%;height:100%;height: 100%" >
            <div style="text-align:left;">
              <el-tag
                :type="tag.theme"
                :key="tag.name"
                size="small"
                v-for="(tag, index) in detail.labellist"
                closable
                :disable-transitions="false"
                @close="handleClose(index)">
                {{tag.name}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputConfirm"
                @blur="noInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="mini" @click="showInput">+</el-button>
              <VueEditor
                v-model="detail.detail"
                :editor-toolbar="customToolbar"
                :disabled='detail.delstatus==1'
                @focus="onEditorFocus"
                @blur="onEditorBlur"
                @imageAdded="imageHandler"
                :useCustomImageHandler="imageBool"
                :placeholder="placeholder">
              </VueEditor>
            </div>
            <div class="dt-imgcontent" style="">
              <div class="dt-imgmain" style="" @click="setSlider({bool: true,index})" v-for="(item, index) in taskimg" :key="index">
                <img class="dt-img" style="" :src="`${url}/taskimg/upload/`+item.img" />
                <div class="dt-imgtool" style="">
                  <div class="dt-imgtool-comtent" style="">
                    <span class="dt-imgtool-imgname">{{item.img}}</span>
                    <div class="dt-imgtool-items"><i class="el-icon-download" @click.stop="downloadImg(`${url}/taskimg/upload/`+item.img, item.img)" title="下载"></i><i class="el-icon-delete-solid" @click.stop="trash(item.id, index, item.img)" title="删除"></i></div>
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <div style="border-top:1px solid rgb(236, 233, 233);height: 60px;background: #fff;position: absolute;right: 0;bottom: 0;width: 100%;font-size: 18px;line-height: 60px;color: #999">
        <div style="width: 70%;float: left;text-align:left;">
          <i class="el-icon-files" style="margin-left:8%;"></i>
          <span style="font-size: 14px;">收集箱</span></div>
        <div style="width: 28%;float: left;overflow:hidden;">
          <div style="width: 33%;float: left;"><i class="el-icon-s-comment" title="评论"></i></div>
          <div style="width: 33%;float: left;"><i class="el-icon-delete-solid" title="删除"></i></div>
          <div style="width: 33%;float: left;">
            <el-dropdown trigger="click"  @command="detailmore" >
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="upload"><i class="el-icon-paperclip"> 上传附件</i></el-dropdown-item>
                  <el-dropdown-item command="print"><i class="el-icon-printer"> 打印</i></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </el-col>
</template>
<script>
import Level from '../level.vue'
import { VueEditor } from 'vue2-editor'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'detail',
  components: {
    VueEditor: VueEditor,
    Level: Level
  },
  data () {
    return {
      url: process.env.API_ROOT,
      labellist: [],
      quickDate: {},
      inputVisible: false,
      inputValue: '',
      placeholder: '描述',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [ 'code-block' ] // 'image'
      ],
      imageBool: true,
      noedit: false,
      setDetaileHeight: ''
    }
  },
  computed: {
    ...mapState(['detail', 'detailShow', 'taskimg'])
  },
  watch: {
    detail (value) {
      console.log(value)
    }
  },
  created () {
    this.labellist = this.$store.state.overalllabellist
    this.quickDate = {
      today: this.moment().format('YYYY-MM-DD'),
      tomorrow: this.moment().add(1, 'days').format('YYYY-MM-DD'),
      week: this.moment().add(7, 'days').format('YYYY-MM-DD'),
      month: this.moment().add(30, 'days').format('YYYY-MM-') + this.moment().format('DD')
    }
  },
  mounted () {
    let _this = this
    window.addEventListener('keydown', function (e) {
      if (!_this.noedit) {
        return
      }
      if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
        if (_this.showDetail) {
          e.preventDefault()
          // return;
          _this.$http({
            url: '/worklist/taskdetailchange',
            method: 'post',
            data: {id: _this.detail.id, detail: _this.detail.detail}
          }).then(res => {
            if (res.errcode === 0) {
              // _this.$notify({
              //   title: '保存成功',
              //   type: 'success',
              //   offset: 100,
              //   duration: 1500
              // })
              _this.$message({message: '正在保存...', type: 'success', offset: 4, center: true, duration: 1500})
              _this.$store.commit('detailChange', {'detail': _this.detail, index: _this.detail.index})
            }
          })
        }
      }
    })
    window.addEventListener('paste', function (e) {
      let _this = this
      if (!_this.noedit) {
        return
      }
      var data = e.clipboardData || window.clipboardData
      // 获取图片内容
      var blob = data.items[0].getAsFile()
      // 判断是不是图片，最好通过文件类型判断
      var isImg = (blob && 1) || -1
      // eslint-disable-next-line no-unused-vars
      var reader = new FileReader()
      if (isImg >= 0) {
        // 将文件读取为 DataURL
        var formData = new FormData()
        formData.append('file', blob)
        formData.append('taskid', _this.detail.id)
        _this.$http({
          url: '/worklist/taskimg',
          method: 'post',
          data: formData
        }).then(res => {
          if (res.errcode === 0) {
            _this.imglist.unshift(res.data)
          }
        })
      }
    })
  },
  methods: {
    quickChange (info) {
      this.detailTmetimeChange(info.plantime)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      this.inputVisible = false
      if (this.inputValue) {
        // 添加标签
        console.log(this.detail.labellist)
        // eslint-disable-next-line one-var
        let labelbool1 = true,
          labelbool2 = true,
          labelbool2val = {},
          labelbool1ids = []
        for (let i = 0; i < this.detail.labellist.length; i++) {
          labelbool1ids.push(this.detail.labellist[i].labelitemsid)
          if (this.inputValue === this.detail.labellist[i].name) {
            this.inputVisible = false
            this.inputValue = ''
            labelbool1 = false
            break
          }
        }

        for (let i = 0; i < this.labellist.length; i++) {
          if (this.inputValue === this.labellist[i].name) {
            this.inputVisible = false
            this.inputValue = ''
            labelbool2 = false
            labelbool2val = this.labellist[i]
          }
        }
        if (labelbool1 && labelbool2) {
          // 新增标签
          this.$http({
            url: '/worklist/labeladd',
            method: 'post',
            data: {name: this.inputValue, theme: 'default'}
          }).then(res => {
            if (res.errcode === 0) {
              this.detail.labellist.push(res.rows)
              labelbool1ids.push(res.rows.id)
              this.$http({
                url: '/worklist/tasklabelupdate',
                method: 'post',
                data: {id: this.detail.id, labelid: labelbool1ids.join(',')}
              }).then(res => {
                if (res.errcode === 0) {
                  this.$store.commit('leftBarChange', {detailShow: true})
                  this.$store.commit('detailChange', {'detail': this.detail, 'index': this.detail.index})
                }
              })
            }
          })
        } else if (labelbool1 && !labelbool2) {
          // 赋值标签
          labelbool1ids.push(labelbool2val.id)
          this.$http({
            url: '/worklist/tasklabelupdate',
            method: 'post',
            data: {id: this.detail.id, labelid: labelbool1ids.join(',')}
          }).then(res => {
            if (res.errcode === 0) {
              this.detail.labellist.push(labelbool2val)
              this.$store.commit('leftBarChange', {detailShow: true})
              this.$store.commit('detailChange', {'detail': this.detail, 'index': this.detail.index})
              console.log(this.detail)
            }
          })
        }
      }
    },
    noInputConfirm () {
      this.inputVisible = false
      this.inputValue = ''
    },
    handleClose (index) {
      this.detail.labellist.splice(index, 1)
    },
    downloadImg (img, imgName) {
      this.downloadByData(img, imgName) // canvas
      // this.downloadByBlob(img)
    },
    trash (id, index, imgname) {
      // eslint-disable-next-line one-var
      let imglist = this.imglist
      this.$http({
        url: '/worklist/taskimgdel',
        method: 'post',
        data: {id: id, img: imgname}
      }).then(res => {
        if (res.errcode === 0) {
          imglist.splice(index, 1)
          this.imglist = imglist
          this.$store.commit('taskimg', imglist)
        }
      })
    },
    ...mapMutations(['setSlider']),
    imageHandler (eee) {
    },
    onEditorFocus (range) {
      this.noedit = true
    },
    onEditorBlur (range) {
      this.noedit = false
    },
    titleChange () {
      let detail = this.detail
      this.$http({url: '/worklist/tasktitlechange', method: 'post', data: {time: this.moment().format('YYYY-MM-DD'), id: detail.id, name: detail.name}})
        .then(res => {
          this.$store.commit('titleChange', {type: detail.type, index: detail.index, name: detail.name})
        })
    },
    backtaskFn () {
      this.tasklistshow = true
    },
    check (item, index) {
      this.$store.commit('checkStatus', {item, index})
    },
    detailTmetimeChange (plantime) {
      const _this = this
      let detail = this.detail
      if (plantime) {
        detail.plantime = plantime
      }
      _this.$http({
        url: '/worklist/plantimeupdate',
        method: 'post',
        data: {id: detail.id, plantime: detail.plantime}
      }).then(res => {
        if (res.errcode === 0) {
          _this.$store.commit('detailPlanChange', detail)
        }
      })
    },
    detailLevel (res) {
      let _this = this
      let detail = this.detail
      this.detail.level = res
      this.$http({url: '/worklist/uplevel', method: 'post', data: {id: detail.id, level: res}})
        .then(data => {
          _this.$store.commit('levelChange', {type: detail.type, index: detail.index, level: res})
        })
      // this[detail.type][index].level = res
    },
    detailmore (res) {
      if (res === 'print') {
        window.print()
      }
    },
    //  data: URLs方式
    downloadByData (url, imgName) {
      let _this = this
      let image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      image.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        let ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()
        let dataURL = canvas.toDataURL('image/' + ext)
        _this.download(dataURL, imgName)
      }
    },
    //  blob: URLs方式
    downloadByBlob (url, imgName) {
      let _this = this
      let image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      image.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob)
          _this.download(url, imgName)
          // 用完释放URL对象
          URL.revokeObjectURL(url)
        })
      }
    },
    download (href, name) {
      let eleLink = document.createElement('a')
      eleLink.download = name
      eleLink.href = href
      eleLink.click()
      eleLink.remove()
    }
  }
}
</script>
<style scoped>
.ql-editor{
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.quillWrapper .ql-snow.ql-toolbar{
  /* display: none; */
  position: absolute;
  right: 13px;
  top: 1%;
  background: rgba(255,255,255,.8);
  padding-top: 4px !important;
  padding-bottom: 0px !important;
  box-shadow: 0 2px 18px 0 rgba(0,0,0,.15);
  border: 0;
  z-index: 999;
  height: 210px;
  width: 40px;
}
.ql-snow .ql-toolbar button, .ql-snow.ql-toolbar button{
  margin: 3px 0;
  padding: 3px 2px !important;
  opacity: .6;
}
.ql-snow .ql-toolbar button svg, .quillWrapper .ql-snow.ql-toolbar button svg{
  width: 18px;
  height: 24px;
}
.quillWrapper .ql-snow.ql-toolbar .ql-formats{
  margin-bottom: 7px !important;
}
.quillWrapper .ql-container.ql-snow{
  border: 0;
}
.ql-toolbar.ql-snow{
  border-radius: 6px;
}
.dt-imgcontent{
  width: 100%;
  text-align: left;
  overflow: hidden;
}
.dt-imgmain{
  position: relative;
  width: 96%;
  height: 180px;
  border-radius: 6px;
  overflow: hidden;
  margin: 10px auto;
  cursor: pointer;
}
.dt-img{
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.dt-imgtool{
  width: 100%;
  height: 50px;
  position: absolute;
  left: 0;
  bottom: -100px;
  line-height: 50px;
  text-align: right;
  background-image: linear-gradient( 0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.01));
  transition: all ease-in .3s;
}
.dt-imgmain:hover .dt-imgtool{
  bottom: 0;
}
.dt-imgtool-comtent{
  width: 94%;
  height: 100%;
  margin: 0 auto;
  text-align: left;
}
.dt-imgtool-imgname{
  color: #fff;
}
.dt-imgtool-items{
  float: right;
}
.dt-imgtool-items i{
  cursor: pointer;
  color: #666;
  transition: all ease-in .3s;
}
.dt-imgtool-items i:first-child{
  margin-right: 16px
}
.dt-imgtool-items i:hover{
  color: #fff
}
.input-new-tag {
  width: 60px;
  vertical-align: bottom;
}
.el-input--mini .el-input__inner {
  height: 24px;
  line-height: 24px;
  padding: 0 6px;
}
.el-button--mini, .el-button--mini.is-round {
  padding: 5px 15px;
}
</style>

<template>
  <div class="container">
    <!-- <div style="width: 100px;height:100%;background: #4438CA;float: left;">
    </div> -->
    <div class="main">
      <div class="m-header-top" style="overflow: hidden;">
        <div class="m-header-edit">
          <div class="m-title-edit">
            <p><span><a href="/">记录时光</a></span>  |  写主题</p>
          </div>
          <div class="action">
            <el-button size="mini" type="primary" plain @click="onSubmit">保存</el-button>
          </div>
        </div>
      </div>
      <div class="m-content" v-loading="loading">
        <el-row>
          <el-col :span="24">
            <div class="m-photo-edit" ref="getListDomHeight">
                <div id="editor">
                  <div class="cover-img">
                    <img :src="imgPrefix+form.theme_cover" v-show="form.theme_cover" alt="">
                    <div class="cover-img-tool" v-show="form.theme_cover">
                      <el-upload
                        class="upload-demo"
                        ref="upload"
                        action=""
                        accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                        :http-request="handleUploadCover"
                        :show-file-list="false"
                        >
                        <i slot="trigger" class="el-icon-camera"></i>
                      </el-upload>
                      <el-divider></el-divider>
                      <i class="el-icon-delete" style="cursor: pointer;" @click="delCover"></i>
                    </div>
                    <el-upload v-show="!form.theme_cover"
                      class="upload-cover"
                      ref="upload"
                      action=""
                      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                      :http-request="handleUpload"
                      :show-file-list="false"
                      >
                      <el-button slot="trigger" size="mini" type="info" circle icon="el-icon-camera-solid"></el-button>
                    </el-upload>
                  </div>
                  <input v-model="form.theme_title" class="title-input" placeholder="请输入主题标题(最多20字)" maxlength="20">
                  <div style="margin-bottom: 18px;">
                    <el-cascader
                      align="right"
                      v-model="form.theme_position"
                      :options="cityData"
                      :props="{ expandTrigger: 'hover' }"
                      @change="handleChange"
                      size="mini"
                    >
                    </el-cascader>
                    <el-input style="width: 277px;" placeholder="具体地点" v-model="form.theme_position_detail"
                      size="mini">
                      <i slot="prefix" class="el-input__icon el-icon-location-information"></i>
                    </el-input>
                    <el-date-picker
                      v-model="form.theme_date"
                      type="datetime"
                      placeholder="选择日期时间"
                      align="right"
                      size="mini"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </div>
                  <vue-editor
                    v-bind:class="{'editor-class-fixed': editorClassFixed, 'editor-class': editorClass}"
                    v-model="form.theme_description"
                    :editor-toolbar="customToolbar"
                    :useCustomImageHandler="useCustomImageHandler"
                    @image-added="handleImageAdded"
                    placeholder="请输入正文">
                  </vue-editor>
                </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div :class="{'fixed-img-box': true, 'close-fixed': closeFixed}">
      <div style="text-align: center;position: relative;"><i class="el-icon-s-unfold" @click="closeFixed = true" style="position: absolute;top: 6px;left: 10px;font-size: 20px;"></i> <span style="font-size: 12px;">已上传图片</span></div>
      <el-row>
        <el-col :span="12" v-for="(item, index) in form.photo_ids" :key="index+'img'">
          <div class="item-imgs"><img :src="imgPrefix+item.url" alt=""></div>
        </el-col>
      </el-row>
    </div>
    <div :class="{'fixed-img-box-handle': true,'open-fixed': closeFixed}"><i class="el-icon-s-fold" @click="closeFixed = false" style="font-size: 20px;"></i></div>
  </div>
</template>

<script>
import cityData from '@/assets/cityData.js'
import supabase from '@/utils/supabaseQuery'
import {getItem, postItem, putItem} from '@/api/theme.js'
import {postPhoto, deletePhoto} from '@/api/photo.js'
import {parseTime} from '@/utils/parseTime.js'
import * as qiniu from 'qiniu-js'
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'admin',
  components: {
    VueEditor
  },
  data () {
    return {
      customToolbar: [
        [{'header': [false, 1, 2, 3, 4, 5, 6]}], // 标题
        ['bold', 'italic', 'underline', 'strike', 'italic'], // 加粗\斜体\下划线\中划线\斜体
        [{'align': ''}, {'align': 'center'}], // 对齐{'align': 'right'}
        [{'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }], // 有序无序列表
        [{'color': []}], // 背景色{'background': []},
        ['image', 'link'], // 图片、链接
        ['code', 'code-block'], // 代码\代码块
        // ['video'], // 视频
        ['clean'] // 清楚格式（所谓去掉背景色这些花里胡巧）
      ],
      imgPrefix: 'http://cdn.youlaji.com/',
      useCustomImageHandler: true,
      cityData: cityData(),
      rules: {
        title: [
          { required: true, message: '请输入主题名称', trigger: 'blur' }
        ]
      },
      form: {
        theme_id: '',
        theme_title: '',
        theme_position: [],
        theme_position_detail: '',
        theme_date: '',
        theme_description: '',
        photo_ids: [],
        theme_cover: ''
      },
      loading: true,
      closeFixed: false,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      editorClassFixed: false,
      editorClass: true
    }
  },
  computed: {
  },
  created () {
    if (this.$route.params.id) {
      this.disabled = true
      this.form.theme_id = this.$route.params.id
      this.getData(this.$route.params.id)
    } else {
      this.disabled = false
      this.loading = false
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      if (top > 350) {
        this.editorClassFixed = true
      } else {
        this.editorClassFixed = false
      }
    })
  },
  methods: {
    handleUploadCover (info) {
      // 覆盖已有封面
      this.coverUpload(info, 'remove')
    },
    handleUpload (info) {
      // 无封面上传
      this.coverUpload(info)
    },
    coverUpload (info, source) {
      const self = this
      let domain = 'http://api.youlaji.com'
      axios.post(domain + '/qiniuToken').then(resolve => {
        let observer = {
          next (result) {
            info.onProgress({ percent: Math.floor(result.total.percent) }, info.file)
          },
          complete (res) {
            info.file.status = 'done'
            info.file.key = res.key.split('_')[0]
            info.onSuccess(res, info.file)
            deletePhoto({id: '', url: self.form.theme_cover}).then((d) => {
              self.form.theme_cover = res.key
              self.onSubmit()
            })
          }
        }
        const putExtra = {
          fname: '',
          params: {},
          mimeType: null
        }
        const config = {
          region: qiniu.region.z0,
          concurrentRequestLimit: 3
        }
        let key = new Date().getTime() + '_' + info.file.name
        let observable = qiniu.upload(info.file, key, resolve.data, putExtra, config)
        observable.subscribe(observer)
      })
    },
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      let info = {file}
      const self = this
      let domain = 'http://api.youlaji.com'
      axios.post(domain + '/qiniuToken').then(resolve => {
        let observer = {
          next (result) {
            // info.onProgress({ percent: Math.floor(result.total.percent) }, info.file)
          },
          complete (res) {
            info.file.status = 'done'
            info.file.key = res.key.split('_')[0]
            // info.onSuccess(res, info.file)
            postPhoto({url: res.key}).then(data => {
              let url = self.imgPrefix + res.key // 返回给你的图片路径
              Editor.insertEmbed(cursorLocation, 'image', url)
              resetUploader()
              self.form.photo_ids.push({id: data.data.insertId, url: res.key, photo_title: '', photo_description: ''})
            })
          }
        }
        const putExtra = {
          fname: '',
          params: {},
          mimeType: null
        }
        const config = {
          region: qiniu.region.z0,
          concurrentRequestLimit: 3
        }
        let key = new Date().getTime() + '_' + info.file.name
        let observable = qiniu.upload(info.file, key, resolve.data, putExtra, config)
        observable.subscribe(observer)
      })
    },
    escape2Html (str) {
      const arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'}
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, (all, t) => arrEntities[t])
    },
    formatData () {
      let submitData = Object.assign({}, this.form)
      submitData.theme_description = this.escape2Html(submitData.theme_description)
      submitData.theme_description = decodeURI(submitData.theme_description)
      let unUrls = []
      let urls = []
      let ids = submitData.photo_ids.filter(item => {
        if (submitData.theme_description.indexOf(item.url) >= 0) {
          urls.push(item)
          return item
        } else {
          unUrls.push(item)
        }
      })
      ids = ids.map(item => item.id)
      delete submitData.photo_ids
      submitData.photo_ids = ids.join(',')
      submitData.theme_date = parseTime(new Date(submitData.theme_date), '{y}-{m}-{d} {h}:{i}:{s}')
      submitData.theme_position = submitData.theme_position.join(' ')

      this.delPhoto(unUrls, urls)
      return submitData
    },
    displayData (data) {
      data.theme_position = data.theme_position.split(' ')
      data.theme_date = parseTime(new Date(data.theme_date), '{y}-{m}-{d} {h}:{i}:{s}')
      data.photo_ids = data.photo_ids ? data.photo_ids.split(',') : []
      // data.photo_ids = data.photo_ids.map(item => {
      //   return item
      // })
      return data
    },
    async getData (id) {
      this.loading = true
      const { data: todos, error } = await supabase.from('youlaji_blog_test').select('*').eq('theme_id', id)
      this.form = this.displayData(todos[0])
      this.loading = false
      // getItem({id: id}).then(data => {
      //   this.form = this.displayData(data.data)
      //   this.loading = false
      // })
    },
    delPhoto (unUsedUrl, usedUrl) {
      if (unUsedUrl && unUsedUrl.length > 0) {
        unUsedUrl.forEach(item => {
          deletePhoto(item)
        })
        this.form.photo_ids = JSON.parse(JSON.stringify(usedUrl))
      }
    },
    delCover () {
      deletePhoto({id: '', url: this.form.theme_cover}).then(res => {
        if (res.code === 0) {
          this.form.theme_cover = ''
          this.onSubmit()
        }
      })
    },
    setCover (index) {
      let photoIds = this.form.photo_ids
      photoIds = photoIds.map(item => {
        item.cover = false
        return item
      })
      photoIds[index].cover = true
      this.form.photo_ids = photoIds
    },
    handleChange (value) {

    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    onSubmit () {
      const self = this
      if (!this.form.theme_title) {
        this.form.theme_title = '空'
      }
      if (this.form.theme_id) {
        putItem(this.formatData()).then(data => {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 1000,
            onClose () {
              self.loading = false
            }
          })
        })
      } else {
        let addData = this.formatData()
        delete addData.theme_id
        postItem(addData).then(data => {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 1000,
            onClose () {
              self.disabled = true
              self.form.theme_id = data.data.insertId
              self.loading = false
            }
          })
        })
      }
    }
  }
}
</script>
<style>
.main{overflow: hidden;}
body{background: #fff;}
#editor {
  margin: auto;
  width: 700px;
  height: 100%;
}
input::-webkit-input-placeholder {
  color: #999;
}
input:-moz-placeholder {
  color: #999;
}
input::-moz-placeholder {
  color: #999;
}
input:-ms-input-placeholder{
  color: #999;
}
.cover-img{
  width: 100%;
  height: 200px;
  text-align: center;
  background: #f1f1f1;
  margin-bottom: 18px;
  position: relative;
}
.cover-img-tool{
  position: absolute;
  right: 0px;
  bottom: 0px;
  z-index: 2;
  color: #fff;
  background: #333;
  padding: 8px 16px;
  border-top-left-radius: 6px;
}
.cover-img .el-icon-camera-solid{
  font-size: 30px;
  color: #ddd;
}
.cover-img .upload-cover{
  line-height: 200px;
}
.cover-img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.title-input{
  font-size: 32px;
  color: #333;
  font-weight: bold;
  width: 100%;
  height: 40px;
  border:1px solid #fff;
  outline: none;
  margin-bottom: 15px;
}
.title-input:active,.title-input:focus,.title-input:focus-visible{
  border:1px solid #fff;
}
.editor-class .ql-toolbar.ql-snow{
  border-left: 0;
  border-right: 0;
}
.editor-class .ql-container.ql-snow{
  border: 0 !important;
}
.editor-class .ql-editor{
  padding: 12px 50px;
  margin: 0 -50px;
}
.editor-class .ql-editor p img{
  padding: 0 2px;
}
.editor-class .ql-editor pre{
  margin: 0 2px;
}
.editor-class .ql-toolbar.ql-snow{
  border-top: 1px solid #e7e8ea;
  border-bottom: 1px solid #e7e8ea;
}
.editor-class-fixed .ql-toolbar{
  position: fixed;
  top: 50px;
  z-index: 2;
  background: #fff;
  width: 700px;
}
.editor-class-fixed #quill-container{
  margin-top: 105px;
}
.container{
  width: 100%;
  height: 100%;
}
.m-header-top{
  width: 100%;
  z-index: 9;
  position: fixed;
  height: 49px;
  border-bottom: 1px solid #e7e8ea;
  line-height: 49px;
}
.m-header-edit{
  width: 700px;
  margin: 0 auto;
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items:center;
  box-sizing: border-box;
  background: #fff;
}
.m-bar{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items:center;
}
.m-avatar{
  margin-right: 20px;
}
.m-content{
  position:relative;
}
.m-photo-edit{
  flex: 16;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
  padding: 80px 20px 0 20px;
}
.m-header-edit .m-title-edit a{
  font-weight: bold;
  font-size: 18px;
  color: #013AAB;
  text-decoration: none;
}

.theme{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.theme-item{
  width: 235px;
  margin: 0 0 10px 0;
}
.m-info{
  flex: 2;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  background: #fff;
}
.fixed-img-box{
  position: fixed;
  top: 50px;
  right: 0px;
  width: 280px;
  height: 100%;
  background: #e7e8ea;
  overflow: auto;
  z-index: 3;
}
.fixed-img-box .item-imgs{
  width: 120px;
  height: 120px;
  background: #fff;
  margin: 10px 0 0 10px;
}
.fixed-img-box .item-imgs img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fixed-img-box::-webkit-scrollbar {display:none}
.close-fixed{
  right: -300px;
}
.fixed-img-box-handle{
  position: fixed;
  top: 55px;
  right: 10px;
}
</style>

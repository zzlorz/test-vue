<template>
  <div>
    <header class="fixed-shadow" :class="{'reset-height': headerClass}">
      <div style="height: 100%;max-width: 700px;margin: 0 auto;padding:0 20px;display: flex;align-items: center; justify-content: space-between;">
        <a href="/"><img style="border-radius: 8px;" :src="headerClass?studentImgSm:studentImg"/></a>
        <span style="color: #555; font-weight: bold;font-size: 18px;" v-show="headerClass"><el-icon class="el-icon-s-flag"></el-icon> {{form.theme_title}}</span>
      </div>
    </header>
    <div id="markContent" ref="markContent">
      <div :style="{'margin-top': '95px','margin-bottom': '50px','background': coverBg}">
        <div style="max-width: 1000px;height: 300px;text-align: center;margin: 0 auto;overflow: hidden;position:relative;">
          <!-- <div style="height: 100%;width: 20%;position: absolute;left: 0;" :style="{'background': '-webkit-linear-gradient(left , '+coverBg+', transparent)'}"></div>
          <div style="height: 100%;width: 20%;position: absolute;right: 0;" :style="{'background': '-webkit-linear-gradient(right , '+coverBg+', transparent)'}"></div> -->
          <img :src="imgPrefix + form.theme_cover" style="height: 100%; width: 100%;object-fit: cover;" alt="" ref="cover" crossOrigin="anonymous">
        </div>
      </div>
      <div class="img-div">
        <h2 style="text-align: center;margin-bottom: 40px;font-size: 24px;">{{form.theme_title}}</h2>
        <div style="max-width: 700px;margin:0 auto;padding: 20px;">
          <p style="font-size: 12px;color: #999;margin-bottom: 16px;">活动地点：<el-icon class="el-icon-location-information"></el-icon> {{form.theme_position}} {{form.theme_position_detail}}</p>
          <p style="font-size: 12px;color: #999;margin-bottom: 16px;">活动日期：<el-icon class="el-icon-date"></el-icon> {{form.theme_date}}</p>
          <div style="margin-bottom: 16px; text-align:justify; color: #333;font-size: 14px;">
            <div class="ql-snow">
              <div class="ql-editor" style="line-height: 28px;padding-left: 0;padding-right:0;" v-html="form.theme_description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getItemDetail} from '@/api/index.js'
import {parseTime} from '@/utils/parseTime.js'
import 'quill/dist/quill.snow.css'
export default {
  data () {
    return {
      studentImg: require('@/assets/img/logo_ylj.jpg'),
      studentImgSm: require('@/assets/img/logo_ylj_sm.jpg'),
      headerClass: false,
      imgPrefix: 'http://cdn.youlaji.com/',
      form: {},
      coverBg: ''
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
    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (scrollTop > 150) {
        this.headerClass = true
      } else {
        this.headerClass = false
      }
    }
  },
  methods: {
    displayData (data) {
      data.theme_position = data.theme_position.split(' ')
      data.theme_date = parseTime(new Date(data.theme_date), '{y}-{m}-{d} {h}:{i}:{s}')
      data.photo_ids = data.photo_ids.map(item => {
        item.cover = (item.url === data.theme_cover)
        return item
      })
      return data
    },
    getData (id) {
      this.loading = true
      getItemDetail({id: id}).then(data => {
        this.form = this.displayData(data.data)
        this.loading = false
        this.$refs.cover.onload = () => {
          this.coverBg = this.getAverageRGB(this.$refs.cover)
        }
      })
    },
    back () {

    },
    getAverageRGB (imgEl) {
      let blockSize = 5 // only visit every 5 pixels
      let defaultRGB = {r: 255, g: 255, b: 255} // for non-supporting envs
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d') // canvas.getContext && canvas.getContext('2d')
      let data
      let width
      let height
      let i = -4
      let length
      let rgb = {r: 255, g: 255, b: 255}
      let count = 0

      if (!context) {
        return defaultRGB
      }

      height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height
      width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width
      context.drawImage(imgEl, 0, 0)
      try {
        data = context.getImageData(0, 0, width, height)
      } catch (e) {
        /* security error, img on diff domain */
        return defaultRGB
      }

      length = data.data.length

      while ((i += blockSize * 4) < length) {
        ++count
        rgb.r += data.data[i]
        rgb.g += data.data[i + 1]
        rgb.b += data.data[i + 2]
      }

      // ~~ used to floor values
      rgb.r = ~~(rgb.r / count)
      rgb.g = ~~(rgb.g / count)
      rgb.b = ~~(rgb.b / count)
      return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')'
    }
  }
}
</script>
<style scoped>
header {
  width: 100%;
  background: #fff ;
  height: 95px;
  overflow: hidden;
  transition: all ease-in 0.3;
  border-bottom: 1px solid #e7e8ea;
  transition: all ease-in 0.5s;
}
.fixed-shadow{
  position: fixed;
  top: 0;
  height: 95px;
  z-index: 99999;
  overflow: hidden;
  /* box-shadow: 0 0 12px rgba(0, 0, 0, 0.5); */
}
.reset-height{
  height: 45px;
}
#fullmarks{
  display: -webkit-flex;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  z-index: 9999
}
#fullmarks #markContent{
  width: 860px;
  margin: auto;
}
.close-btn{
  width: 30px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size:14px;
  background: rgba(13,94,160,.5);
  border-radius: 50%;
  position: fixed;
  left:10px;
  top: 12px;
  cursor: pointer;
}
.next-btn{
  width: 30px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  background: rgba(13,94,160,.5);
  border-radius: 50%;
  position: fixed;
  right:10px;
  top: 12px;
  cursor: pointer;
}
.previous-btn{
  width: 30px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  background: rgba(13,94,160,.5);
  border-radius: 50%;
  position: fixed;
  right:60px;
  top: 12px;
  cursor: pointer;
}
.img-div{
  margin: auto;
}
.img-div img{
  margin: auto;
}
#fullmarks.show{
  display: block;
}
#fullmarks.hide{
  display: none;
}
.item-img-description{
  line-height: 28px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #666;
  position: relative;
}
</style>

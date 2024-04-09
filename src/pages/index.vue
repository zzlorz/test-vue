<template>
  <div class="container">
    <!-- <div style="width: 100px;height:100%;background: #4438CA;float: left;">
    </div> -->
    <div class="main">
      <div class="m-header fixed-shadow" :class="{'reset-height':headerClass}">
        <div style="flex: 10;">
          <div style="max-width: 940px;margin: 0 auto;">
            <div style="padding: 0 10px;display: flex;align-items: center">
              <!-- <a href="/"><img style="border-radius: 8px;" :src="imgPrefix+'logo_youlaji.png'"/></a> -->
              <a href="/"><img style="border-radius: 8px;" :src="headerClass?studentImgSm:studentImg"/></a>
            </div>
          </div>
        </div>
      </div>
      <div class="m-content">
        <div class="m-photo" ref="getListDomHeight">
          <div class="m-photo-list">
            <div class="m-photo-tab-pane">
              <div style="display: flex;flex-wrap: nowrap;padding: 0 10px;">
                <el-carousel indicator-position="outside" style="width: 100%;" :interval="4000" @change="changeSwiper">
                  <el-carousel-item v-for="(item, index) in swiperData" :key="index+'s'">
                    <div class="transform" style="flex: 10;" ref="big">
                      <img :src="imgPrefix1+item.theme_cover" :ref="'swiper'+index" @click="showDetail(index)" style="object-fit: cover" crossOrigin="anonymous" :style="{width: '100%', height: '300px'}">
                      <div class="theme_title">
                        <div>{{item.theme_title}}</div>
                        <p><el-icon class="el-icon-location-information"></el-icon> {{item.theme_position}}</p>
                      </div>
                      <div class="transform-preview-btn">
                        <el-button icon="el-icon-view" plain type="info" title="预览" @click="showbar(index)" circle></el-button>
                      </div>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div style="padding: 10px;">
                <div style="font-size:18px;font-weight: bold;color: #666;">所有日记</div>
                <el-divider></el-divider>
              </div>
              <div class="m-photo-item-list">
                <el-row>
                  <el-col v-for="(item, index) in imgList" :span="12" :key="item.index">
                    <div class="div" ref="div">
                      <div style="margin: 10px;" :class="{'img-style div-img':true}">
                        <el-image @click="showDetail(index)" :src="imgPrefix1+item.theme_cover" fit="cover" :style="{width: '100%', height: '200px'}"></el-image>
                        <div style="padding:10px 20px;">
                          <p class="item-theme-desc">{{item.theme_title}}</p>
                          <p style="font-size: 12px;color: #999;display: flex;justify-content: space-between;margin-top: 10px;">
                            <span style="line-height: 28px;"><el-icon class="el-icon-location-information"></el-icon> {{item.theme_position}}</span>
                            <el-button type="info" size="mini" icon="el-icon-view" circle plain @click="showbar(index)"></el-button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="turn" style="width: 70px;height:70px;overflow: hidden;margin: 0 auto;border-radius: 50px;" :style="{'border': '10px solid '+borderBg}">
              <el-image style="width: 100%;height: 100%;" fit="cover" :src="imgPrefix+'avatar_ylj.jpg'"></el-image>
            </div>
            <h3 style="text-align: center;margin: 20px 0;"><img :src="imgPrefix+'art_leilei.png'"/></h3>
            <div style="font-size: 14px;width: 220px;margin: 0 auto;">
              <p style="text-align:right;line-height: 50px;">一寸光阴一寸金，寸金难买寸光阴</p>
              <p style="text-align:right;">—— 谚语</p>
            </div>
            <div class="primary-sidebar">
              <h5 class="widget-title">感慨时光</h5>
              <div class="social-links" style="font-size: 14px;text-indent: 26px;text-align:justify;margin-bottom: 10px;line-height: 24px;">
                一晃眼，多少个年华已过，匆匆离去的是时光和背影，刻在心头的是回忆和期待。
              </div>
              <div class="social-links" style="font-size: 14px;text-indent: 26px;text-align:justify;line-height: 24px;">
                我来不及认真的年轻，待明白时只能选择认真地老去。感恩，感恩生命里的每一个相遇。褪去年少无知，只待岁月静好。
              </div>
            </div>
            <div class="primary-sidebar">
              <h5 class="widget-title">友情联系</h5>
              <div class="social-links">
                <el-popover
                  placement="bottom-start"
                  title="微信"
                  width="228"
                  trigger="hover"
                  >
                  <el-image :src="erweima_wx"></el-image>
                  <a href="#" slot="reference">
                    <el-icon class="el-icon-chat-square"></el-icon> 微信
                  </a>
                </el-popover>
                <el-popover
                  placement="bottom"
                  trigger="hover"
                  title="QQ"
                  width="230"
                  >
                  <el-image :src="erweima_qq"></el-image>
                  <a href="#" slot="reference"><el-icon class="el-icon-chat-dot-square"></el-icon> QQ</a>
                </el-popover>
                <el-popover
                  placement="bottom-end"
                  title="手机"
                  trigger="hover"
                  content="15950032737">
                  <a href="#" slot="reference"><el-icon class="el-icon-phone-outline"></el-icon> 电话</a>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="beian" style="text-align: center;font-size: 14px;color: #666;"><a href="https://beian.miit.gov.cn/" target="_blank">苏ICP备 17016370号 - 3</a></div>
        </div>
        <div :class="{'show-bar': showbarStatus, 'm-info': true}" style="overflow: auto;">
          <div>
            <el-button icon="el-icon-close" size="small" type="info" circle @click="hidebar"></el-button>
            <el-popover
              placement="top"
              title="去，去，去..."
              width="180"
              trigger="hover"
              content="去详情大图">
              <el-button slot="reference" icon="el-icon-full-screen" size="small" type="primary" style="float: right;" circle @click="todetail(item)"></el-button>
            </el-popover>
            <p style="font-weight: bold;font-size: 16px;text-align: center;" @click="hidebar">{{item.theme_title}}</p>
            <el-divider></el-divider>
            <div class="ql-snow">
              <div class="ql-editor" style="line-height: 28px;padding-left: 0;padding-right:0;font-size: 12px;" v-html="item.theme_description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Indextem from '@/components/indexTem.vue'
import RemarkImg from '@/components/fullremarkImg.vue'
import {getIndexList} from '@/api/index.js'
import supabase from '@/utils/supabaseQuery'

export default {
  name: 'home',
  components: {
    Indextem,
    RemarkImg
  },
  data () {
    return {
      swiperData: [],
      studentImg: require('@/assets/img/logo_ylj.jpg'),
      studentImgSm: require('@/assets/img/logo_ylj_sm.jpg'),
      erweima_wx: require('@/assets/img/erweima_wx.jpg'),
      erweima_qq: require('@/assets/img/erweima_qq.jpg'),
      imgPrefix: 'http://cdn.youlaji.com/',
      imgPrefix1: 'https://dxzmebuimxtfznmcdwht.supabase.co/storage/v1/object/public/imgs/',
      listQuery: {
        pages: 1,
        limit: 20
      },
      item: {
        theme_title: '',
        theme_description: ''
      },
      listHeight: '',
      scale: 0.9,
      scaleBig: 1,
      scaleHeight: '',
      scaleBigHeight: '',
      remarkShow: false,
      showbarStatus: false,
      imgList: [
      ],
      current: 0,
      borderBg: '',
      headerClass: false
    }
  },
  computed: {
  },
  created () {
    this.getTodos()
    // getIndexList(this.listQuery).then(res => {
    //   this.imgList = res.data
    //   let reverseData = res.data.reverse()
    //   this.swiperData = [reverseData[0], reverseData[1], reverseData[2]]
    //   this.item = res.data[0]
    //   this.$nextTick(() => {
    //     this.listHeight = (this.$refs.getListDomHeight.offsetHeight) - 60 + 'px'
    //     this.scaleHeight = parseInt(this.scale * this.$refs.div[0].offsetWidth) + 'px'
    //     this.scaleBigHeight = parseInt(this.scaleBig * this.$refs.big.offsetWidth - 16)
    //   })
    // })
  },
  mounted () {
    const that = this
    window.onresize = function () {
      that.resizeWindow()
    }
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
    async getTodos () {
      console.log(this.$store)
      const { data: todos, error } = await supabase.from('youlaji_blog_test').select('*')
      this.imgList = todos
      let reverseData = todos.reverse()
      this.swiperData = [reverseData[0], reverseData[1], reverseData[2]]
      this.item = todos[0]
      this.$nextTick(() => {
        this.listHeight = (this.$refs.getListDomHeight.offsetHeight) - 60 + 'px'
        this.scaleHeight = parseInt(this.scale * this.$refs.div[0].offsetWidth) + 'px'
        this.scaleBigHeight = parseInt(this.scaleBig * this.$refs.big.offsetWidth - 16)
      })
      console.log(error)
      console.log(todos)
    },
    changeSwiper (item) {
      // setTimeout(() => {
      //   this.borderBg = this.getAverageRGB(this.$refs['swiper' + item][0])
      // }, 200)
    },
    showbar (index) {
      this.showbarStatus = true
      this.item = this.imgList[index]
    },
    hidebar () {
      this.showbarStatus = false
    },
    handleClick () {},
    todetail (item) {
      this.$router.push('/detail/' + item.theme_id)
    },
    showDetail (index) {
      this.$router.push('/detail/' + this.imgList[index].theme_id)
    },
    resizeWindow () {
      const that = this
      that.listHeight = (that.$refs.getListDomHeight.offsetHeight) - 60 + 'px'
      that.scaleHeight = parseInt(that.scale * that.$refs.div[0].offsetWidth) + 'px'
      that.scaleBigHeight = parseInt(this.scaleBig * this.$refs.big.offsetWidth - 16)
    },
    currentIndexAdd (index) {
      this.indexs = index
    },
    getAverageRGB (imgEl) {
      let blockSize = 5 // only visit every 5 pixels
      let defaultRGB = {r: 0, g: 0, b: 0} // for non-supporting envs
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d') // canvas.getContext && canvas.getContext('2d')
      let data
      let width
      let height
      let i = -4
      let length
      let rgb = {r: 0, g: 0, b: 0}
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
.turn{
  animation:turn 6s linear infinite;
}
@keyframes turn{
  0%{-webkit-transform:rotate(0deg);}
  25%{-webkit-transform:rotate(90deg);}
  50%{-webkit-transform:rotate(180deg);}
  75%{-webkit-transform:rotate(270deg);}
  100%{-webkit-transform:rotate(360deg);}
}
.beian{
  height: 50px;
  line-height: 50px;
  display: block;
  border-top:1px solid #e7e8ea;
}
.beian a{
  text-decoration: none;
  font-size: 12px;
  color: #666;
}
.beian a:hover{
  color: rgb(58, 140, 248);
}
.el-carousel__item{
  border-radius: 16px;
}
.el-carousel__button{
  width: 30px;
}
body{
  background: #ccc;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.el-divider--horizontal{
  margin: 6px 0;
}
.main{
  overflow: hidden;
}
.m-header{
  width: 100%;
  z-index: 9;
  display: -webkit-flex;
  display: flex;
  flex-wrap: nowrap;
  height: 95px;
  border-bottom: 1px solid #e7e8ea;
  justify-content: flex-start;
  align-items:center;
  box-sizing: border-box;
  background: #fff;
  background-size: 66px 38px;
  transition: all ease-in 0.5s;
}
.fixed-shadow{
  position: fixed;
  top: 0;
  height: 95px;
  z-index: 9;
  overflow: hidden;
  /* box-shadow: 0 0 12px rgba(0, 0, 0, 0.5); */
}
.reset-height{
  height: 45px;
}
.m-avatar{
  margin-right: 20px;
}
.m-content{
  position:relative;
}
.m-photo{
  max-width: 940px;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0 auto;
}
.item-theme-desc{
  overflow: hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;
  font-size: 14px;
  line-height: 20px;
  text-align:justify;
  color: #666;
}
.m-photo-title{
  margin-top: 50px;
  overflow: hidden;
  max-width: 700px;
  margin: 0 auto;
  font-weight: bold;
  font-size: 18px;
}
.m-photo-list{
  width: calc( 100% - 300px);
  float: left;
  margin: 0 auto;
  box-sizing: border-box;
  border-right: 1px solid #e7e8ea;
  padding-right: 10px;
  padding-top: 120px;
}
.info{
  width: 250px;
  float:left;
  margin-left: 16px;
  padding-top: 120px;
}
.transform{
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.transform-preview-btn{
  position: absolute;
  right: -100px;
  margin-right: 16px;
  text-align: center;
  transition: all ease-in 0.3s;
}
.transform:hover .transform-preview-btn{
  right: 0px;
  top: 10px;
}
.transform .el-image{
  transition: all ease 0.3s;
}
.transform:hover .el-image{
  cursor: pointer;
}
.m-photo-tab-pane{
  border-radius: 8px;
}
.m-info{
  width: 400px;
  position: fixed;
  right: -420px;
  top: 95px;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  /* background: #fff; */
  background: #F9FAFC;
  transition: all ease-in 0.3s;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 9;
}
.show-bar{
  right: 0;
}
.change-mt .m-info{
  top: 45px;
}
.div{
  box-sizing: border-box;
  transition: all ease-in 0.3s;
}
.theme_title{
  overflow: hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
}
.transform .theme_title{
  transition: all ease-in 0.3s;
  position: absolute;
  width: 100%;
  bottom: 10px
}
.transform .theme_title div{
  padding: 6px;
  font-size: 14px;
  line-height: 14px;
  color: #fff;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  text-shadow: 0px 0px 2px #000;
}
.transform .theme_title p{
  font-size: 12px;
  line-height: 14px;
  color: #fff;
  padding: 6px;
  text-shadow: 0px 0px 2px #000;
}
.div:hover .el-image{
  cursor: pointer;
}
.img-style{
  border-radius: 12px;
  position: relative;
  background: #eef0f3;
  overflow: hidden;
}

.primary-sidebar .widget-title {
    padding-bottom: 15px;
    margin: 30px 0;
    font-size: 18px;
    font-weight: 800;
    position: relative;
}
.primary-sidebar .widget-title::before {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #494949;
    height: 4px;
    width: 20px;
    border-radius: 2px;
    content: "";
}
.primary-sidebar .social-links a:hover {
    background-color: #000;
    color: #fff;
}
.primary-sidebar .social-links a {
    font-size: 12px;
    color: #333;
    line-height: 1;
    padding: 10px 21px;
    background-color: #f5f5f5;
    display: inline-block;
    text-decoration: none;
    margin: 3px 0;
}
.show-bar::-webkit-scrollbar {display:none}
@media only screen and (min-width: 100px) and (max-width:980px) {
  .m-photo-list{
    padding-right: 0;
    border-right: 0px;
    width: 100%;
  }
  .info{
    margin-left: 0;
    display: none;
  }
}
</style>

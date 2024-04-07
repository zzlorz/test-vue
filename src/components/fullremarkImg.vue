<template>
  <div id="fullmarks">
    <div class="close-btn" @click="remarkHide"><el-icon class="el-icon-close"></el-icon></div>
    <div class="next-btn" @click="nextImg"><el-icon class="el-icon-d-arrow-right"></el-icon></div>
    <div class="previous-btn" @click="previousImg"><el-icon class="el-icon-d-arrow-left"></el-icon></div>
    <div id="markContent" ref="markContent">
      <div class="img-div">
        <img :src="url" alt=""/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    showLoad: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    len: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      imgWidth: 0,
      imgHeight: 0,
      urls: '',
      indexs: 0
    }
  },
  computed: {
  },
  watch: {
    indexs (val) {
      this.indexs = val
      this.getImgSize()
    },
    urls (val) {
      this.url = val
    }
  },
  created () {
    this.indexs = this.index
    this.urls = this.url
  },
  mounted () {
    this.getImgSize()
  },
  methods: {
    ...mapMutations(['leftbarTrigger']),
    getImgSize () {
    },
    remarkHide () {
      this.$emit('callbackRemark', '')
    },
    nextImg () {
      let index = this.indexs++
      if (this.len < index) {
        index = 0
        this.indexs = 0
      }
      this.$emit('currentIndex', index)
    },
    previousImg () {
      let index = this.indexs--
      if (index < 0) {
        index = 0
        this.indexs = 0
      }
      this.$emit('currentIndex', index)
    }
  }
}
</script>
<style scoped>
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
  /* height: calc( 100% - 140px); */
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
  text-align: center;
}
.img-div img{
  width: 100%;
  margin: auto;
}
#fullmarks.show{
  display: block;
}
#fullmarks.hide{
  display: none;
}
</style>

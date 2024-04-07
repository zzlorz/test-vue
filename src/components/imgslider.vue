<template>
  <div class="taskimgslider-bg" v-show="show">
    <div class="close" @click="setSlider({bool: false, index: 0})"><i class="el-icon-circle-close"></i></div>
    <div class="taskimgslider-box">
      <el-carousel height="300px" ref="carousel" style="width:100%;" :autoplay="false" @click="setActive">
        <el-carousel-item v-for="(item,index) in taskimg" :key="index" name="index">
          <img :src="`${url}/taskimg/upload/`+item.img" />
        </el-carousel-item>
      </el-carousel>
    </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'taskimgslider',
  data () {
    return {
      url: process.env.API_ROOT,
      show: false,
      indexShow: 2
    }
  },
  computed: {
    ...mapState(['taskimg', 'showSlider'])
  },
  watch: {
    showSlider (val) {
      this.show = val.bool
      this.indexShow = val.index
      this.setActive(this.indexShow)
    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['setSlider']),
    setActive (index) {
      this.$refs.carousel.setActiveItem(index)
    }
  }
}
</script>
<style>
.taskimgslider-bg{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.9);
  z-index: 9999;
}
.taskimgslider-box{
  width: 800px;
  height: 300px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.el-carousel__button{
  width: 10px;
  height: 4px;
}
.close{
  position: absolute;
  top: 50px;
  right: 50px;
  color: #fff;
  cursor: pointer;
}
.close i{
  font-size: 30px
}
</style>

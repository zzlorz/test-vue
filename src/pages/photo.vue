<template>
  <div class="index">
    <Indextem>
      <div class="photo-list" slot="container">
        <div class="photo-list-title">PHOTOS</div>
        <ul  v-viewer>
          <li><img src="../../static/p1.jpg" @click="show" width="100%" height="100%"></li>
          <li><img src="../../static/p2.jpg" width="100%" height="100%"></li>
          <li><img src="../../static/p2.jpg" width="100%" height="100%"></li>
          <li><img src="../../static/p1.jpg" width="100%" height="100%"></li>
        </ul>
    </div>
    </Indextem>
    <!-- component -->
    <viewer :images="images" class="hide">
      <img v-for="src in images" :src="src" :key="src">
    </viewer>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Indextem from '@/components/indexTem.vue'
import { mapState } from 'vuex'
Vue.use(Viewer)
export default {
  name: 'home',
  components: {
    Indextem
  },
  data () {
    return {
      images: ['p1.jpg', 'p2.jpg']
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    show () {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hide{display: none;}
.photo-list {
  width: 1020px;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
}
.photo-list-title{
  text-align: left;
  margin: 10px;
  color: #afb1b8;
}
.photo-list ul{
}
.photo-list ul li{
  float: left;
  width: 470px;
  height:220px;
  background: #f3f3f3;
  list-style: none;
  margin:10px;
  padding: 10px;
  box-sizing: content-box;
  cursor: pointer;
}
.photo-list ul li:hover{
  color: #afb1b8;
}
.photo-list ul li img{
  object-fit: cover;
}
</style>

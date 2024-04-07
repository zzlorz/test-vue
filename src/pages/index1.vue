<template>
  <div>
    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div class="flex-shrink-0">
        <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
      </div>
      <div>
        <div class="text-xl font-medium text-black">ChitChat</div>
        <p class="text-gray-500">You have a new message!</p>
      </div>
    </div>
    <Indextem class="wwww">
        <div slot="container" class="myphoto">
          <div class="shadow"></div>
          <img src="../../static/p1.jpg" width="100%" height="100%">
        </div>
    </Indextem>
  </div>
</template>

<script>
import Indextem from '@/components/indexTem.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Indextem
  },
  data () {
    return {

    }
  },
  computed: {
    
  },
  mounted () {
    this.$http({url: 'qiniuToken', method: 'post'}).then(res => {
      console.log(res);
    });
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.myphoto{
  width: 650px;
  height: 300px;
  overflow: hidden;
  margin: 40px auto;
  background: #afb1b8;
  border: 8px solid #d5d5d5;
  position: relative;
}
.myphoto .shadow{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-shadow:0 0 6px rgba(0, 0, 0, .3) inset;
  z-index:2;
}
.myphoto img{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  object-fit: cover;
  -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
  filter: grayscale(100%);
}
</style>

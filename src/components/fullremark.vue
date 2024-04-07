<template>
  <div id="fullmarks" :class="showLoad?(!showIcon?'show opacity':'show'):'hide'" @click="leftbarTrigger(false)">
    <div id="markContent" :class="showIcon?'show':'hide'">
      <p><img src="../assets/img/logosl.png"></p>
      <p><i class="el-icon-loading"></i></p>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    showLoad: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['leftbarTrigger'])
  }
}
</script>
<style scoped>
#fullmarks{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 9999
}
#fullmarks #markContent{
  position: fixed;
  left: 0;
  top:0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  text-align: center;
}
#fullmarks #markContent p i{
  font-size: 24px;
  color: #5cb6ff;
  margin-top: 10px;
}
#fullmarks.show{
  display: block;
}
#fullmarks.show{
  display: block;
}
#fullmarks.hide{
  display: none;
}
#fullmarks #markContent.show{
  display: block;
}
#fullmarks #markContent.hide{
  display: none;
}
#fullmarks.opacity{
  background: rgba(0,0,0,.3);
}
</style>

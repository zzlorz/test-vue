<template>
  <div>
    <Leftbar></Leftbar>
    <div id="middle">
      <el-container>
        <Tasklist></Tasklist>
        <Rightdetail></Rightdetail>
      </el-container>
    </div>
    <Imgslider></Imgslider>
  </div>
</template>
<script>
import Leftbar from '@/components/leftbar/leftbar.vue'
import Tasklist from '@/components/middle/tasklist.vue'
import Rightdetail from '@/components/rightdetail/detail.vue'
import Imgslider from '@/components/imgslider.vue'
export default {
  name: 'todo',
  components: {Leftbar, Tasklist, Rightdetail, Imgslider}
}
</script>
<style>
@import '../assets/task/task.css';
</style>

<template>
  <div class="baritem">
    <i :class="item.icon"></i>
    <span>{{item.name}}</span>
    <div class="taskcount">{{item.count==0?'':item.count}}</div>
  </div>
</template>
<script>
export default {
  name: 'leftbaritem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<template>
  <span>
    <el-dropdown trigger="click" @command="levelCommand">
      <span class="el-dropdown-link">
        <i class="el-icon-s-operation" :class="`level${levelData}`" style="transform: rotate(90deg);font-size: 18px;color: #999;"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item.value" v-for="(item,index) in levelInitData" :key="index+'levelModule'"><span style="display: inline-block;width: 20px;color: #F56C6C;" :class="`level${item.value}`">!!! </span><span :class="level==item.value?'levelactive':''">{{item.name}}</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </span>
</template>
<script>
export default {
  name: 'level',
  props: {
    levelData: {
      type: Number,
      default () {
        return -1
      }
    }
  },
  data () {
    return {
      level: this.levelData,
      levelInitData: [
        {name: '高优先级', class: 'level', value: 3},
        {name: '中优先级', class: 'level', value: 2},
        {name: '低优先级', class: 'level', value: 1},
        {name: '无优先级', class: 'level', value: 0}
      ]
    }
  },
  methods: {
    levelCommand (command) {
      this.level = command
      this.$emit('command', Number(command))
    }
  },
  mounted () {
  }

}
</script>

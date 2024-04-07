<template>
  <div class="tasktext" :class="{active: itemActive}">
      <span style="float: left;margin-right:10px;" :class="`level`+itemData.level">
        <el-checkbox v-model="itemData.status===1" :disabled="itemData.delstatus==1" @change="itemComplete(itemData, itemIndex)"></el-checkbox>
      </span>
      <div style="float: left;width: calc(100% - 24px);text-align:left;" @click="showDetailContent(itemIndex)">
        <span>{{itemData.name}}</span>
        <div class="taskitem-rightinfo">
          <el-tag
            :type="tag.theme"
            :key="tag.name"
            size="mini"
            v-for="(tag) in itemData.labellist"
            :disable-transitions="false"
            >
            {{tag.name}}
          </el-tag>
          <span class="taskitem-order"><i v-if="itemData.ordername!==null" :class="`ordertheme `+itemData.theme"></i>{{itemData.ordername==null?'收集箱':itemData.ordername}}</span>
          <span><i class="el-icon-paperclip" v-if="itemData.img"></i></span>
          <span><i class="el-icon-tickets" v-if="itemData.detail!==null"></i></span>
          <span class="taskitem-plantime taskitem-overdue" style="">{{itemData.plantime | dateformat(itemData.plantime)}}</span>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'task',
  props: {
    itemActive: {
      type: Boolean,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: false
    },
    itemData: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    itemIndex: {
      type: Number,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: NaN
    }
  },
  beforeCreate () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    showDetailContent (index) {
      this.$emit('todetail', index)
      this.$store.dispatch('setTaskImgList', this.itemData.id)
    },
    itemComplete (item, index) {
      this.$emit('check', {item: item, index: index})
    }
  }
}
</script>

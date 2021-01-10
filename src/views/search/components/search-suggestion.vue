<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestions"
      :key="index"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="hifhi(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'

// 按需加载
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [],
      htmlStr: 'Hello <span style="color: red;">World</span>'
    }
  },
  coumputed: {},
  watch: {
    searchText: {
      // 当 searchText 发生改变的时候就会调用 handler 函数
      // handler 函数名称是固定的
      //   async handler (val) {
      //     this.loadSearchSuggestions(val)
      //   },
      // debounce函数  参数1: 一个函数  参数2: 延迟时间  返回值: 防抖之后的函数
      handler: debounce(function (val) {
        this.loadSearchSuggestions(val)
      }, 500),
      immediate: true // 该回调将会在侦听开始之后立即被调用
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    hifhi (item) {
      const hifhiStr = `<span class="active">${this.searchText}</span>`
      // 如果需要根据数据变量动态的创建正则表达式,则手动 new RegExp
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, hifhiStr)
    }
  }
}
</script>

<style  scoped lang='less'>
.search-suggestion {
  /deep/ span.active {
    color: red;
  }
}
</style>

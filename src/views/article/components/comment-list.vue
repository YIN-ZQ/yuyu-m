<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败,请点击重试"
    @load="onLoad"
  >
    <comment-item v-for="(item, index) in list" :key="index" :comment="item"></comment-item>
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from '../components/comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  coumputed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async onLoad () {
      try {
        // 1-请求获取数据
        const { data } = await getComments({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        // 2-将数据添加到列表
        const { results } = data.data
        this.list.push(...results)
        // 把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)
        // 3-将loading设置为false
        this.loading = false
        // 4-判断是否还有数据
        if (results.length) {
          // 5-有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          // 没有就将 finished 设置为结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style  scoped lang='less'>
</style>

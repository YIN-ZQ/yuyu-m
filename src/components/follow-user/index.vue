<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  coumputed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async onFollow () {
      this.loading = true
      try {
        if (this.value) {
          // 已关注
          await deleteFollow(this.userId)
          this.isFollowed = false
        } else {
          // 未关注
          await addFollow(this.userId)
        }
        // this.isFollowed = !this.isFollowed
        // this.$emit('updatae-is_followed', !this.value)
        this.$emit('input', !this.value)
      } catch (err) {
        console.log(err)
        let message = '操作失败'
        if (err.response && err.resopnse.status === 400) {
          message = '你不能关注你自己!'
        }
        this.$toast(message)
      }
    }
  }
}
</script>

<style  scoped lang='less'>
</style>

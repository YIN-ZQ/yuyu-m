<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell>
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ comment.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ comment.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              comment.pubdate | relativeTime
            }}</span>
            <van-button size="mini" type="default"
              >回复 {{ comment.reply_count }}</van-button
            >
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" @click="onCommentLike" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },

  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    async onCommentLike () {
      try {
        if (this.comment.is_liking) {
          // 取消点赞
          await deleteCommentLike(this.comment.com_id)
          this.comment.like_count--
        } else {
          await addCommentLike(this.comment.com_id)
          this.comment.like_count++
        }
      } catch (err) {
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>

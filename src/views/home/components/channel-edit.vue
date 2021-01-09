<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>

    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fiexChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>

    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fiexChannels: [0]
    }
  },
  computed: {
    // 计算属性会观测内部依赖数据的变化
    // 如果依赖的数据发生变化,则计算属性会重新执行
    recommendChannels () {
      const channels = []
      this.allChannels.forEach(channel => {
        // find 遍历数组,找到满足条件的元素项
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        // 如果我的频道中不包括该频道项,则收集到推荐频道中
        if (!ret) {
          channels.push(channel)
        }
      })
      // 计算属性需要一个返回值  把计算结果返回
      return channels

      // 简化版
      // 数组的firter方法: 遍历数组,把符合条件的元素存储到新数组中
      // return this.allChannels.filter(channel => {
      //   return !this.myChannels.find(myChannel => {
      //     return myChannel.id === channel.id
      //   })
      // })
    }
  },
  created () {
    this.loadAllchannels()
  },
  mounted () {

  },
  methods: {
    async loadAllchannels () {
      try {
        const { data } = await getAllChannels()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        console.log(err)
        this.$toast('数据获取失败')
      }
    },

    onAddChannel (channel) {
      this.myChannels.push(channel)
    },

    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 如果是固定频道则不删除
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        // 编辑状态,执行删除
        // 要删除的元素的开始索引,删除的个数
        if (index <= this.active) {
          // 让激活频道的索引-1
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
      } else {
        // 非编辑状态,执行切换
        this.$emit('update-active', index, false)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
    }
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
    .active {
      color: red;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>

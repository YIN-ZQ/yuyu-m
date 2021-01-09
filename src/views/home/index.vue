<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 导航栏/ -->

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <artice-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChennelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      />
    </van-popup>
    <!-- 频道编辑弹出层/ -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticeList from './components/artice-list.vue'
import ChannelEdit from './components/channel-edit'

export default {
  name: 'HomeIndex',
  components: {
    ArticeList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isChennelEditShow: false
    }
  },
  created () {
    this.loadChannels()
  },
  mounted () {

  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },

    onUpdateActive (index, isChennelEditShow = true) {
      this.active = index
      this.isChennelEditShow = isChennelEditShow
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.channel-tabs {
    .van-tab {
      width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>

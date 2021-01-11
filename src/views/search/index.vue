<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @update-search-histories="searchHistories = []"
      @search="onSearch"
    ></search-history>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: { SearchHistory, SearchSuggestion, SearchResult },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  watch: {
    searchHistories (val) {
      setItem('TOUTIAO_SEARCH_HISTORIES', val)
    }
    // searchHistories: {
    //   handler () {
    //   }
    // }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    onSearch (val) {
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
</style>

<template>
  <div>
    <van-search
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
      @input="inputSearch"
    />
    <div class="search_wrap" v-if="seList.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          v-for="(obj, index) in hotList"
          :key="index"
          @click="fn(obj.first)"
        >
          {{ obj.first }}</span
        >
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-else
    >
      <div class="search_wrap">
        <p class="hot_title">最佳匹配</p>
        <van-cell
          v-for="obj in seList"
          :key="obj.id"
          center
          :title="obj.name"
          :label="obj.ar[0].name + ' - ' + obj.name"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" @click="brocastFn(obj.id)" />
          </template>
        </van-cell>
      </div>
    </van-list>
  </div>
</template>

<script>
import { hotMusicAPI, hotSearchAPI } from "@/api/index";
export default {
  data() {
    return {
      value: "",
      hotList: [],
      seList: [],
      loading: false,
      finished: false,
      page: 1,
      timer: null,
    };
  },
  async created() {
    const res = await hotMusicAPI();
    this.hotList = res.data.result.hots;
  },
  methods: {
    async getList() {
      return await hotSearchAPI({
        keywords: this.value,
        limit: 30,
        offset: (this.page - 1) * 30,
      });
    },
    async fn(val) {
      this.finished = false;
      this.value = val;
      const res = await this.getList();
      console.log(res);
      this.seList = res.data.result.songs;
      this.loading = false;
    },
    async inputSearch() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        this.page = 1;
        this.finished = false;
        if (this.value.length === 0) {
          this.seList = [];
          return;
        }

        const res = await this.getList();
        if (res.data.result.songs === undefined) {
          this.seList = [];
          return;
        }
        this.seList = res.data.result.songs;
        this.loading = false;
      }, 900);
    },
    async onLoad() {
      this.page++;
      const res = await this.getList();
      if (res.data.result.songs === undefined) {
        this.finished = true;
        this.loading = false;
        return;
      }
      this.seList = [...this.seList, ...res.data.result.songs];
      this.loading = false;
    },
    brocastFn(Id) {
      this.$router.push({
        path: "/play",
        query: {
          id: Id,
        },
      });
    },
  },
};
</script>

<style scope>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.vanCell {
  border-bottom: 1px solid lightgray;
}
</style>

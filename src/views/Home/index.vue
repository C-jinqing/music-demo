<template>
  <div>
    <div class="title">推荐歌单</div>
    <van-row gutter="20">
      <van-col span="8" v-for="obj in reList" :key="obj.id">
        <van-image width="100" height="100" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
    </van-row>
    <div class="title">推荐新音乐</div>
    <van-cell
      class="vanCell"
      center
      :title="obj.name"
      v-for="obj in newList"
      :key="obj.id"
    >
      <template #right-icon>
        <van-icon name="play-circle-o" @click="playFn(obj.id)" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { recommendMusicApi, newMusicAPI } from "@/api";
export default {
  data() {
    return {
      reList: [],
      newList: [],
    };
  },
  async created() {
    const res = await recommendMusicApi({
      limit: 6,
    });
    this.reList = res.data.result;

    const res2 = await newMusicAPI({
      limit: 20,
    });
    console.log(res2);
    this.newList = res2.data.result;
  },
  methods: {
    playFn(Id) {
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
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
.vanCell {
  border-bottom: 1px solid lightgray;
}
</style>

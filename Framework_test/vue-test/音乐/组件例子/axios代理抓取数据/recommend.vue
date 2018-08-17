<template>
  <div>
    <div class="recommend">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>

        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider';
import {getRecommend, getDiscList} from 'api/recommend';
import {ERR_OK} from 'api/config';
export default {
  data() {
      return {
          recommends: []
      };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  components: {
    Slider
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data);
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
             console.log(res.data);
          }
        });
      }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
</style>
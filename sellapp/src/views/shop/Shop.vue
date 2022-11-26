<template>
  <div class="container">
    <div class="top">
      <div class="top-top">
        <div class="top-left">
          <h1>{{obj.name}}</h1>
          <p>
            <van-rate
              v-model="obj.score"
              :size="25"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
            评价数量 月销量{{obj.sellCount}}单
          </p>
        </div>
        <div class="top-right">
          <van-icon name="like" />
          <span>已收藏</span>
        </div>
      </div>
      <van-divider />
      <div class="top-bto">
        <div class="goods-top">
          <span>起送价</span>
          <span>商家配送</span>
          <span>平均配送时间</span>
        </div>
        <div class="goods-bto">
          <span><span class="num">{{obj.minPrice}}</span>元</span>
          <span><span class="num">{{obj.deliveryPrice}}</span>元</span>
          <span><span class="num">{{obj.deliveryTime}}</span>分钟</span>
        </div>
      </div>
    </div>
    <div class="bto">
      <h1>活动与公告</h1>
      <p>{{obj.bulletin}}</p>

      <van-divider />
      <div
        class="text"
        v-for="(item,index) in obj.supports"
        :key="index"
      >
        <van-tag :type="index==0?warning:primary">{{index==0?"减":"特"}}</van-tag> {{item}}
      </div>
    </div>
  </div>
</template>

<script>
import { getShop_api } from "@/apis/user.js";
export default {
  data() {
    return {
      obj: {},
      value: 5,
      warning: "warning",
      primary: "primary",
    };
  },
  methods: {
    async getShop() {
      const result = await getShop_api();
      this.obj = result.data.data;
    },
  },
  created() {
    this.getShop();
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #eee;
  .top {
    padding: 20px;
    border-top: 1px solid #ccc;
    background: #fff;
    .top-top {
      display: flex;
      .top-left {
        flex: 1;
        h1 {
          color: #000;
          font-weight: bold;
        }
        p {
          font-size: 14px;
          color: #ccc;
        }
      }
      .top-right {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: space-between;
        .van-icon {
          color: red;
          font-size: 20px;
        }
        span {
          font-size: 14px;
          color: #ccc;
        }
      }
    }
    .top-bto {
      .goods-top,
      .goods-bto {
        display: flex;
        justify-content: space-around;
        font-size: 14px;
        color: #1f1e1e;
      }
      .num {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .bto {
    padding: 20px;
    background: #fff;
    margin-top: 20px;
    h1 {
      font-size: 20px;
      font-weight: bold;
    }
    p {
      color: orange;
      font-size: 14px;
      margin: 10px 0;
    }
    .text {
      font-size: 14px;
    }
  }
}
</style>
<template>
  <div class="const">
    <div class="top">
      <img
        :src="obj.imgUrl"
        alt=""
        width="100%"
        height="250px"
      >
      <div class="top-title">
        <h1>{{obj.name}}</h1>
        <p>月售<span>{{obj.sellCount}}</span>份 好评率{{obj.rating}}%</p>
        <div class="top-title-num">
          <p> <span class="num-color">￥<span class="num">{{obj.price}}</span> </span><span>￥{{(obj.price/0.7).toFixed(0)}}</span></p>
          <div class="goods"> 加入购物车</div>
        </div>
      </div>
    </div>
    <main>
      <h1>商品介绍</h1>
      <p>
        {{ obj.goodsDesc}}
      </p>
    </main>
    <footer>
      <van-tabs
        title-active-color="#000"
        color="#ffc300"
        v-model="active"
        type="card"
      >
        <van-tab title="全部">

        </van-tab>
        <van-tab title="推荐"></van-tab>
        <van-tab title="吐槽"></van-tab>
      </van-tabs>
      <div
        class="box"
        v-for="(item,index) in arr"
        :key="index"
      >
        <img
          :src="item.avatar"
          alt=""
        >
        <div>
          <h1>{{item.username}}</h1>
          <p>{{item.text}}</p>
        </div>
      </div>
    </footer>
  </div>

</template>

<script>
import { getGoods_api } from "@/apis/user.js";
export default {
  data() {
    return {
      active: 0,
      id: 0,
      obj: {},
    };
  },
  methods: {
    async getGoods() {
      const result = await getGoods_api();
      for (let obj of result.data.data) {
        for (let item of obj.foods) {
          if (item.id == this.id) {
            this.obj = item;
          }
          // console.log(item.id);
        }
      }

      // console.log(result.data.data);
    },
  },
  computed: {
    arr() {
      let arrs = [];
      switch (this.active) {
        case 0:
          arrs = this.obj.ratings;
          break;
        case 1:
          arrs = this.obj.ratings.filter((item) => item.rateType === 0);
          break;
        case 2:
          arrs = this.obj.ratings.filter((item) => item.rateType === 1);
          break;
      }
      return arrs;
    },
  },
  created() {
    this.id = this.$route.query.id;

    this.getGoods();
  },
};
</script>

<style lang="scss" scoped>
.const {
  background: #eee;
  .top {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    .top-title {
      h1 {
        font-size: 24px;
        font-weight: bold;
        padding: 0 10px;
      }
      p {
        font-size: 12px;
        color: #ddd;
        padding: 0 10px;
      }
      .top-title-num {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .num-color {
          color: red;
          font-weight: bold;

          .num {
            font-size: 24px;
          }
        }
        .goods {
          text-align: center;
          line-height: 50px;
          border-radius: 30px;
          width: 130px;
          height: 50px;
          background: gold;
        }
      }
    }
  }
  main {
    padding: 20px;
    margin-top: 20px;
    background: #fff;
    line-height: 30px;
    h1 {
      font-size: 20px;
      font-weight: bold;
    }
  }
  footer {
    padding-top: 10px;
    margin-top: 20px;
    background: #fff;
    .van-tabs__nav {
      width: 100%;
    }
    .box {
      margin: 10px;
      height: 100%;
      display: flex;
      img {
        width: 80px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
</style>
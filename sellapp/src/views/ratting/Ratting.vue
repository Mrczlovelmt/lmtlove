<template>
  <div class="container">
    <div class="score">
      <div class="score-left">
        <h1>5.0</h1>
        <h4>综合评价</h4>
        <p>高于周边商家96%</p>
      </div>
      <div class="score-right">
        <p>
          服务态度
          <van-rate
            allow-half
            v-model="num1"
          />
        </p>
        <p>菜品质量
          <van-rate
            allow-half
            v-model="num1"
          />
        </p>
        <p>
          送达时间<span>{{time}}分钟</span>
        </p>
      </div>
    </div>
    <div class="remark">
      <van-tabs
        title-active-color="#000"
        color="#ffc300"
        v-model="active"
        type="card"
      >
        <van-tab title="全部">

        </van-tab>
        <van-tab title="满意"></van-tab>
        <van-tab title="不满意"></van-tab>
      </van-tabs>
      <div
        v-for="(item,index) in arr"
        :key="index"
        class="box"
      >
        <img
          :src="item.avatar"
          alt=""
          width="80"
        >
        <div>
          <h1>{{item.username}}</h1>
          <p class="time">
            <van-rate v-model="item.score" /> {{item.deliveryTime}}
          </p>
          <p class="text">{{item.text}}</p>
          <p class="menu">
            <van-icon name="good-job" />
            <span
              v-for="(v,i) in item.recommend"
              :key="i"
            >{{v}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatting_api } from "@/apis/user.js";

export default {
  data() {
    return {
      num1: 4.5,
      time: 0,
      list: [],
      active: 0,
    };
  },
  methods: {
    async getRatting() {
      const result = await getRatting_api();
      this.list = result.data.data;
    },
  },
  computed: {
    arr() {
      let arrs = [];
      switch (this.active) {
        case 0:
          arrs = this.list;
          break;
        case 1:
          arrs = this.list.filter((item) => item.rateType === 0);
          break;
        case 2:
          arrs = this.list.filter((item) => item.rateType === 1);
          break;
      }
      return arrs;
    },
  },

  created() {
    this.getRatting();
    this.time = localStorage.getItem("time");
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #ccc;
  .score {
    display: flex;
    background: #fff;
    padding: 15px 0;
    .score-left {
      text-align: center;
      width: 120px;
      h1 {
        font-size: 24px;
        color: orange;
        font-weight: bold;
      }
      h4 {
        font-weight: bold;
      }
      p {
        font-size: 12px;
        color: #ccc;
      }
    }
    .score-right {
      flex: 1;
      margin-left: 20px;
      span {
        margin-left: 10px;
        font-size: 14px;
        color: #ccc;
      }
    }
  }
  .remark {
    height: 100%;
    overflow: scroll;
    background: #fff;
    padding: 0 20px;
    .van-tabs {
      margin-top: 20px;
    }
    .box {
      margin: 10px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      padding: 10px 0;
      img {
        width: 100;
        border-radius: 50%;
        margin-right: 10px;
      }
      h1 {
        font-size: 14px;
        font-weight: bold;
      }
      .time {
        font-size: 12px;
        color: #ccc;
      }
      .text {
        font-size: 14px;
      }
      .menu {
        word-wrap: break-word;
        padding-right: 15px;
        .van-icon {
          margin-right: 5px;
        }
        span {
          color: #ccc;
          font-size: 12px;
          border: 1px solid #eee;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
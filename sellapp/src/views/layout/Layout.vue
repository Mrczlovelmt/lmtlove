<template>
  <div class="layout-box">
    <div class="layout">
      <!-- 上 -->
      <van-overlay
        :show="show"
        @click="show = false"
      >
        <div
          class="wrapper"
          @click.stop
        >

          <div class="block">
            <h1>
              {{info.name}}
            </h1>
            <van-rate
              v-model="value"
              :size="25"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
            <div class="discount">
              <van-divider>优惠信息</van-divider>
              <div
                v-for="(item,index) in info.supports"
                :key="index"
              >
                <van-tag :type="index==0?warning:primary">{{index==0?"减":"特"}}</van-tag> {{item}}
              </div>
              <div class="notice">
                <van-divider>店家公告</van-divider>
                <div>
                  {{info.bulletin}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-overlay>
      <div
        class="top"
        @click="show = true"
      >
        <div
          class="top-avatar"
          :style="{backgroundImage:`url(${info.avatar})`}"
        >

        </div>
        <div class="info">
          <img
            class="avatar"
            :src="info.avatar"
          />
          <div class="infoBox">
            <p style="font-size=16px">
              <van-tag type="danger">品牌</van-tag>
              {{ info.name }}
            </p>
            <p>
              {{ info.description }} / {{info.deliveryTime}}分钟送达
            </p>
            <div v-if="info.supports">
              <van-tag type="danger">减</van-tag>
              <span
                v-for="(item,index) in info.supports"
                :key="index"
              >{{item}} &nbsp;</span>
            </div>
          </div>
        </div>
        <van-notice-bar
          left-icon="volume-o"
          :text="info.bulletin"
        />
      </div>
      <!-- 下 -->
      <div class="btm">
        <div>
          <van-tabs
            v-model="active"
            title-active-color="gold"
            color="gold"
            swipeable
          >
            <van-tab
              title="商品"
              to="/goods"
            ></van-tab>
            <van-tab
              title="评价"
              to="/ratting"
            ></van-tab>
            <van-tab
              title="商家"
              to="/shop"
            ></van-tab>
          </van-tabs>
        </div>
        <div class="container">
          <router-view></router-view>
        </div>
      </div>

    </div>
    <div>
      <div
        class="car-bar"
        @click="isShow=!isShow"
      >
        <div class="contact">
          <img
            src=""
            alt=""
          />
          <p>联系商家</p>
        </div>
        <div class="car-main">
          <p
            class="cartImg"
            :style="{backgroundColor:`${getGoodsNum>0?'#ffc300':'#ccc' }`}"
          >
            <van-icon
              name="cart"
              color="#646464"
              size="25px"
            />
            <span class="nums">{{getGoodsNum}}</span>
          </p>
          <div class="price">
            <!-- 总价 -->
            <p>￥{{getGoodsprice}}</p>
            <span>另需配送费￥4元 | 支持自取</span>
          </div>
        </div>
        <div
          class="car-rigth"
          :style="{backgroundColor:`${getGoodsNum>0?'#ffc300':'#ccc' }`}"
        >去结算</div>
      </div>
      <!-- 弹窗 -->
      <van-popup
        v-model="isShow"
        position="bottom"
        :style="{ height: '50%', paddingBottom: '70px' }"
      >
        <div class="mues">
          <div>购物车</div>
          <p @click="handel">
            <van-icon name="delete" />
            清空购物车
          </p>
        </div>
        <van-card
          v-for="(item,index) in goodsNum"
          :key="index"
          :price="item.price"
          :title="item.name"
          :thumb="item.imgUrl"
        >
          <template #footer>
            <button
              class="num"
              type="button"
              @click="add(item.id,-1)"
            >
              -
            </button>
            <span>{{item.num}}</span>
            <button
              type="button"
              class="num"
              @click="add(item.id,1)"
            >
              +
            </button>
          </template>
        </van-card>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getShop_api } from "@/apis/user.js";
export default {
  data() {
    return {
      warning: "warning",
      primary: "primary",
      value: 5,
      active: 0,
      info: {},
      show: false,
      isShow: false,
    };
  },
  created() {
    this.getShop();
    switch (this.$route.path) {
      case "/goods":
        this.active = 0;
        break;
      case "/ratting":
        this.active = 1;
        break;
      case "/shop":
        this.active = 2;
        break;
    }
  },
  methods: {
    async getShop() {
      let res = await getShop_api();
      this.info = res.data.data;
      localStorage.setItem("time", JSON.stringify(this.info.deliveryTime));
    },

    add(id, val) {
      this.$store.commit("goodsadd", { id, val });
    },
    handel() {
      this.$dialog
        .confirm({
          title: "清空购物车",
          message: "确认清除购物车吗？",
        })
        .then(() => {
          this.$store.commit("clare");
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  computed: {
    goodsNum() {
      return this.$store.getters.getGoods;
    },
    getGoodsNum() {
      let arr = 0;
      for (let obj of this.$store.state.list) {
        for (let item of obj.foods) {
          item.num > 0 ? (arr += item.num) : "";
        }
      }
      return arr;
    },
    getGoodsprice() {
      let arr = 0;
      for (let obj of this.$store.state.list) {
        for (let item of obj.foods) {
          arr += item.price * item.num;
        }
      }
      return arr.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-box {
  width: 100%;
  height: 100%;
  .layout {
    width: 100%;
    height: 100%;
    .wrapper {
      padding: 0 5%;
      .block {
        margin-top: 10%;
        text-align: center;
        line-height: 40px;
        h1 {
          color: #ccc;
          font-weight: bold;
          font-size: 24px;
        }
      }
      .discount {
        text-align: left;
        color: #ccc;
      }
      .van-divider {
        font-size: 24px;
        font-weight: bold;
        color: #ccc;
      }
    }
    .top {
      width: 100%;
      height: 140px;
      position: relative;
      .top-avatar {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        z-index: -1;
        filter: blur(5px);
      }
      .info {
        height: 110px;
        display: flex;
        .avatar {
          width: 70px;
          height: 70px;
          margin: 20px;
        }
        .infoBox {
          margin: 20px 0px;
          color: #fff;
          font-size: 12px;
          .van-tag {
            margin: 5px 0px;
          }
        }
      }
      .van-notice-bar {
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        height: 30px;
      }
    }
    .btm {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .van-tab--active {
        color: gold;
      }
    }
    .container {
      flex: 1;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
  }
  .car-bar {
    width: 90%;
    height: 60px;
    position: fixed;
    bottom: 2%;
    left: 5%;
    background-color: #222222;
    border-radius: 30px;
    z-index: 9999;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .contact {
      width: 20%;
      height: 100%;
      border-right: solid #fff 3px;
      text-align: center;
      font-size: 12px;
      padding-top: 10px;
    }
    .car-main {
      display: flex;
      .cartImg {
        width: 40px;
        height: 40px;
        background-color: #ccc;
        border-radius: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        position: relative;
        .nums {
          width: 20px;
          line-height: 18px;
          background-color: red;
          color: #fff;
          border-radius: 60px;
          position: absolute;
          top: -5px;
          right: -10px;
          text-align: center;
          font-size: 12px;
        }
      }
      .price {
        p {
          color: #fff;
          font-size: 16px;
        }
        span {
          font-size: 12px;
        }
      }
    }
    .car-rigth {
      width: 20%;
      height: 100%;
      background-color: #ffc300;
      border-radius: 0px 30px 30px 0;
      color: #000;
      line-height: 60px;
      text-align: center;
      font-weight: bolder;
    }
  }
  .num {
    border: none;
    background: #f8cf83;
    border-radius: 20px;
    margin: 0 5px;
    width: 20px;
    height: 20px;
  }

  .mues {
    font-weight: monospace;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    p {
      font-weight: bold;
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
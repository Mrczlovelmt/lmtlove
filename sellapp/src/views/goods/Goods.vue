<template>
  <div class="goods">
    <div class="left">
      <div>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(item,index) in store_list "
            :key="index"
            :title="item.name"
            @click="toRight(index)"
          />
        </van-sidebar>
      </div>
    </div>
    <div class="right">
      <div>
        <div
          v-for="(item,index) in store_list"
          :key="index"
          :id="index"
        >
          <div class="right-title">{{item.name}}</div>
          <van-card
            v-for="(v,i) in item.foods"
            :key="i"
            :price="v.price.toFixed(2)"
            :desc="v.goodsDesc"
            :title="v.name"
            :thumb="v.imgUrl"
            @click="handelJump(v.id)"
          >
            <template #tags>
              <van-tag
                plain
                type="danger"
              >下饭神器</van-tag>

            </template>
            <template #footer>
              <button
                class="num"
                type="button"
                @click.stop="add(v.id,-1)"
                v-show="v.num>0"
              >
                -
              </button>
              <span>{{v.num}}</span>
              <button
                type="button"
                class="num"
                @click.stop="add(v.id,1)"
              >
                +
              </button>
            </template>
          </van-card>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import { getGoods_api } from "@/apis/user.js";
export default {
  data() {
    return {
      activeKey: 0,
      activeKeys: 0,
      list: [],
    };
  },
  methods: {
    async getGoods() {
      const result = await getGoods_api();
      result.data.data.forEach((item) => {
        item.foods.forEach((v) => {
          v.num = 0;
        });
      });
      this.list = result.data.data;
      //数据存仓库
      this.$store.commit("setList", this.list);
      //设置方法解决异步
      this.$nextTick(() => {
        //使用bscroll插件
        this.left = new BScroll(".left", {
          click: true, //开启点击事件
        });
        this.right = new BScroll(".right", {
          click: true, //开启点击事件
          probeType: 3, //开启派发事件
        });
        //右联左
        //获取商品列表的商品高度
        this.right.on("scroll", (res) => {
          let h = Math.abs(res.y); //将屏幕位置转为整数
          // 将计算完成的值用来遍历
          this.ourArr.forEach((item) => {
            if (h >= item.min && h < item.max) {
              this.activeKey = item.title;
            }
          });
        });
      });
    },
    //左联右
    toRight(index) {
      // 点击右边的时候，获取当前元素id，进行跳转
      this.right.scrollToElement(document.getElementById(index), 500);
    },
    add(id, val) {
      this.$store.commit("goodsadd", { id, val });
    },
    handelJump(id) {
      this.$router.push({
        path: "/details",
        query: {
          id,
        },
      });
    },
  },
  created() {
    this.getGoods();
  },

  computed: {
    //通过计算属性  获取元素的高度。
    hArr() {
      let arr = []; //定义空数组接收
      this.list.forEach((item, i) => {
        arr.push(document.getElementById(i).offsetHeight); //因为元素绑定了ID，而id=索引   通过索引来获取元素的高度。
      });
      return arr;
    },
    ourArr() {
      // 设置一个空数值
      let arr = [];
      //定义一个初始值
      let h = 0;
      //调用上面的索引数组进行遍历
      this.hArr.forEach((item, index) => {
        arr.push({
          min: h,
          max: h + item,
          title: index,
        });
        h += item;
      });
      //返回计算后的数组
      return arr;
    },
    store_list() {
      return this.$store.state.list;
    },
  },
};
</script>

<style lang="scss" scoped>
.goods {
  height: 100%;
  width: 100%;
  display: flex;

  .left {
    height: 100%;
    width: 100px;
    overflow-y: scroll;
    background: #eee;
    text-align: center;
    .van-sidebar {
      width: 100px;
    }
    .van-sidebar-item--select::before {
      background-color: gold;
    }
  }
  .right {
    height: 100%;
    flex: 1;
    overflow-y: scroll;
    text-align: center;
    .right-title {
      background: #eee;
      font-size: 14px;
      font-weight: bold;
    }
    .num {
      border: none;
      background: #f8cf83;
      border-radius: 20px;
      margin: 0 5px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
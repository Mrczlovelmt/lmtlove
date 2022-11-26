import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //数据本身
  state: {
    list:[]
  },
  //计算属性
  getters: {
    getGoods(state){
      let arr = [];
      for (let obj of state.list) {
        for (let item of obj.foods) {
          item.num > 0 ? arr.unshift(item) : "";
        }
      }
      return arr;
    }
  },
  //修改仓库的唯一方式
  mutations: {
    setList(state,vua){
      state.list=vua
    },
    //接收传过来的值，讲数据库的值进行遍历
    goodsadd(state,obj){
      //遍历数据
     state.list.forEach((item)=>{
        item.foods.forEach((v)=>{
          if(v.id==obj.id){
            //将数据进行修改
            v.num+=obj.val
          }
        })
     })
    },
    clare(state){
      for(let obj of state.list){
          for(let item of obj.foods){
            item.num=0
          }
      }
    }
  },
  //异步修改仓库数据  归mutations管
  actions: {
  },
  //合并状态机
  modules: {
  }
})

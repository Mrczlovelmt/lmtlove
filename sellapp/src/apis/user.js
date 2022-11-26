// 封装的api
import http from "./http";

// 获取店铺数据
export let getShop_api = () => http({
    url: "/shop/seller",
    method: "get"
})

// 获取商品数据
export let getGoods_api = () => http({
    url: "/goods/goods_list",
    method: "get"
})

// 获取评价数据
export let getRatting_api = () => http({
    url: "/shop/ratings",
    method: "get"
})


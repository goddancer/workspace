<template>
  <div>
    <my-header :seller="seller"></my-header>
    <div class="tab border-1px"><!--全局定义通过设备像素比缩放实现一像素边框-->
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'

  const ERR_OK = 0;
  export default {
    data(){
      return{
        seller:{}
      }
    },
    created(){
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if(response.errno === ERR_OK){
          this.seller = response.seller;
//          console.log(this.seller);
        }
      }, response => {
        console.log('error');
      });
    },
    components: {
      'my-header': header
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../static/css/reset.css';
  @import './common/css/mixin.scss';
  .tab{
    width:100%;
    display:flex;
    height:40px;
    line-height:40px;
    @include border-1px(rgba(7,12,21,0.1)); /*scss mixin 混合样式*/
    .tab-item{
      flex:1;
      text-align:center;
      & > a{
        display: block;
        font-size:14px;
        color: rgb(77,85,93);
        &.active{
           color:rgb(240,20,20);
        }
      }
    }
  }
</style>

<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" alt="" width="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  const ERR_OK = 0;
  export default {
    props: {
      seller:{
        type: Object
      }
    },
    data(){
      return{
        goods:[],
        listHeight:[],
        scrollY:0
      }
    },
    computed:{
      currentIndex(){
        for(let i=0;i<this.listHeight.length;i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
            return i;
          }
        }
        return 0;
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if(response.errno === ERR_OK){
          this.goods = response.goods;
//          console.log(this.goods);
          /* DOM更新后开始执行 */
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods:{
      selectMenu(index, event){
        if(!event._constructed){ /* 原生浏览器点击事件没有这个属性，但是betterScroll有。规避了pc端执行两次的点击事件，因为betterScroll设置click：true的时候，会默认派发一个点击事件。 */
          return;
        }
        let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el=foodList[index];
        this.foodsScroll.scrollToElement(el, 300);/* betterScroll有一个支持滚动到元素的接口 */
//        console.log(index);
      },
      _initScroll(){
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true /* betterScroll监听了touchstart，touchend事件，阻止了默认事件。 */
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType:3 /* scroll在滚动的时候，实时位置 */
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY=Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight(){
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height=0;
        this.listHeight.push(height);
        for(let i=0;i<foodList.length;i++){
          let item=foodList[i];
          height+=item.clientHeight;
          this.listHeight.push(height);
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
@import './goods.scss';
</style>

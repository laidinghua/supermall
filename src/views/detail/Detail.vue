<template>
  <div id="detail" class="detail-nav">
    <detail-nav-bar @titleClick="titleClick" class="detail-nav" ref="nav"/>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper ref="base" :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"> </detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo" ></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo" ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommendsInfo" ></goods-list>
    </scroll>

    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!--<toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  /*import Toast from "components/common/toast/Toast";*/

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {debounce} from "../../common/utils";

  export default {
		name: "Detail",
    data(){
		  return {
		    iid: null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommendsInfo:[],
        themeTopYs:[],
        getTitleTo:null,
        currentIndex:0,
       /* message:'',
        show:false*/
      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      // Toast
    },
    created() {
		  //1、保存传入的iid
		  this.iid = this.$route.params.iid

      //2、根据传入的iid请求数据
      getDetail(this.iid).then(res=>{
        //console.log(res);
        const data=res.result;
        this.topImages=res.result.itemInfo.topImages

        //2、获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //3、获取商家信息
        this.shop=new Shop(data.shopInfo)
        //4、获取商品图片信息
        this.detailInfo=data.detailInfo
        //5、获取商品参数信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule);
        //6、获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo=data.rate.list[0]
        }

      })

      //7、获取商品推荐数据
      getRecommend().then(res=>{
        this.recommendsInfo=res.data.list
      })

    },
    mounted(){
      this.getTitleTo=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
       // console.log(this.themeTopYs);
      },100);
    },
    methods:{
      detailImageLoad(){
        this.newRefresh()
        this.getTitleTo();
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        const positionY=-position.y;
        let length=this.themeTopYs.length
        for(let i=0;i<length-1;i++){
          /*if(this.currentIndex!==i && ((i < length-1 && positionY >= this.themeTopYs[i]&&positionY<
            this.themeTopYs[i+1])||(i===length-1&&positionY>=this.themeTopYs[i]))){
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex;*/
            if (this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
              this.currentIndex=i;
              this.$refs.nav.currentIndex=this.currentIndex;
          }
        }

        //3、是否显示回到顶部
        this.listenShowBackTop(position)
      },
      addToCart(){
        //1、获取购物车需要展示的信息
        const product={}
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        //2、将商品添加到购物车里
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product).then(res=>{
         /* this.show=true;
          this.message=res;
          setTimeout(()=>{
            this.show=false;
            this.message=''
          },1500)*/

          //console.log(this.$toast);
          this.$toast.show(res)

        })

        //3、添加到购物车成功

      },


    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    }
  }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
  .content{
    height: calc(100% - 44px - 49px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>

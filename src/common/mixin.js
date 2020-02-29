import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin={
  data(){
    return{
      itemImageListener:null,
       newRefresh:null
    }
  },
  mounted(){
    //1、图片加载完成的事件监听
    this.newRefresh =debounce(this.$refs.scroll.refresh,50)
    this.itemImageListener=()=>{
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImageListener)
  }
}
export const backTopMixin={
  data() {
    return {
      isShowBackTop:false,
    };
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    listenShowBackTop(position){
      this.isShowBackTop=-(position.y)>1000
    }
  },
  components:{
    BackTop
  },
}

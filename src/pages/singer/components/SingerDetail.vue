<template>
  <div class="singer-detail">
    歌手详情页{{singerid}}
    <!--加载中 公共组件-->
    <div class="singer-loading">
      <loading v-show="false"></loading>
    </div>
  </div>
</template>

<script>
import {getSingerDetail} from '@/api/singer'  //引入api的后台数据
import {ERR_OK} from '@/api/config' //引入自定义的公共变量
import Loading from '@/common/loading/loading'

export default {
  name: 'SingerDetail',
  components:{
    Loading
  },
  props:{
    singerid:{
      type:Number,
      default:0
    }
  },
  created(){
      this._getSingerDetail()
  },
  methods:{

    _getSingerDetail(){
      //执行api的js方法
      console.log(this.singerid)
      getSingerDetail(this.singerid).then((res)=>{
        if(res.code === ERR_OK){
          console.log(res.data.list)
          //this.sliders = res.data.slider
        }
      })
    }
  }
}
</script>

<style>
  .singer-detail{
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background-color: #eee;
  }
/*加载中组件位置*/
  .singer-loading{
    margin-top: 30px;
    width: 100%;
  }
</style>

<template>
  <div class="songlist" >
    <ul>
      <li v-for="item of songs">
        <div class="songlist-text">
          <h2>{{item.name}}</h2>
          <p>{{getDesc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  name: 'SongList',
  //根据可能需要的值，围绕编写
  props:{
    songs:{
      type:Array,
      default:[]
    }
  },
  methods:{
    getDesc(song){
      return `${song.singer}·${song.album}`
    }
  }
 
}
</script>

<style>
  .songlist{
    background-color: #fff;
  }
  .songlist ul li{
    display: flex;
    box-sizing: border-box;
    height: 64px;
    padding: 0 20px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .songlist-text{
    margin:auto 0;
  }
  .songlist-text h2{
    font-size: 14px;
  }
  .songlist-text p{
    font-size: 10px;
    margin-top: 6px;
    color: rgba(7,17,27,0.6);

  }
</style>

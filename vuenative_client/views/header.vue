<template>
  <view class="status">
    <view :style="{width:'90%'}">
      <text v-if="!log" class="title">Sign In</text>
      <text v-else class="title">POSTS</text>
    </view> 
    <touchable-opacity v-if="log" :on-press="()=>SignOut()">
      <ionicons class="ionicicons" :size="30" name="md-power" color="#122779" />
    </touchable-opacity>
  </view>
</template>

<script>
import { Ionicons } from '@expo/vector-icons';
import store from '../store/index'
export default {
  components:{Ionicons},
  methods:{
    // sign Out method
    SignOut(){
      store.commit("remove",);
    }
  },
  computed:{
    // returns true if user is logged in
    log(){
      return store.state.logged
    }
  }
}
</script>

<style>
.status{
  flex-direction: row;
    height: 60px;
    background-color:rgb(110, 106, 106);
    justify-content: center;
    align-items: center;
    color: white;
}
.title{
    color: white;
    margin-left: 10px;
    font-size: 25px;
}
.ionicicons{
  width: 30;
}
</style>

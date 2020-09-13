<template>
  <view class="container">
    <Status/>
    <Header/>
    <view class='cred'>
      <!-- displayts content if user is logged in -->
      <Details v-if="get" />
      <!-- displays login screen if user is not logged in -->
      <Login v-else/>
    </view>
  </view>
</template>

<script>
import Status from './views/StatusBar';
import Header from './views/header';
import Login from './views/Login';
import Details from './views/Details'
import store from './store/index'
export default {
  components:{
Status,Header,Login,Details
  },
  data(){
return{
}
  },
  computed:{
    get(){
      return store.state.logged
    }
  }
}
</script>

<style>
.container {
  flex: 1;
}
.cred{
    align-content: center;
    background-color:#dfd9d9;
    height: 100%;
}

</style>

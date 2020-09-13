<template>
    <view class="tot">
        <view class="inputField">
            <text class="h1" >Use Name</text>
            <text-input class="inp" v-model="uname"/>
        </view>
        <view class="inputField">
            <text class="h1" >Password</text> 
            <text-input class="inp" secure-text-entry v-model="password"/>
        </view>
        <view class="inputField">
            <button :on-press="Signin" color="#883569" class="logBtn" title="Login"/>
        </view>
        <view v-if="login=='no'" class="inputField">
            <text :style="{color:'red'}"  v>'Wrong Credentials</text>
        </view>
    </view>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
export default {
    data(){
        return{
            uname:'',
            password:'',
            login:false,
            erro:false,
        }
    },
    methods:{
        // Sign in method
        Signin:async function(){
            // sends post request to server
            axios({url:'http://192.168.0.146:3000/po',
                method:'post',
                params:{uname: this.uname,
                password:this.password}
                }).then((result)=>{
                    this.login=result.data
                    if(this.login=='yes')
                    {
                        // if credentials are correct log details are stored to vuex store
                        store.commit("save",);
                    }
                })
        },
    },
}
</script>
<style scoped>
.inputField{
    flex-direction:row;
    justify-content:space-around;
    margin-top:40px;
    font-size:80px;
}
.tot{
flex-direction:column;
align-content:center;
justify-content: space-around;
margin-top:30%;
margin-left: 5%;
width: 90%;
}
.h1{
    font-size:20
}
.inp{
    height: 30;
     width: 68%;
     font-size: 18px;
     /* border: 2px solid gray; */
    borderBottomColor: #555555;
    borderBottomWidth:2;
}
</style>

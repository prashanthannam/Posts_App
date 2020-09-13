<template>
    <view>
        <view class="row">
            <text-input placeholder='Post content......' class="inp" v-model="newpost"/>
            <view>
                <button :on-press="postContent" color="#116688" class="logBtn" title="Post"/>
            </view>
        </view>
        <view>
            <scroll-view :style="{width:'100%'}">
                <view class="postBox"  v-for="(post,index) in posts" :key="index">
                    <view :style="{width:'90%'}">
                        <text v-if="!post.edit" class="post">{{post.post}}</text>
                        <view v-else> 
                            <text-input  class="inp" v-model="posts[index].edited"/>
                            <view class="end">
                                <touchable-opacity  :on-press="()=>editPost(index)">
                                    <text class='del-btn'>submit</text>
                                </touchable-opacity>
                            </view>
                        </view>
                    </view>
                    <view class="col">
                        <touchable-opacity :on-press="()=>deletePost(index)">
                            <ionicons name="md-trash" :size="40" color="#991a1a" />
                        </touchable-opacity>
                        <touchable-opacity :on-press="()=>{post.edit=!post.edit; post.edited=post.post}">
                            <ionicons v-if="!post.edit" name="md-create" :size="35" color="#125751" />
                            <ionicons v-else name="md-close" :size="40" color="#125751" />
                        </touchable-opacity>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
import { Ionicons } from '@expo/vector-icons';

export default {
    components:{Ionicons},
    data(){
        return{
            posts:[],
            newpost:''
        }
    },
    methods:{
        // method to delete a particular post by sending a delete request to server
        deletePost(index){
            axios({url:'http://192.168.0.146:3000/content',
            method:'delete',
            params:{post:this.posts[index].post}
            }).then((result)=>{
                this.newpost=''
                this.moun()
            })
        },

        // method to edit a particular post by sending a put request to server
        editPost(index){
            axios({url:'http://192.168.0.146:3000/content',
            method:'put',
             params:{post:this.posts[index].post,edited:this.posts[index].edited}
            }).then((result)=>{
                this.moun()
            })
        },

        // method to create a post by sending a post request to server
        postContent(){
            axios({url:'http://192.168.0.146:3000/content',
            method:'post',
            params:{post:this.newpost}
            }).then((result)=>{
                this.newpost=''
                this.moun()
            })
        },

        // method to retrieve all posts by sending a get request to server
        moun(){
            this.posts=[]
            axios({url:'http://192.168.0.146:3000/content',
             method:'get',
            }).then((result)=>{
                result.data.forEach(element => {
                this.posts.unshift({post:element.post, edit:false,edited:element.post})
            });
            })
        }
    },
    mounted(){
      this.moun()
    }
}
</script>
<style scoped>

.tot{
flex-direction:column;
align-content:center;
margin-top: 10px;
margin-left: 80%;
}
.del-btn{
    color: #991a1a;
    font-size: 20;
}
.post{
    font-size: 25;
}
.postBox{
    flex-direction: row;
    margin-top:4px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    background-color: rgb(199, 202, 202);
}
.row{
    flex-direction: row;
    margin: 10px;
}
.inp{
    margin: 5px;
    height: 40;
     width: 85%;
     font-size: 18;
     /* border: 2px solid gray; */
    borderBottomColor: #555555;
    borderBottomWidth:2;
}
.col{
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
}
.end{
    margin-left: 60%;
}
</style>

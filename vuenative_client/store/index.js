import Vue from 'vue-native-core'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        logged: false,
        user: ''
    },
    mutations: {
        save(state) {
            state.logged = true
        },
        remove(state) {
            state.logged = false
        },
    },
    modules: {}
})
export default store;
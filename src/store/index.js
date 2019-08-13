import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    isCollapse:false
}
const getters = {
    isCollapse() {
        return state.isCollapse
    }
}
const mutations = {
    isCollapse(state) {
        state.isCollapse = false
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations
})

export default store;
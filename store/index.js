import axios from 'axios'
import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  // async login({ commit }, { username, password }) {
  //   console.log('In Login Store block')
  //   try {
  //     const { data } = await axios.post('/api/login', { username, password })
  //     console.log(data);
  //     commit('SET_USER', data)
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       throw new Error('Bad credentials')
  //     }
  //     throw error
  //   }
  // },
  async login({ commit }, { username, password }) {
    await axios.post('/api/login',{username, password}).then((response) =>{
        commit('SET_USER',response.data)
    }).catch((error)=>{
      if (error.response && error.response.status === 401) {
               throw new Error('Please enter the required field')
             }
             throw error
    })
  },

   async signup({commit}, payload){
     console.log('Signup method  in store')
      // try {
      //   const { data } = await axios.post('/api/signup', payload)
      //   commit('SET_USER', data)
      // } catch (error) {
      //   let errordata = error.response.data.errors;
      //   Object.keys(errordata).forEach((item) => {
      //     //console.log(errordata[item].message); // value
      //     throw new Error(errordata[item].message)
      //   });
      //   throw error

      await axios.post('/api/signup', payload).then((response)=>{
        commit('SET_USER',response.data)
      }).catch((error)=>{
        console.log(error);

      })



        // let {email, password, phoneNumber} = error.response.data.errors;

        // if(email != undefined){
        // console.log(email.message);
        // }
        // if(password != undefined){
        // console.log(password.message);
        // }
        // if(phoneNumber != undefined){
        // console.log(phoneNumber.message);
        // }
         
      },
      

    //_message: "users validation failed"  : Password error
    // async signup({commit}, payload){
    //    axios.post('/api/signup',payload).then((response)=>{
    //    console.log(response)
    //    }).catch((e)=> {
    //        console.log(e)
    //      throw new Error('Bad credentials')
    //      throw error
    //    })



  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }

}

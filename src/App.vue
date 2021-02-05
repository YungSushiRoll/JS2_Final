<template>
  <div id="app">
    <NavBar/>
    <router-view/>
    <Footer/>
    
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
  data() {
    return {
      // username: "",
    }
  },
  name: 'App',
  components: {
    NavBar,
    Footer,
  },
  methods: {
    // updateName(username) {
    //   alert(username + "app");
    // }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Unica+One&display=swap');
  #app
  {
    font-family: Unica One;
    font-size: 20px;
  }
</style>

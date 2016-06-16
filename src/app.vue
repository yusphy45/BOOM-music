<template>
  <b-phonograph v-show="intoPlay" transition="expand"></b-phonograph>
  <router-view></router-view>
  <b-footer></b-footer>
</template>

<script type="text/babel">
  export default {
    data(){
      return {
        intoPlay: false
      }
    },

    events: {
      displayPlayer(){
        this.intoPlay = !this.intoPlay;
      }
    },

    ready(){
      this.intoPlay = false;
    }
  }
</script>
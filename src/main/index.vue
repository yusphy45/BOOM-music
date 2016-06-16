<style scoped>
  .cancel {
    flex: 1 1 100px;
    color: #fff;
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
    transition: all .25s;
    overflow: hidden;
  }

</style>

<template>
  <b-music-header>
    <b-microphone v-show="!searchAlready" transition="scale"></b-microphone>
    <b-search-input :action.sync="searchAlready" @touchstart="searchReady"></b-search-input>
    <b-sound-wave v-show="!searchAlready"></b-sound-wave>
    <span class="cancel" v-show="searchAlready" @touchstart="cancelSearch">取消</span>
  </b-music-header>
  <b-music-menu v-show="!searchAlready"></b-music-menu>
  <router-view v-show="!searchAlready"></router-view>
</template>

<script type="text/babel">
  export default {
    data(){
      return {
        searchAlready: false
      }
    },

    methods: {
      searchReady(){
        this.searchAlready = true;
      },
      cancelSearch(){
        this.searchAlready = false;
      }
    }
  }
</script>
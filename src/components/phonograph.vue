<style scoped>
  .wrapper {
    position: fixed;
    background-color: #333;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    overflow: hidden;
    transition: all .2s;
  }

  .bg {
    width: 100%;
    height: 100%;
    background-position: 50% 40%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    -webkit-filter: blur(120px);
  }

  header, footer {
    position: absolute;
    width: 100%;
  }

  header {
    display: flex;
    left: 0;
    top: 0;
    height: 100px;
    border-bottom: 2px solid #eee;
    align-items: center;
    justify-content: space-between;
    color: #fff;
  }

  header span {
    flex: 1 1 130px;
    text-align: center;
  }

  header .icon {
    width: 50px;
    height: 50px;
    fill: #fff;
  }

  header .title {
    flex: 5 6 600px;
    text-align: center;
  }

  .title p {
    margin: 7px 0;
  }

  main {
    top: 100px;
    left: 0;
    bottom: 200px;
    overflow: hidden;
  }

  footer {
    height: 200px;
    bottom: 0;
  }

  .control {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .control span {
    display: inline-block;
    flex: 1 1 200px;
    text-align: center;
  }

  .control-icon {
    width: 60px;
    height: 60px;
    fill: #fff;
  }

</style>

<template>
  <div class="wrapper">
    <div class="bg" :style="{ backgroundImage: 'url(' + currentItem.src + ')' }"></div>
    <header>
      <span @touchstart="return">
        <svg class="icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-return"></use>
        </svg>
      </span>
      <div class="title">
        <p v-text="currentItem.name"></p>
        <p v-text="currentItem.singer"></p>
      </div>
      <span>
        <svg class="icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-share"></use>
        </svg>
      </span>
    </header>
    <b-album :src="currentItem.src"></b-album>
    <footer>
      <b-music-process v-if="currentItem.url !== ''" :url="currentItem.url"></b-music-process>
      <div class="control">
      <span>
      </span>
      <span @touchstart="preSong">
        <svg class="control-icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-pre"></use>
        </svg>
      </span>
      <span @touchstart="play(1)" v-show="playing !== 1">
        <svg class="control-icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-play"></use>
        </svg>
      </span>
      <span @touchstart="play(0)" v-show="playing === 1">
        <svg class="control-icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-paused"></use>
        </svg>
      </span>
      <span @touchstart="nextSong">
        <svg class="control-icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-next"></use>
        </svg>
      </span>
      <span>
      </span>
      </div>
    </footer>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue';
  import { getStatus, getIndex }from 'vuex/getters.js';
  import { displayPlayer, choose, next, pre, toggle } from 'vuex/actions.js';

  export default {
    data(){
      return {
        stageObj: {
          stage: null,
          r: 0
        },
        currentItem: {
          url: '',
          src: '',
          name: '',
          singer: ''
        }
      }
    },

    props: ['list'],

    vuex: {
      getters: {
        index: getIndex,
        playing: getStatus
      },
      actions: {
        displayPlayer,
        toggle,
        choose,
        next,
        pre
      }
    },

    methods: {
      return(){
        this.displayPlayer(false);
      },

      init(){
        this.currentItem = this.list[this.index];
      },

      play(flag){
        this.toggle(flag);
      },

      nextSong(){
        if (this.index < this.list.length - 1) {
          this.next();
        } else {
          this.choose(0);
        }
      },

      preSong(){
        if (this.index > 0) {
          this.pre();
        } else {
          this.choose(this.list.length - 1);
        }
      }
    },

    watch: {
      index(newVal, oldVal) {
        if (newVal !== oldVal) this.currentItem = this.list[this.index];
      },
      playing(newVal){
        if (newVal === -1) {
          console.log(this.playing);
          this.nextSong();
        }
      }
    },

    ready(){
      this.init();
    }
  }
</script>

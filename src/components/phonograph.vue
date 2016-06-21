<style scoped>
  .wrapper {
    position: fixed;
    background-color: #fff;
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
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: auto 400%;
    -webkit-filter: blur(50px);
  }

  .player {
    background-image: url('/dist/media/image/cm2_play_disc@3x.png');
    background-size: 100% 100%;
    width: 650px;
    height: 650px;
  }

  .player-bg {
    border-radius: 50%;
    background-color: rgba(155, 155, 155, .2);
    width: 660px;
    height: 660px;
  }

  canvas {
    width: 600px;
    height: 600px;
    border-radius: 50%;
  }

  .player-bg, .player, canvas {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  header, main, footer {
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
    color: rgba(180, 180, 180, 1);
  }

  header span {
    flex: 1 1 130px;
    text-align: center;
  }

  header .icon {
    width: 50px;
    height: 50px;
    fill: rgba(180, 180, 180, 1);
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

  .read-header {
    position: absolute;
    width: 250px;
    left: 56.5%;
    top: -65px;
    transform: translate3d(-50%, 0, 0) rotateZ(-20deg);
    transform-origin: 25% 16%;
    transition: all .3s ease-in;
    z-index: 3;
  }

  .playing {
    transform: translate3d(-50%, 0, 0) rotateZ(-0deg);
  }
</style>

<template>
  <div class="wrapper">
    <div class="bg" :style="{ backgroundImage: 'url(' + currentItem.image.src + ')' }"></div>
    <header>
      <span @touchstart="return">
        <svg class="icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-return"></use>
        </svg>
      </span>
      <div class="title">
        <p>What Are Words</p>
        <p>charlie Puth</p>
      </div>
      <span>
        <svg class="icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-share"></use>
        </svg>
      </span>
    </header>
    <main>
      <img class="read-header" :class="{ 'playing':playing }" src="/dist/media/image/cm2_play_needle_play@3x.png">
      <div class="player-bg">
        <canvas width="1200" height="1200"></canvas>
        <span class="player"></span>
      </div>
    </main>
    <footer>
      <b-music-control v-if="currentItem.url !== ''" :url="currentItem.url" :playing.sync="playing"></b-music-control>
    </footer>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue';

  export default {
    data(){
      return {
        playing: false,
        stageObj: {
          stage: null,
          r: 0
        },
        index: 0,
        currentItem: {
          url: '',
          image: {}
        }
      }
    },

    props: ['list'],

    watch: {
      playing(value){
        if (value) this.play();
      }
    },

    methods: {
      play(){
        setTimeout(() => {
          requestAnimationFrame(this.draw);
        }, 300);
      },

      return(){
        this.$dispatch('displayPlayer');
      },

      draw(){
        let {stage, r} = this.stage;
        let image = this.currentItem.image;
        stage.clearRect(-r / 2, -r / 2, r, r);
        stage.rotate(Math.PI / 180);
        stage.drawImage(image, -r / 2, -r / 2, r, r);
        if (this.playing) requestAnimationFrame(this.draw);
      },

      init(index){
        let image = new Image();
        image.onload = () => {
          this.currentItem.image = image;
          this.stage.stage.drawImage(image, -this.stage.r / 2, -this.stage.r / 2, this.stage.r, this.stage.r);
        };
        image.src = this.list[index].src;
        this.currentItem.url = this.list[index].url;
      }
    },

    events: {
      toggle(flag){
        let i = this.index;
        if (flag === -1) {
          i = i - 1;
        } else {
          i = i + 1;
        }
        if (this.list[i]) {
          this.index = i;
          this.init(i);
        }
      }
    },

    ready(){
      var canvas = this.$el.querySelector("canvas");
      var ctx = canvas.getContext("2d");
      ctx.translate(canvas.width / 2, canvas.height / 2);
      this.stage = {
        stage: ctx,
        r: canvas.width
      };
      this.init(0);
    }
  }
</script>

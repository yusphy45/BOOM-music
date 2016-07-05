<style scoped>
  main {
    position: absolute;
    width: 100%;
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
  <main>
    <img class="read-header" :class="{ 'playing':playing === 1 }" src="/dist/media/image/cm2_play_needle_play@3x.png">
    <div class="player-bg">
      <canvas width="1200" height="1200"></canvas>
      <span class="player"></span>
    </div>
  </main>
</template>

<script type="text/babel">
  import { getStatus, getIndex, getLoading }from 'vuex/getters.js';

  export default {
    data(){
      return {
        stage: {
          ctx: null,
          r: 0
        },
        image: {},
        timer: 0
      }
    },

    props: ['src'],

    vuex: {
      getters: {
        playing: getStatus,
        loading: getLoading
      }
    },

    methods: {
      play(){
        setTimeout(() => {
          this.timer = requestAnimationFrame(this.draw);
        }, 300);
      },

      draw(){
        let {ctx, r} = this.stage;
        let image = this.image;
        ctx.clearRect(-r / 2, -r / 2, r, r);
        ctx.rotate(Math.PI / 1440);
        ctx.drawImage(image, -r / 2, -r / 2, r, r);
        if (this.playing === 1) this.timer = requestAnimationFrame(this.draw);
      },

      init(){
        let image = new Image();
        image.onload = () => {
          this.image = image;
          this.stage.ctx.drawImage(image, -this.stage.r / 2, -this.stage.r / 2, this.stage.r, this.stage.r);
        };
        image.src = this.src;
      }
    },

    watch: {
      loading(value){
        if (!value && this.playing === 1) {
          this.play();
        }
      },
      playing(value){
        if (value === 1 && !this.loading) {
          this.play();
        }
      },
      src(newVal, oldVal){
        if (newVal !== oldVal) {
          if (this.timer) {
            cancelAnimationFrame(this.timer);
          }
          this.init();
        }
      }
    },

    ready(){
      var canvas = this.$el.querySelector("canvas");
      var ctx = canvas.getContext("2d");
      ctx.translate(canvas.width / 2, canvas.height / 2);
      this.stage = {
        ctx: ctx,
        r: canvas.width
      };
      this.init();
    }
  }
</script>
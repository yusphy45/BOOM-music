<style scoped>
  @keyframes rotate {
    0% {
      transform: translate3d(-50%, -50%, 0) rotateZ(0deg);
    }

    100% {
      transform: translate3d(-50%, -50%, 0) rotateZ(360deg);
    }
  }

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
    background-image: url("http://p1.music.126.net/19uFBdmSXalWhG8CQcZ9Nw==/2282586139308128.jpg");
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

  .img {
    width: 600px;
    height: 600px;
    border-radius: 50%;
    animation: rotate 30s infinite linear .3s;
  }

  .paused-rotate {
    animation: rotate 30s infinite linear .3s paused;
  }

  .player-bg, .player, .img {
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
    left: 0;
    top: 0;
    height: 100px;
  }

  main {
    top: 100px;
    left: 0;
    bottom: 200px;
  }

  footer {
    height: 200px;
    bottom: 0;
  }

  .read-header {
    position: absolute;
    width: 200px;
    left: 56.5%;
    top: 0;
    transform: translate3d(-50%, 0, 0) rotateZ(-45deg);
    transform-origin: 25% 16%;
    transition: all .3s;
    z-index: 3;
  }

  .playing {
    transform: translate3d(-50%, 0, 0) rotateZ(0deg);
  }
</style>

<template>
  <div class="wrapper">
    <div class="bg"></div>
    <header></header>
    <main @touchstart="play()">
      <img class="read-header" :class="{ 'playing':playing }" src="/dist/media/image/cm2_play_needle_play@3x.png">
      <div class="player-bg">
        <img class="img" :class="{ 'paused-rotate':!playing }" src="http://p1.music.126.net/19uFBdmSXalWhG8CQcZ9Nw==/2282586139308128.jpg">
        <span class="player"></span>
      </div>
    </main>
    <footer @touchstart="return"></footer>
  </div>
</template>

<script type="text/babel">
  export default {
    data(){
      return {
        playing: false
      };
    },

    methods: {
      play(){
        this.playing = !this.playing;
      },

      return(){
        this.$dispatch('displayPlayer');
      }
    }
  }
</script>

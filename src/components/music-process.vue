<style scoped>
  .process {
    height: 60px;
    color: #fff;
    text-align: center;
  }

  .process span, .process canvas {
    display: inline-block;
    height: 60px;
    vertical-align: middle;
  }

  .process span {
    width: 100px;
    padding: 20px 0;
    text-align: center;
  }

  .process canvas {
    width: 500px;
  }

</style>

<template>
  <div>
    <div class="process">
      <span v-text="currentTime | time"></span>
      <canvas width="1000" height="120"></canvas>
      <span v-text="duration | time"></span>
    </div>
  </div>
</template>

<script type="text/babel">
  import { getStatus }from 'vuex/getters.js';
  import { loaded, toggle } from 'vuex/actions.js';

  var Mc = function (canvas) {
    this.stage = canvas.getContext('2d');
    this.w = canvas.width;
    this.h = canvas.height;
    return this;
  };

  Mc.prototype.draw = function (color, width, bufferLength, length) {
    let ctx = this.stage;
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.beginPath();
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, this.h / 2);
    ctx.lineTo(this.w, this.h / 2);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = '#999';
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, this.h / 2);
    ctx.lineTo(bufferLength, this.h / 2);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, this.h / 2);
    ctx.lineTo(length, this.h / 2);
    ctx.stroke();
    ctx.closePath();
  };

  export default {
    data(){
      return {
        currentItem: new Audio(),
        currentTime: 0,
        duration: 0,
        stage: null,
        songLength: 0,
        bufferLength: 0,
        timer: 0
      }
    },

    props: ['url'],

    vuex: {
      getters: {
        playing: getStatus
      },
      actions: {
        loaded,
        toggle
      }
    },

    filters: {
      'time'(val){
        let temp = Math.floor(val);
        let h = Math.floor(temp / 360);
        let m = Math.floor(temp / 60);
        let s = temp % 60;
        return `${h < 10 ? '0' + h : h }:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`.replace(/^(00\:)(\S)/g, '$2');
      }
    },

    methods: {
      play(){
        if (this.playing === 1 && this.currentItem.paused) {
          this.currentItem.play();
          this.timer = requestAnimationFrame(this.draw);
        } else {
          this.currentItem.pause();
        }
      },

      draw(){
        this.currentTime = this.currentItem.currentTime;
        this.songLength = (this.currentItem.currentTime / this.currentItem.duration) * this.stage.w;
        this.bufferLength = this.bufferLength = ((this.currentItem.buffered.length > 0 ? this.currentItem.buffered.end(0) : 0) / this.currentItem.duration) * this.stage.w;
        this.stage.draw('#333', 10, this.bufferLength, this.songLength);
        if (this.playing === 1) this.timer = requestAnimationFrame(this.draw);
      },

      init(){
        let audio = this.currentItem;
        audio.src = this.url;
        this.currentItem = audio;
        audio.addEventListener('canplay', () => {
          this.duration = audio.duration;
          this.loaded(false);
          if (this.playing === 1) this.play(true);
        }, false);
        this.duration = 0;
        this.stage = new Mc(this.$el.querySelector('canvas'));
        this.stage.draw('#333', 10, 0);
        this.currentTime = 0;
        this.loaded(true);
      }
    },

    watch: {
      url(newVal, oldVal){
        if (newVal !== oldVal) {
          if (this.timer) cancelAnimationFrame(this.timer);
          this.init();
        }
      },

      playing(newVal, oldVal){
        if (newVal !== oldVal) this.play();
      },

      currentTime(value){
        if (value !== 0 && value >= this.duration - 1) {
          this.toggle(-1);
          setTimeout(()=> {
            this.toggle(1);
          })
        }
      }
    },

    ready(){
      this.init();
    }
  }
</script>

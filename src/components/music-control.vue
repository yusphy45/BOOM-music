<style scoped>
  .control, {
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
    fill: rgba(180, 180, 180, 1);
  }

  .process {
    height: 60px;
    color: rgba(180, 180, 180, 1);
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
    <div class="control">
      <span>
      </span>
      <span @touchstart="pre">
        <svg class="control-icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-pre"></use>
        </svg>
      </span>
      <span @touchstart="play(true)" v-show="!playing">
        <svg class="control-icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-play"></use>
        </svg>
      </span>
      <span @touchstart="play(false)" v-show="playing">
        <svg class="control-icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-paused"></use>
        </svg>
      </span>
      <span @touchstart="next">
        <svg class="control-icon">
          <use xlink:href="/dist/media/image/symbol-defs.svg#icon-next"></use>
        </svg>
      </span>
      <span>
      </span>
    </div>
  </div>
</template>

<script type="text/babel">
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
        bufferLength: 0
      }
    },

    props: ['url', 'playing'],

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
      play(flag){
        this.playing = flag;
        this.playing ? this.currentItem.play() : this.currentItem.pause();
        if (this.playing) requestAnimationFrame(this.draw);
      },

      draw(){
        this.currentTime = this.currentItem.currentTime;
        this.songLength = (this.currentItem.currentTime / this.currentItem.duration) * this.stage.w;
        this.bufferLength = this.bufferLength = ((this.currentItem.buffered.length > 0 ? this.currentItem.buffered.end(0) : 0) / this.currentItem.duration) * this.stage.w;
        this.stage.draw('#333', 10, this.bufferLength, this.songLength);
        if (this.playing) requestAnimationFrame(this.draw);
      },

      init(){
        let audio = this.currentItem;
        audio.src = this.url;
        this.currentItem = audio;
        audio.addEventListener('canplay', () => {
          this.duration = audio.duration;
        }, false);

        this.stage = new Mc(this.$el.querySelector('canvas'));
        this.stage.draw('#333', 10, 0);
        if (this.playing) this.play(true);
        this.currentTime = 0;
      },

      next(){
        this.$dispatch('toggle', 1);
      },

      pre(){
        this.$dispatch('toggle', -1);
      }
    },

    watch: {
      url(){
        this.init();
      }
    },

    ready(){
      this.init();
    }
  }
</script>

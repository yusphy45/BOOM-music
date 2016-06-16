<style scoped>
  .wrapper {
    position: relative;
    width: 100%;
    margin: 0;
    padding-left: 0;
    display: flex;
    color: #b72712;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    height: 70px;
    font-size: 24px;
  }

  ul, li {
    list-style: none;
  }

  li {
    flex: 1 1 200px;
    text-align: center;
    height: 100%;
    padding: 23px 0;
  }

  li.spirit {
    position: absolute;
    padding: 0;
    bottom: 0;
    width: 0;
    left: 0;
    height: 4px;
    background-color: #b72712;
    transition: all .1s;
  }

  span {
    display: inline-block;
  }
</style>

<template>
  <ul class="wrapper" @touchstart="choose($event)">
    <li><span v-link="'/main/'">个性推荐</span></li>
    <li><span v-link="'/main/playlist'">歌单</span></li>
    <li><span v-link="'/main/djradio'">主播电台</span></li>
    <li><span v-link="'/main/toplist'">排行榜</span></li>
    <li class="spirit"></li>
  </ul>
</template>

<script type="text/babel">
  export default {
    data(){
      return {
        spirit: null
      }
    },

    methods: {
      drew(target){
        let { left } = target.getBoundingClientRect();
        let width = target.clientWidth;
        this.spirit.style.width = width + 'px';
        this.spirit.style.left = left + 'px';
      },

      choose(event){
        let target = null;
        if (event.target.tagName.toLowerCase() === 'ul') return;
        if (event.target.tagName.toLowerCase() !== 'span') {
          target = event.target.querySelector('span');
        } else {
          target = event.target;
        }
        this.drew(target);
      }
    },

    ready(){
      this.spirit = this.$el.querySelector('li.spirit');
      let target = this.$el.querySelector('span');
      this.drew(target);
    }
  }
</script>
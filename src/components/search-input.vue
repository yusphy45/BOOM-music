<style scoped>
  .wrapper {
    position: relative;
    flex: 6 1 600px;
    background-color: #fff;
    color: #ccc;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    text-align: center;
    transition: all .25s;
    vertical-align: middle;
  }

  input {
    border: 0;
    outline: none;
    width: 230px;
    height: 30px;
    font-size: 20px;
    text-align: left;
    transition: all .25s;
  }

  input::-webkit-input-placeholder {
    color: #ccc;
  }

  span, input {
    display: inline-block;
  }

  .title {
    width: 30px;
    height: 30px;
    fill: #ccc;
    vertical-align: middle;
  }

  .wrapper.action input {
    width: calc(100% - 40px);
  }

</style>

<template>
  <div class="wrapper" :class="{ 'action':action }">
    <span>
      <svg class="title">
        <use xlink:href="/dist/media/image/symbol-defs.svg#icon-search"></use>
      </svg>
    </span>
    <input placeholder="搜索音乐、歌词、电台">
  </div>
</template>

<script type="text/babel">
  export default {
    data(){
      return {};
    },

    props: ['action']
  }
</script>
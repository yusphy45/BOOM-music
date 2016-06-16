<style scoped>
  footer, footer * {
    box-sizing: border-box;
  }

  footer {
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: justify;
    padding: 10px 0;
    background-color: rgba(0, 0, 0, .8);
    display: flex;
  }

  .icon {
    width: 60px;
    height: 60px;
    fill: #fff;
  }

  footer > span {
    display: inline-block;
    width: 25%;
    text-align: center;
  }

  footer svg {
    cursor: pointer;
    margin-bottom: 5px;
  }

  span.title {
    display: inline-block;
    width: 100%;
    font-size: 20px;
    cursor: pointer;
  }
</style>

<template>
  <footer>
    <span v-link="'/main'">
      <svg class="icon">
        <use xlink:href="/dist/media/image/symbol-defs.svg#icon-music"></use>
      </svg>
      <span class="title">发现音乐</span>
    </span>
    <span v-link="'/my-music'">
      <svg class="icon">
        <use xlink:href="/dist/media/image/symbol-defs.svg#icon-my-music"></use>
      </svg>
      <span class="title">我的音乐</span>
    </span>
    <span v-link="'/sns'">
      <svg class="icon">
        <use xlink:href="/dist/media/image/symbol-defs.svg#icon-sns"></use>
      </svg>
      <span class="title">朋友</span>
    </span>
    <span v-link="'/account'">
      <svg class="icon">
        <use xlink:href="/dist/media/image/symbol-defs.svg#icon-account"></use>
      </svg>
      <span class="title">帐号</span>
    </span>
  </footer>
</template>

<script type="text/babel">

</script>
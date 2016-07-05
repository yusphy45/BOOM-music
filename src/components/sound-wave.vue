<style scoped>
  span {
    flex: 0 1 100px;
    text-align: center;
    padding: 10px 0;
    transition: all .25s;
  }

  span .icon {
    width: 40px;
    height: 40px;
  }

</style>

<template>
  <span @touchstart="displayPlayer(true)">
    <svg class="icon">
      <use xlink:href="/dist/media/image/symbol-defs.svg#icon-sound-wave"></use>
    </svg>
  </span>
</template>

<script type="text/babel">
  import { displayPlayer } from 'vuex/actions.js';

  export default {
    data(){
      return {};
    },

    vuex: {
      actions: {
        displayPlayer
      }
    }
  }
</script>
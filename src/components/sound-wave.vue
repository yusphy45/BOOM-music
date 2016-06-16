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
  <span @touchstart="displayPlayer">
    <svg class="icon">
      <use xlink:href="/dist/media/image/symbol-defs.svg#icon-sound-wave"></use>
    </svg>
  </span>
</template>

<script type="text/babel">
  export default {
    data(){
      return {};
    },

    methods: {
      displayPlayer(){
        this.$dispatch('displayPlayer');
      }
    }
  }
</script>
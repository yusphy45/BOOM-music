<template>
  <b-phonograph v-show="intoPlay" transition="expand" :list="list"></b-phonograph>
  <router-view></router-view>
  <b-footer></b-footer>
</template>

<script type="text/babel">
  export default {
    data(){
      return {
        intoPlay: false,
        list: [
          {
            src: "http://p1.music.126.net/cgJkMUiT6IVfnrETh_aKGg==/1709740581199087.jpg",
            url: 'http://m2.music.126.net/AKtJSZhbGNBQLTFXHlq7iA==/1993414581172306.mp3'
          },
          {
            src: "http://p1.music.126.net/phU8tEv5a1j5PfkTrzO7Ig==/633318697609551.jpg",
            url: 'http://m2.music.126.net/YObwX-_ckQ8SzgxDniVBjg==/2134152069513256.mp3'
          },
          {
            src: "http://p1.music.126.net/_LSagRKhZzUsjSy5fIAMsg==/923589767384661.jpg",
            url: 'http://m2.music.126.net/7jKkWe8fBZf9aiom1Iy2nA==/1333707604531508.mp3'
          }
        ]
      }
    },

    events: {
      displayPlayer(){
        this.intoPlay = !this.intoPlay;
      }
    },

    ready(){
      this.intoPlay = false;
    }
  }
</script>
<template>
  <b-phonograph v-show="intoPlay" transition="expand" :list="list"></b-phonograph>
  <router-view></router-view>
  <b-footer></b-footer>
</template>

<script type="text/babel">
  import { getShowPlayer }from 'vuex/getters.js';
  import { displayPlayer } from 'vuex/actions.js';

  export default {
    data(){
      return {
        list: [
          {
            name: 'Breath and Life',
            singer: 'Audio Machine',
            src: "http://p1.music.126.net/cgJkMUiT6IVfnrETh_aKGg==/1709740581199087.jpg",
            url: 'http://m2.music.126.net/AKtJSZhbGNBQLTFXHlq7iA==/1993414581172306.mp3'
          },
          {
            name: 'All Boundaries Are Conventions',
            singer: 'Tom Tykwer',
            src: "http://p1.music.126.net/phU8tEv5a1j5PfkTrzO7Ig==/633318697609551.jpg",
            url: 'http://m2.music.126.net/YObwX-_ckQ8SzgxDniVBjg==/2134152069513256.mp3'
          },
          {
            name: 'Hello',
            singer: 'OMFG',
            src: "http://p1.music.126.net/8QKweqIW-FDcpCdelLVAdw==/7963762721216450.jpg",
            url: 'http://m2.music.126.net/nldQbp2A8Pld88efoAdfPg==/8002245628191925.mp3'
          }
        ]
      }
    },

    vuex: {
      getters: {
        intoPlay: getShowPlayer
      },
      actions: {
        displayPlayer
      }
    },

    ready(){
      this.displayPlayer(false);
    }
  }
</script>
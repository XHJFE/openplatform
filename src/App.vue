<template>
  <div id="app">
    <x-header></x-header>
    <x-main>
      <x-nav></x-nav>
      <x-container>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </x-container>
    </x-main>

  </div>
</template>

<script>
  import xHeader from 'components/x-header/x-header'
  import xMain from 'components/x-main/x-main'
  import xNav from 'components/x-nav/x-nav'
  import xContainer from 'components/x-container/x-container'
  export default {
    name: 'app',
    components: {
      xHeader,
      xMain,
      xNav,
      xContainer
    },
    data() {
      return {
        isLogin: false
      }
    },
    created() {

      this.isLogin = this.$route.name === 'login' || this.$route.path === '/';
      console.log(this.isLogin);
    }
  }
</script>

<style lang="scss">
  @import "style/index.scss";

  body {
    background: $color-back-body !important;
    font-size: $fs-normal !important;
  }
</style>
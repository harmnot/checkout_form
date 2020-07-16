<template>
  <div id="app">
    <div>
      <Home/>
    </div>
  </div>
</template>
<script>
import Home from './views/Home.vue';

export default {
  components: {
    Home,
  },
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
@import 'assets/styles/main.styl';
@import 'assets/styles/checkout.styl';
</style>

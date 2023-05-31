<template>
  <div id = "app">
    <Wrapper />
  </div>
</template>

<script>
  import Wrapper from './components/wrapper.vue';

  export default {
    name: "app",
    
    components: {
      Wrapper
    }
  }
</script>

<style>
  .app {
    flex-basis: 50%;
  }
</style>

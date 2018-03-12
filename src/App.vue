<template>
  <div id="app">
    <app-base :shape-zoom="1" :num-shapes="5" :t-config.c="2"/>
    <app-controls />
  </div>
</template>

<script>
import AppBase from './components/AppBase.vue'
import AppControls from './components/AppControls.vue'

export default {
  components: {
    AppBase,
    AppControls
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
  background-color: black;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 300;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>

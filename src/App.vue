<template>
  <div id="app">
    <app-base :shape-zoom="1" :num-shapes="5" :t-config.a="10" :wireframe="true"/>
  </div>
</template>

<script>
import AppBase from './components/AppBase.vue'

export default {
  components: {
    AppBase
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
  background-color: black;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>

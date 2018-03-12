<template>
  <div id="app">
    <app-base :shape-zoom="1" :num-shapes="5" :t-config.c="2" :wireframe="hasWireframe" />
    <app-controls v-model="hasWireframe" />
    <app-vuex />
  </div>
</template>

<script>
import AppVuex from './components/AppVuex.vue'
import AppBase from './components/AppBase.vue'
import AppControls from './components/AppControls.vue'

export default {
  components: {
    AppVuex,
    AppBase,
    AppControls
  },
  data() {
    return {
      hasWireframe: false
    }
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

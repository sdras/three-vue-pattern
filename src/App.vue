<template>
  <div id="app">
    <app-base :shape-zoom="+zoomNum" :t-config.c="2" :wireframe="hasWireframe" />
    <app-controls 
      :zoomrange.sync="zoomNum"
      v-model="opts" 
    />
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
      opts: {
        hasWireframe: false,
        hasRainbow: true
      },
      zoomNum: 3
    }
  },
  computed: {}
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

<template>
  <div id="app">

    <!--excited-->
    <app-base 
      :shape-zoom="2" 
      :t-config.a="1" 
      :t-config.b="200" 
    />

    <!-- tense
    <app-base 
      :shape-zoom="2" 
      :t-config.a="1"  
      :color="0xff0000"
      :wireframe="true"
      :rainbow="false"
      :emissive="true"
    />-->

    <!--happy
    <app-base 
      :shape-zoom="2" 
      :t-config.a="1" 
      :t-config.c="10"  
    />-->

    <!--calm
    <app-base :t-config.a="1"  />
    -->

    <!-- tipsy
    <app-base :shape-zoom="1" />
    -->

    <!--frustrated
    <app-base 
      :shape-zoom="3" 
      :t-config.a="1" 
      :t-config.c="3" 
      :wireframe="false" 
      :rainbow="false" 
      :color="0x3964e8" 
    />-->

    <!-- <app-controls 
      :zoomrange.sync="zoomNum"
      v-model="opts" 
    /> -->
  </div>
</template>

<script>
import AppVuex from './components/AppVuex.vue'
import AppBase from './components/AppBase.vue'
// import AppControls from './components/AppControls.vue'

export default {
  components: {
    AppVuex,
    AppBase
    //AppControls
  },
  data() {
    return {
      // opts: {
      //   hasWireframe: false,
      //   hasRainbow: true
      // },
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

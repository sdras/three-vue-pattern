<template>
  <div id="app">

    <app-recorder v-if="intent === 'None'"></app-recorder>
    <app-emotionstatus v-if="intent !== 'None'" :emotion="intent" />

    <app-base 
      v-if="intent === 'Excited'"
      :shape-zoom="2" 
      :t-config.a="1" 
      :t-config.b="200" 
    />

    <app-base 
      v-if="intent === 'Tense'"
      :shape-zoom="2" 
      :t-config.a="1"  
      :color="0xff0000"
      :wireframe="true"
      :rainbow="false"
      :emissive="true"
    />

    <app-base 
      v-if="intent === 'Content'"
      :shape-zoom="2" 
      :t-config.a="1" 
      :t-config.c="10"  
    />

    <app-base 
      v-if="intent === 'Frustrated'"
      :shape-zoom="3" 
      :t-config.a="1" 
      :t-config.c="3" 
      :wireframe="false" 
      :rainbow="false" 
      :color="0x3964e8" 
    />

    <app-base v-if="intent === 'Calm'" :t-config.a="1"  />
   
    <app-base v-if="intent === 'Tipsy'" :shape-zoom="1" />
    
  </div>
</template>

<script>
import AppVuex from './components/AppVuex.vue'
import AppBase from './components/AppBase.vue'
import AppRecorder from './components/AppRecorder.vue'
import AppEmotionstatus from './components/AppEmotionstatus.vue'

export default {
  components: {
    AppVuex,
    AppBase,
    AppRecorder,
    AppEmotionstatus
  },
  data() {
    return {
      zoomNum: 3
    }
  },
  computed: {
    intent() {
      var str = this.$store.state.intent
      str = str.replace(/\b(App.)\b/gi, '')
      return str
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
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>

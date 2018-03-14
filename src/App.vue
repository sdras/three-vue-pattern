<template>
  <div id="app">

    <app-recorder v-if="intent === 'None'"></app-recorder>
    <app-recordintensity v-if="intent !== 'None'" :emotion="intent" />

    <app-base 
      v-if="intent === 'Excited'"
      :t-config.a="1" 
      :t-config.b="200" 
    />
    <app-base 
      v-if="intent === 'Nervous'"
      :t-config.a="1"  
      :color="0xff0000"
      :wireframe="true"
      :rainbow="false"
      :emissive="true"
    />
    <app-base 
      v-if="intent === 'Happy'" 
      :t-config.a="1" 
      :t-config.c="10"  
    />
    <app-base 
      v-if="intent === 'Frustrated'"
      :t-config.a="1" 
      :t-config.c="3" 
      :wireframe="false" 
      :rainbow="false" 
      :color="0x3964e8" 
    />
    <app-base v-if="intent === 'Calm'" :t-config.a="1"  />
    <app-base v-if="intent === 'Tipsy'" />
    
  </div>
</template>

<script>
import AppBase from './components/AppBase.vue'
import AppRecorder from './components/AppRecorder.vue'
import AppRecordintensity from './components/AppRecordintensity.vue'

export default {
  components: {
    AppBase,
    AppRecorder,
    AppRecordintensity
  },
  computed: {
    intent() {
      return this.$store.getters.intentStr
    },
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

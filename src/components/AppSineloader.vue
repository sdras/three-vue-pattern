<template>
  <div>
    <canvas ref="waves" v-if="!aborted"></canvas>
    <app-abort @change="aborted = $event" :aborted="aborted"/>
  </div>
</template>

<script>
import AppAbort from './AppAbort.vue'
import * as SineWaves from 'sine-waves'

export default {
  components: {
    AppAbort
  },
  data() {
    return {
      aborted: false
    }
  },
  methods: {
    waves() {
      var waves = new SineWaves({
        el: this.$refs.waves,
        speed: 20,
        ease: 'SineInOut',
        wavesWidth: '50%',
        waves: [
          {
            timeModifier: 4,
            lineWidth: 1,
            amplitude: -25,
            wavelength: 25
          },
          {
            timeModifier: 2,
            lineWidth: 1,
            amplitude: -10,
            wavelength: 30
          },
          {
            timeModifier: 1,
            lineWidth: 1,
            amplitude: -30,
            wavelength: 30
          },
          {
            timeModifier: 3,
            lineWidth: 1,
            amplitude: 40,
            wavelength: 40
          },
          {
            timeModifier: 0.5,
            lineWidth: 1,
            amplitude: -60,
            wavelength: 60
          },
          {
            timeModifier: 1.3,
            lineWidth: 1,
            amplitude: -40,
            wavelength: 40
          }
        ],

        // Called on window resize
        resizeEvent: function() {
          var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0)
          gradient.addColorStop(0, 'rgba(25, 255, 255, 0)')
          gradient.addColorStop(0.5, 'rgba(255, 25, 255, 0.75)')
          gradient.addColorStop(1, 'rgba(255, 255, 25, 0')

          var index = -1
          var length = this.waves.length
          while (++index < length) {
            this.waves[index].strokeStyle = gradient
          }

          // Clean Up
          index = void 0
          length = void 0
          gradient = void 0
        }
      })
    }
  },
  mounted() {
    this.waves()
  }
}
</script>

<style lang="scss" scoped>
div {
  background: black;
}

canvas {
  height: 150px;
}
</style>

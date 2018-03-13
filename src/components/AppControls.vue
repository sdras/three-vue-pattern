<template>
  <aside>
    <h2>Pattern Props</h2>
    <label for="range1">Shape Zoom: <span class="num">{{ zoom }}</span></label><br>
    <range-slider
      class="slider"
      id="range1"
      min="0"
      max="5"
      step="1"
      v-model="zoom"
      :value="zoomrange"
      @input="$emit('update:zoomrange', zoom)">
    </range-slider>
    <label for="range1">Range One: <span class="num">{{ value1 }}</span></label><br>
    <range-slider
      class="slider"
      id="range1"
      min="1"
      max="10"
      step=".01"
      v-model="sliderValue">
    </range-slider><br><br>
    <div id="app">
      <span v-for="option in options">
        <input type="checkbox" :id="option.value" :value="option.value" v-model="checkedOpts">
        <label for="option.value"> {{option.value}}</label>
      </span>

      <br>
      <span>Checked names: {{ checkedOpts }}</span>
    </div>
  </aside>
</template>

<script>
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  data() {
    return {
      sliderValue: 5,
      zoom: 3,
      options: [{ value: 'wireframe' }, { value: 'rainbow' }]
    }
  },
  props: {
    zoomrange: {
      type: [Number, String],
      default: 3
    },
    checkedOpts: {
      type: Array,
      default() {
        return ['rainbow']
      }
    }
  },
  methods: {
    changeWire() {
      // this.wireframe = !this.wireframe
      // this.$emit('input', this.wireframe)
    },
    changeRainbow() {
      console.log('fired')
      this.rainbow = !this.rainbow
      this.$emit('input', this.rainbow)
    }
  },
  computed: {
    value1() {
      return this.sliderValue.toFixed(0)
    }
  },
  components: {
    RangeSlider
  }
}
</script>

<style lang="scss" scoped>
aside {
  position: fixed;
  height: 500px;
  top: 130px;
  left: 20px;
  background: black;
  padding: 20px;
  color: white;
}

.num {
  font-weight: 600;
}

label {
  padding: 20px 9px 0;
  display: block;
}

h2 {
  padding: 0 9px 0;
}

.inline {
  display: inline;
}

.slider {
  width: 200px;
  margin: -10px 0 20px;
}
</style>
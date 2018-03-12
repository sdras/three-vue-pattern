<template>
  <aside>
    <h2>Pattern Props</h2>
    <label for="range1">Shape Zoom: <span class="num">{{ zoom }}</span></label><br>
    <range-slider
      class="slider"
      id="range1"
      min="1"
      max="10"
      step="1"
      v-model="zoom">
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
    <label for="rainbow" class="inline">Rainbow:</label>
    <input type="checkbox" id="rainbow" v-model="rainbow"><br><br><br>
    <label for="wireframe" class="inline">Wireframe:</label>
    <input type="checkbox" id="wireframe" v-model="wireframe">
  </aside>
</template>

<script>
import RangeSlider from 'vue-range-slider'
// you probably need to import built-in style
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  data() {
    return {
      sliderValue: 5,
      zoom: 3,
      rainbow: true,
      wireframe: false
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
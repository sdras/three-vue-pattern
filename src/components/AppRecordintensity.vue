<template>
  <div>
    <main>
      <h1 class="emotion">Feeling {{ emotion }}</h1>
      <h3>Change the intensity!</h3>
      <p class="big"><span>Some options... </span><em>more, less, add, subtract</em></p>
      <div><button class="recording" @click="getNewIntent" :class="{ disabled: uiState === 'listening' }"></button></div>
      <app-sineloader v-if="uiState === 'listening'"/>
    </main>

    <app-refresh />
  </div>
</template>

<script>
import AppSineloader from './AppSineloader.vue'
import AppRefresh from './AppRefresh.vue'

export default {
  components: {
    AppSineloader,
    AppRefresh
  },
  props: {
    emotion: {
      default: 'Excited',
      required: true
    }
  },
  computed: {
    uiState() {
      return this.$store.state.uiState
    }
  },
  methods: {
    getNewIntent() {
      this.$store.dispatch('getSpeech')
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  margin-top: 40px;
  padding: 20px 20px 40px;
  text-align: center;
  background: black;
  position: absolute;
  top: 20px;
  left: 50%;
  width: 500px;
  margin-left: -250px;
}

h1 {
  color: rgb(245, 245, 245);
}

p.big {
  font-size: 20px;
  line-height: 1.5;
}

span {
  color: rgb(168, 167, 167);
}

button {
  border-radius: 1000px;
  background: red;
  width: 80px;
  height: 80px;
  border: none;
  outline: 0;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s all ease-out;
}

button.disabled {
  background: #ccc;
  cursor: none;
}
</style>
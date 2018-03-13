<template>
  <main>
    <h1>How do you feel?</h1>
    <p class="big">Some options... calm, tense, excited, nervous, frustrated, content, tipsy</p>
    <p>Hit the button and start recording</p>
    <div><button @click="getNewIntent"></button></div>
    <app-sineloader />
  </main>
</template>

<script>
import AppSineloader from './AppSineloader.vue'

export default {
  components: {
    AppSineloader
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

<style scoped>
main {
  text-align: center;
  margin-top: 10vh;
}

p.big {
  font-size: 20px;
}

button {
  border-radius: 1000px;
  background: red;
  width: 80px;
  height: 80px;
  border: none;
  outline: 0;
  cursor: pointer;
}
</style>
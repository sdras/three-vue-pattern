<template>
  <main>
    <h1>How do you feel?</h1>
    <p class="big"><span>Some options... </span><em>calm, tense, excited, nervous, frustrated, content, tipsy</em></p>
    <p><span>Hit the button and start recording</span></p>
    <div><button @click="getNewIntent" :class="{ disabled: uiState === 'listening' }"></button></div>
    <app-sineloader v-if="uiState === 'listening'"/>
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

h1 {
  color: rgb(245, 245, 245);
}

p.big {
  font-size: 20px;
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
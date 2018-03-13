<template>
  <div>
    <p>The state for counter from the store is {{ counter }}</p>
    <p> uiState: {{ uiState }} | intent: {{ intent}} | score: {{ score }}</p>
    <p>Fetch from API: <button @click="getNewIntent">fetch it</button></p>
  </div>
</template>

<script>
export default {
  computed: {
    counter() {
      return this.$store.state.counter
    },
    triple() {
      return this.$store.getters.tripleCounter
    },
    uiState() {
      return this.$store.state.uiState
    },
    intent() {
      return this.$store.state.intent
    },
    score() {
      return this.$store.state.score
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment', 2)
    },
    asyncInc() {
      this.$store.dispatch('incrementAsync', 10)
    },
    getNewIntent() {
      this.$store.dispatch('getSpeech')
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>
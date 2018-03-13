<template>
  <div>
    <p>uiState: {{ uiState }} | intent: {{ intent }} | score: {{ score }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    // mix the getters into computed with object spread operator
    //...mapGetters(['uiState', 'intent', 'score'])
    uiState() {
      return this.$store.state.uiState
    },
    intent() {
      return this.$store.state.intent
    },
    score() {
      return this.$store.state.score
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>
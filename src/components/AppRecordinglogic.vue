<template>
  <div>
    <app-buttonrecord v-if="intent === 'None' || aborted" />
    <div v-else>
      <app-sineloader />
      <app-abort />
    </div>
  </div>
</template>

<script>
import AppSineloader from './AppSineloader.vue'
import AppButtonrecord from './AppButtonrecord.vue'
import AppAbort from './AppAbort.vue'

export default {
  components: {
    AppAbort,
    AppSineloader,
    AppButtonrecord
  },
  computed: {
    intent() {
      return this.$store.state.intent
    },
    aborted() {
      return this.$store.state.aborted
    },
    uiState() {
      return this.$store.state.uiState
    }
  }
}
</script>

<style scoped>
div {
  background: black;
}
</style>
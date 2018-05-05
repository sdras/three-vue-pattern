<template>
  <div>
    <app-buttonrecord 
      v-if="intent === 'None' || aborted" 
      @isaborted="aborted = $event"
      :aborted="aborted"
    />
    <div 
      v-if="uiState === 'listening' || 
            intent  !== 'None'      && 
            aborted === false"
      >
        <app-sineloader />
        <button @click="aborting">Abort Recording</button>
    </div>
  </div>
</template>

<script>
import AppSineloader from './AppSineloader.vue'
import AppButtonrecord from './AppButtonrecord.vue'

export default {
  components: {
    AppSineloader,
    AppButtonrecord
  },
  data() {
    return {
      aborted: false
    }
  },
  computed: {
    intent() {
      return this.$store.state.intent
    },
    uiState() {
      return this.$store.state.uiState
    }
  },
  methods: {
    aborting() {
      this.$store.commit('abortRecording')
      this.aborted = true
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  background: black;
}

button {
  border: none;
  outline: none;
  padding: 12px 15px 10px;
  background: #333;
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s all ease;
  &:hover {
    background: #444;
  }
}
</style>
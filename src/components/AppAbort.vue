<template>
  <div>
    <button @click="abort">Abort Recording</button>      
  </div>
</template>

<script>
export default {
  props: {
    aborted: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    abort() {
      this.$store.commit('abortRecording')
      this.$emit('change', true)
    }
  }
}
</script>

<style lang="scss" scoped>
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
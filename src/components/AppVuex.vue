<template>
  <div>
    <p>The state for counter from the store is {{ counter }}</p>
    <p>The getter for triple counter from the store is {{ triple }}</p>
    <p>Let's increment by two with a mutation: <button @click="increment">Increment</button></p>
    <p>Let's increment by two with an action async: <button @click="asyncInc">Wait 1s and add 10</button></p>
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
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment', 2)
    },
    asyncInc() {
      this.$store.dispatch('incrementAsync', 10)
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>
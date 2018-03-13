<template>
  <aside>
    <h2 class="emotion">Feeling {{ emotion }}</h2>
    <button @click="goBack">Go back and try again!</button>
  </aside>
</template>

<script>
export default {
  props: {
    emotion: {
      default: 'Excited',
      required: true
    }
  },
  methods: {
    goBack() {
      this.$store.commit('setIntent', 'None')
    }
  }
}
</script>

<style lang="scss" scoped>
aside {
  margin-top: 40px;
  padding: 20px;
  text-align: center;
  background: black;
  position: absolute;
  top: 20px;
  left: 50%;
  width: 300px;
  height: 120px;
  margin-left: -150px;
}

button {
  border: none;
  outline: none;
  padding: 12px 15px 10px;
  background: #555;
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
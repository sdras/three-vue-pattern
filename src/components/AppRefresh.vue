<template>
  <div>
    <button @click="refresh">Start again</button>
  </div>
</template>

<script>
export default {
  methods: {
    refresh() {
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  position: absolute;
  text-align: center;
  bottom: 30px;
  left: 50%;
  margin-left: -50px;
  width: 140px;
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
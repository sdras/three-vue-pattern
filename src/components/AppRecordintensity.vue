<template>
  <div>
    <main>
      <h1 class="emotion">Feeling {{ emotion }}</h1>
      <h3>Change the intensity!</h3>
      <p class="big"><span>Some options... </span><em>more, less</em></p>
      <app-recordinglogic/>
    </main>

    <app-refresh />
  </div>
</template>

<script>
import AppRecordinglogic from './AppRecordinglogic.vue'
import AppRefresh from './AppRefresh.vue'

export default {
  components: {
    AppRecordinglogic,
    AppRefresh
  },
  props: {
    emotion: {
      default: 'Excited',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  margin-top: 40px;
  padding: 20px 20px 40px;
  text-align: center;
  background: black;
  position: absolute;
  top: 20px;
  left: 50%;
  width: 500px;
  margin-left: -250px;
}

h1 {
  color: rgb(245, 245, 245);
}

p.big {
  font-size: 20px;
  line-height: 1.5;
}

span {
  color: rgb(168, 167, 167);
}
</style>
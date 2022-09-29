<template>
  <Cascade />
  <NetCloundMusic />
</template>

<script>
import Cascade from './components/cascade'
import NetCloundMusic from './components/netcloud-music'
export default {
  name: 'App',
  components: {
    Cascade,
    NetCloundMusic
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

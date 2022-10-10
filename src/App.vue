<template>
  <ul id="nav">
    <li>
      <router-link to="/">
        Home
      </router-link>
    </li>
    <li>
      <router-link to="/cascade">
        Cascade
      </router-link>
    </li>
    <li>
      <router-link to="netcloud">
        NetCloud
      </router-link>
    </li>
    <li>
      <router-link to="sheep">
        SheepGame
      </router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
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

#nav {
  list-style: none;
}

#nav > li {
  display: inline-block;
  padding: 0 20px;
}
</style>

<template>
    <div class="wrapper">
        <div class="main">

        </div>
        <ul class="footer">
            <li :key="item.index" v-for="item in items">
                <div :src="item.url" :style="item.style"/>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'sheep'
}
</script>

<script setup>
import { ref, reactive } from 'vue'

const defaultOptions = {
    x: 4,
    y: 4,
    z: 4,
    maxType: 4,
    occupy: 0.2
}


</script>

<style scoped>
.wrapper {
    display: grid;

}
.main {
    padding: 50px;
    padding-bottom: 0;
    position: relative;
}
.item {
    position: absolute;
    width: 50px;
    height: 50px;
}
.footer {
    display: flex;
    flex-direction: row;
    overflow: auto;
    height: 50px;
}
</style>
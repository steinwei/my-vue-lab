<template>
    <div class="wrapper" :style="{columnGap: gutter, columnCount: column}">
        <img :src="item.url" :key="index" v-for="item, index in items" :style="{maxWidth: item.style.maxWidth}"/>
    </div>
</template>

<script>
export default {
    name: 'column'
}
</script>

<script setup>
import { computed, defineProps } from 'vue'
import { data } from '../../utils/mock'

const props = defineProps(['gutter', 'column'])

const items = computed(() => {
    const windowWidth = window.innerWidth
    const { column, gutter } = props
    return data.map(item => ({...item, style: {maxWidth: (windowWidth / column) - gutter * 2 + 'px'}}))
})
</script>

<style scoped>
.wrapper *{
    break-inside: avoid;
}
</style>
<template>
    <div class="wrapper">
        <div class="item" :key="index" v-for="arr, index in items" :style="{gap: props.gutter + 'px'}">
            <img :key="item.url" :src="item.url"  :style="{gap: props.gutter + 'px', maxWidth: item.maxWidth + 'px'}" v-for="item in arr.children" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'flex',
    inheritAttrs: false,
    compilerOptions: {}
}
</script>

<script setup>
import { computed, defineProps } from 'vue'
import { data } from '../../utils/mock';

const props = defineProps(['column', 'gutter'])
const items = computed(() => {
    const arr = Array.from({ length: props.column }, () => ({ children: [] }))
    const windowWidth = window.innerWidth
    data.forEach((item, index) => {
        arr[index % props.column].children.push({...item, maxWidth: Math.ceil(windowWidth / props.column) - props.gutter * 2})
    })
    return arr
});

</script>

<style scoped>
.wrapper{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: stretch;
    flex-wrap: wrap;
}
.item{
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-start;
    align-content: stretch;
}
</style>
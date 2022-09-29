<template>
    <div class="cascade__wrapper">
        <div class="cascade__item" :key="index" v-for="column, index in columns" :style="{gap: props.gutter + 'px'}">
            <img :key="item.url" :src="item.url"  :style="{gap: props.gutter + 'px', maxWidth: item.maxWidth + 'px'}" v-for="item in column.children" />
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
const columns = computed(() => {
    const arr = Array.from({ length: props.column }, () => ({ children: [] }))
    const windowWidth = window.innerWidth
    data.forEach((item, index) => {
        arr[index % props.column].children.push({...item, maxWidth: Math.ceil(windowWidth / props.column) - props.gutter * 2})
    })
    return arr
});

</script>

<style>
.cascade__wrapper{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: stretch;
    flex-wrap: wrap;
}
.cascade__item{
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-start;
    align-content: stretch;
}
</style>
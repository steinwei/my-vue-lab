<template>
    <div class="wrapper" ref="wrapRef">
        <img ref="" :src="item.url" class="item" :key="index" v-for="item, index in columns" :style="{...item.style}" />
    </div>
</template>

<script>
export default {
    name: 'Absolute'
}
</script>

<script setup>
import { data } from '../../utils/mock';
import { defineProps, ref, computed } from 'vue'

const props = defineProps(['gutter', 'column'])
const wrapRef = ref(null)

const columns = computed(() => {
    const { column, gutter } = props
    console.log('ref: ',wrapRef)
    const rect = wrapRef.value?.getBoundingRect()
    const ceilWidth = rect.width
    const ceilHeight = ceilWidth / props.child.width * props.child.height
    const arr = Array.from({ length: data.length }, () => ({
        url: "",
        style: {
            top: 0,
            width: 0,
            height: 0
        }
    }))

    data.forEach((item, index) => {
        const width = ceilWidth / column - 2 * gutter
        const height = width / ceilWidth * ceilHeight
        if (index < column) {
            arr[index] = {
                url: item.src,
                style: {
                    width: width + 'px',
                    left: index * width + 'px',
                    height: height + 'px',
                    top: 0
                }
            }
        } else {
            const { top: prevTop, height: prevHeight } = arr[index - column]
            arr[index] = {
                url: item.src,
                style: {
                    width: width + 'px',
                    left: index * width + 'px',
                    height: height + 'px',
                    top: prevTop + prevHeight + gutter +'px'
                }
            }
        }
    })

    return arr
})

</script>

<style scoped>
.wrapper {
    position: absolute;
    width: 100%;
}
.item {
    position: relative;
}

</style>
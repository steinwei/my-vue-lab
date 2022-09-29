<template>
    <div class="cascade">
        <header>
            <button @click="changeMethod">
                Change another method.
            </button>
        </header>
        <component :is="component" :column="count" :gutter="props.gutter || DEFAULT_GUTTER" />
    </div>
</template>
<script setup>
import { ref, defineProps, onMounted, onUnmounted } from 'vue';
import Absolute from './components/absolute';
import Flex from './components/flex';
import Column from './components/column';
import { DEFAULT_BREAKSPOINT, DEFAULT_GUTTER } from './constants'

const props = defineProps(['breakpoints', 'gutter'])
const count = ref(4)

function handleResize() {
    const { breakpoints = DEFAULT_BREAKSPOINT } = props
    const keys = Object.keys(breakpoints).sort((a, b) => a - b)
    const windowWidth = window.innerWidth
    for (let i = keys.length - 1; i > -1; i--) {
        if (keys[i] < windowWidth) {
            count.value = breakpoints[keys[i]]
            break
        }
    }
}

onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

const scene = {
    Absolute,
    Flex,
    Column
}

const component = ref(scene.Flex)

function changeMethod() {
    return component.value == scene.Absolute ? scene.Column : scene.Absolute;
}
</script>

<style>
.cascade {
    padding: 20px;
}
</style>
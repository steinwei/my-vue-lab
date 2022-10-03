<template>
    <div class="cascade">
        <header class="header">
            <button @click="changeMethod">
                Change another method.
            </button>
        </header>
        <component :is="component.sceneId" :column="count" :gutter="props.gutter || DEFAULT_GUTTER">
            <slot></slot>
        </component>
    </div>
</template>
<script setup>
import { ref, defineProps, onMounted, onUnmounted, reactive } from 'vue';
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

const component = reactive({
    sceneId: scene.Flex
})

function changeMethod() {
    const keys = Object.keys(scene)
    const rand = Math.floor(Math.random() * keys.length)
    if (component.sceneId?.name == scene[keys[rand]]?.name) {
        component.sceneId = scene[keys[(rand+1) % (keys.length - 1)]]
    } else {
        component.sceneId = scene[keys[rand]]
    }
}
</script>

<style scoped>
.cascade {
    padding: 20px;
}
.header {
    padding: 20px;
}
</style>
<template>
    <div>
        {{children}}
    </div>
</template>

<script setup>
import { data } from 'vue';

const children = data.map(item => {
    return (
        <div>
            {item.url}
        </div>
    )
})
</script>
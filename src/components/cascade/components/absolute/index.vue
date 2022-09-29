<template>
    <div class="cascade__wrapper">
        {{children}}
    </div>
</template>

<script setup>
import { data } from '../../utils/mock';

const children = data.map(item => {

    return (
        <div class="cascade__item">
            {item?.url}
        </div>
    )
})

console.log(children);

</script>
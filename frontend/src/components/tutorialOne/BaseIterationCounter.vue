<template>
    <button @click="$emit('onIterationCounter', value + 1)">+1</button>
</template>

<script>
export default {
    props: ['value'],
    name: 'BaseIterationCounter',
}
</script>
<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" persistent>
    <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" color="success" @click="onGoBack">Вернуться в начало</v-btn>
        <div class="py-3">{{message}}</div>
    </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
    name: 'HomeFormBottomSheet',
    props: ['sheet', 'message'],
    methods: {
      onGoBack() {
        this.$emit('onStartStep');
      }
    }
}
</script>

<style></style>

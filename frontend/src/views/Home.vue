<template>
  <div class="container">
    <HomeForm></HomeForm>
  </div>
</template>

<script>
import HomeForm from '../components/HomeForm.vue';

export default {
  name: 'Home',
  components: { HomeForm },
};
</script>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  body {
    background-color: #e5e5e5;
  }
</style>

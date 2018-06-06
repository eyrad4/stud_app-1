<template>
  <v-alert
    :value="true"
    type="success"
    transition="scale-transition"
  >
    <p><strong>{{ title }}</strong> {{ text }}</p>
  </v-alert>
</template>

<script>
export default {
  props: ['title', 'text']
}
</script>

<style scoped>

</style>

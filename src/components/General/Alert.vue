<template>
  <v-alert
    :type="alertType"
    dismissible
    @input="close"
    :value="true"
    transition="scale-transition"
  >
    <p><strong>{{ title }}</strong> {{ text }}</p>
  </v-alert>
</template>

<script>
export default {
  props: {
    alertType: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('dismissed')
    }
  }
}
</script>

<style scoped>

</style>

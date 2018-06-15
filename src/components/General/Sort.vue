<template>
  <v-select
    :items="sortList"
    v-model="userSort"
    @input="sortUser"
    item-value="value"
    item-text="value"
    label="Chouse Sorting"
    single-line
  ></v-select>
</template>

<script>
export default {
  props: {
    currentCategory: [Number, String]
  },
  data: () => ({
    sortList: [
      { value: 'Date ASC' },
      { value: 'Date DESC' },
      { value: 'Price ASC' },
      { value: 'Price DESC' }
    ],
    userSort: ''
  }),
  methods: {
    sortUser () {
      this.$store.dispatch('getAdsList', {sort: this.userSort, currentCategory: this.currentCategory})
    }
  }
}
</script>

<style scoped>

</style>

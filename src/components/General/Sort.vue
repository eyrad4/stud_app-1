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
    currentCategory: [Number, String],
    chouseCities: Array
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
      console.log(this.chouseCities)
      this.$store.dispatch('getAdsList', {sort: this.userSort, currentCategory: this.currentCategory, cities: this.chouseCities})
    }
  }
}
</script>

<style scoped>

</style>

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
    chooseFilters: [Array, Object]
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
      console.log(this.chooseFilters)
      this.$store.dispatch('getAdsList', {sort: this.userSort, currentCategory: this.currentCategory, filters: this.chooseFilters})
    }
  }
}
</script>

<style scoped>

</style>

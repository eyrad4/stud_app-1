<template>
  <div>
    <v-layout>
      <v-flex>
        <div class="title grey--text mb-3">Choose city</div>
        <v-list>
          <v-list-tile
            v-for="city in citiesArray"
            :key="city.id"
          >
            <v-list-tile-content>
              <v-checkbox
                v-model="f_cities"
                :label="city.name"
                :value="city.id"
                @change="filter"
              ></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <div class="title grey--text mb-3">Choose filters</div>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-checkbox
                v-model="f_vip"
                label="Show vip ads"
                value="true"
                @change="filter"
              ></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-checkbox
                v-model="f_my"
                label="Show my ads"
                value="true"
                @change="filter"
              ></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    citiesArray: {
      type: [Array, Object]
    },
    currentCategory: [Number, String]
  },
  data: () => ({
    f_cities: [],
    f_vip: '',
    f_my: '',
    filters: []
  }),
  methods: {
    filter () {
      this.filters = {
        f_cities: this.f_cities,
        f_vip: this.f_vip,
        f_my: this.f_my
      }
      this.$store.dispatch('getAdsList', {currentCategory: this.currentCategory, filters: this.filters})
      this.$emit('filters', this.filters)
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <v-layout v-if="filterType === 'city'">
      <v-flex>
        <div class="title grey--text mb-3">{{ title }}</div>
        <v-list>
          <v-list-tile
            v-for="city in citiesArray"
            :key="city.id"
          >
            <v-list-tile-content>
              <v-checkbox
                v-model="chooseCities"
                :label="city.name"
                :value="city.id"
                @change="filterByCities"
              ></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout v-if="filterType === 'custom'">
      <v-flex>
        <div class="title grey--text mb-3">{{ title }}</div>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-checkbox
                v-model="f_vip"
                label="Show vip ads"
                value="true"
                @change="filterVip"
              ></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-checkbox
                v-model="f_my"
                label="Show my ads"
                value="true"
                @change="filterMy"
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
    filterType: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    citiesArray: {
      type: [Array, Object]
    }
  },
  data: () => ({
    chooseCities: [],
    f_vip: '',
    f_my: ''
  }),
  methods: {
    filterByCities () {
      this.$store.dispatch('getAdsList', {cities: this.chooseCities})
      this.$emit('citiesEvent', this.chooseCities)
    },
    filterVip () {
      if (this.f_vip === 'true') this.$store.dispatch('getAdsList', {vip: this.f_vip})
    },
    filterMy () {
      if (this.f_my === 'true') this.$store.dispatch('getAdsList', {my: this.$store.state.user.id})
    }
  }
}
</script>

<style scoped>

</style>

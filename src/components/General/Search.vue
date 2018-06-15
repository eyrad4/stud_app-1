<template>
  <div class="search-container">
  <v-layout row class="search-input">
    <v-flex xs-12 mb-5>
      <v-text-field
        flat
        solo
        prepend-icon="search"
        label="Search"
        v-model="search"
      ></v-text-field>
    </v-flex>
  </v-layout>
  <v-layout row class="search-results" v-if="showResult">
    <v-flex xs-12 mb-5>
      <v-card>
        <v-card-title primary-title>
          <div class="title teal--text">Search results</div>
          <v-spacer></v-spacer>
          <div>
            <v-btn dark icon @click="close" color="teal">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <template v-for="item in searchResult">
          <v-list :key="item.id">
            <v-list-tile :to="'/products/'+ item.category_id +'/' + item.id">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title >Price {{ item.price }} usd</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </template>
        <template v-if="searchResult.length === 0">
          <v-list>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>No results</v-list-tile-title>
                <v-list-tile-sub-title >Try another keyword</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </template>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    search: '',
    showResult: false
  }),
  computed: {
    ...mapState({
      searchResult: 'searchResult'
    })
  },
  methods: {
    close () {
      this.showResult = false
    }
  },
  watch: {
    search () {
      if (this.search.length >= 3) {
        this.$store.dispatch('search', {search: this.search}).then(() => {
          this.showResult = true
        })
      }
    }
  }
}
</script>

<style scoped>

</style>

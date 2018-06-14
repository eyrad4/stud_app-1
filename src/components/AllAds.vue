<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm12 offset-sm3>
        <v-container>
          <app-search></app-search>
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex  xs12 sm3>
        <v-container mb-5>
          <v-layout>
            <v-flex>
              <v-card>
                <v-card-text>
                  <v-layout>
                    <v-flex>
                      <div class="title grey--text">Categories</div>
                      <v-list>
                        <v-list-tile
                          v-for="category in dataConfig.categories"
                          :key="category.id"
                          :to="'/products/' + category.id"
                        >
                          <v-list-tile-content>
                            <v-list-tile-title >{{ category.name }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
                  <app-filters
                  :citiesArray="Object.values(dataConfig.cities)"
                  @filters="filtersEvent"
                  ></app-filters>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex  xs12 sm9>
        <v-container mb-5>
          <v-layout row>
            <v-flex>
              <v-container>
                <v-layout row>
                  <v-flex xs12 sm10>
                    <div class="display-1 teal--text">All ads</div>
                  </v-flex>
                  <v-flex xs12 sm2 >
                    <app-sort :chooseFilters="chooseFilters"></app-sort>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container>
                <app-adslist :adsList="Object.values(adsList)"></app-adslist>
                <div class="text-xs-center" v-if="hidePagination == true">
                  <v-btn color="teal" dark @click="loadMore">Load more</v-btn>
                </div>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  created () {
    this.$store.dispatch('getAdsList', {})
  },
  data: () => ({
    userSort: '',
    limitNumber: 8,
    chooseFilters: []
  }),
  computed: {
    ...mapState({
      dataConfig: 'dataConfig'
    }),
    adsList () {
      return this.$store.state.adsList.slice(0, this.limitNumber)
    },
    hidePagination () {
      if (this.$store.state.adsList.length > this.limitNumber) {
        return true
      }
    }
  },
  methods: {
    loadMore () {
      this.limitNumber = this.limitNumber + 8
      if (this.$store.state.adsList.length < this.limitNumber) {
        this.hidePagination = true
      }
    },
    filtersEvent ($event) {
      this.chooseFilters = $event
    }
  }
}
</script>

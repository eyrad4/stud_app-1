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
                          @click="filterCategory"
                        >
                          <v-list-tile-content>
                            <v-list-tile-title >{{ category.name }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
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
                    <div class="display-1 teal--text">{{ categoryName.name }}</div>
                  </v-flex>
                  <v-flex xs12 sm2>
                    <app-sort :currentCategory="currentCategory"></app-sort>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container>
                <app-adslist :adsList="Object.values(adsList)"></app-adslist>
                <div class="text-xs-center" v-if="hidePagination === true">
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
    this.$store.dispatch('getAdsList', {currentCategory: this.currentCategory})
  },
  computed: {
    ...mapState({
      dataConfig: 'dataConfig'
    }),
    adsList () {
      return this.$store.getters.adsListLimitShow(this.limitNumber)
    },
    hidePagination () {
      if (this.$store.state.adsList.length > this.limitNumber) {
        return true
      }
    },
    currentCategory () {
      return (this.$route.params.category !== '' || this.$route.params.category !== undefined) ? this.$route.params.category : ''
    },
    categoryName () {
      if (this.$store.state.dataConfig.categories) {
        return this.$store.state.dataConfig.categories.find((category) => {
          return category.id === this.currentCategory
        })
      } else {
        return ''
      }
    }
  },
  methods: {
    filterCategory () {
      this.$store.dispatch('getAdsList', {currentCategory: this.currentCategory})
    },
    loadMore () {
      this.limitNumber = this.limitNumber + 8
      if (this.adsList < this.limitNumber) {
        this.hidePagination = true
      }
    }
  }
}
</script>

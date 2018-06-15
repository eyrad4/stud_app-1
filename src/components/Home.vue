<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm12>
        <v-container>
          <app-search></app-search>
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex  xs12 sm12>
        <v-container>
          <v-layout row>
            <v-flex xs12 sm10>
              <div class="display-1 teal--text">Categories</div>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container mb-5>
          <v-layout row>
            <v-flex xs12 sm6 md3 d-flex pb-4 pr-4
              v-for="category in dataConfig.categories"
              :key="category.id"
            >
              <v-card :to="'/products/' + category.id">
                <v-card-text>
                  <div class="title">{{ category.name }}</div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex  xs12 sm12>
        <v-container>
          <v-layout row>
            <v-flex>
              <v-container>
                <v-layout row>
                  <v-flex xs12 sm10>
                    <div class="display-1 teal--text">Latest vip ad</div>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container>
                <app-adslist :adsList="Object.values(adsList)"></app-adslist>
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
    this.$store.dispatch('getAdsListIndex', {currentCategory: this.currentCategory})
  },
  name: 'Home',
  data: () => ({
  }),
  computed: {
    ...mapState({
      adsList: 'adsList',
      dataConfig: 'dataConfig'
    })
  }
}
</script>

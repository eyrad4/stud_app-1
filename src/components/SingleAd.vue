<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm5 offset-sm3>
        <v-container>
          <v-flex>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ ad.name }}</h3>
                  <router-link :to="'/category/' + ad.category_id" tag="span" class="cursor-pointer">
                    <span class="grey--text">
                      <v-icon>folder</v-icon> {{ categoryName.name }}
                    </span>
                  </router-link>
                </div>
                <v-spacer></v-spacer>
                <div v-if="userIsCreator">
                  <v-btn dark @click.stop="dialog = true" color="error">edit</v-btn>
                </div>
              </v-card-title>
              <v-card-media
                src="https://www.westernaustralia.com/SiteCollectionImages/things%20to%20do/sun%20and%20sea/Sun-Sea-Dirk-Hartog-Island-Beach-740px.jpg"
                height="400px"
              >
              </v-card-media>
              <v-card-text>
                <div class="grey--text">{{ ad.date }}</div>
                <div>
                  {{ ad.text }}
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-container>
      </v-flex>
      <v-flex xs12 sm2>
        <v-container>
          <v-flex>
            <v-card>
              <v-toolbar color="teal lighten-1" dark>
                <v-btn icon>
                  <v-icon>monetization_on</v-icon>
                </v-btn>
                <v-toolbar-title>{{ ad.price }} usd</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-layout  mb-2 mt-2 v-if="!userIsLogged">
                  <v-flex>
                    <div>For more information about ad please <span><v-btn small color="info" to="/login">SignIn</v-btn></span></div>
                  </v-flex>
                </v-layout>
                <template v-if="userIsLogged">
                  <v-layout mb-2 mt-2>
                    <v-flex>
                      <div class="text-md-left">
                        <div class="title"><v-icon large>person</v-icon> Ivanov Ivan</div>
                      </div>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <div class="mb-2">
                        <v-icon lign left>location_on</v-icon> Address
                      </div>
                      <div class="mb-2">
                        <v-icon lign left>email</v-icon> Email
                      </div>
                      <div class="mb-2">
                        <v-icon lign left>phone</v-icon> Phone
                      </div>
                    </v-flex>
                  </v-layout>
                </template>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout row justify-center v-if="userIsCreator">
      <v-dialog v-model="dialog" max-width="500px">
        <v-flex xs12 sm12 v-if="alert">
          <app-alert @dismissed="dismissed" :alertType="alert.alertType" :title="alert.title" :text="alert.text"></app-alert>
        </v-flex>
        <app-create-edit-ad
          :dataConfig="dataConfig"
          :alert="alert"
          :success="success"
          :defaultValue="ad"
        ></app-create-edit-ad>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () {
    this.$store.dispatch('getAd', {id: this.$route.params.id})
  },
  data: () => ({
    dialog: false,
    success: false
  }),
  computed: {
    ...mapState({
      ad: 'ad',
      dataConfig: 'dataConfig',
      alert: 'alert'
    }),
    userIsCreator () {
      if (this.$store.state.user.id === this.ad.user_id) {
        return true
      } else {
        return false
      }
    },
    categoryName () {
      if (this.$store.state.dataConfig.categories) {
        return this.$store.state.dataConfig.categories.find((category) => {
          return category.id === this.ad.category_id
        })
      } else {
        return ''
      }
    },
    userIsLogged () {
      if (this.$store.state.user.token !== '' || this.$store.state.user.token !== undefined) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    dismissed () {
      this.$store.dispatch('clearAlert')
    }
  }
}
</script>

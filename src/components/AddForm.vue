<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Add new ad</h1>
      </v-flex>
    </v-layout>
    <v-layout row v-if="alert">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="dismissed" :alertType="alert.alertType" :title="alert.title" :text="alert.text"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 v-if="!success">
        <app-create-edit-ad
          :dataConfig="dataConfig"
        ></app-create-edit-ad>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    success: false
  }),
  computed: {
    ...mapState({
      dataConfig: 'dataConfig',
      alert: 'alert'
    })
  },
  methods: {
    dismissed () {
      this.$store.dispatch('clearAlert')
    }
  }
}
</script>

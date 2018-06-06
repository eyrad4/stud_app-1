<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Sign in</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form ref="form" @submit.prevent="onSignIn" v-model="valid" lazy-validation>
                <v-text-field
                  label="E-mail"
                  name="email"
                  v-model="email"
                  :rules="[emailRules]"
                  required
                ></v-text-field>
                <v-text-field
                  label="Password"
                  name="password"
                  v-model="password"
                  type="password"
                  :rules="[passwordRules]"
                  required
                ></v-text-field>
                <p><a href="">Forgot password?</a></p>
                <v-btn type="submit" :disabled="!valid">Sign in</v-btn>
                <router-link to="register">
                  <v-btn>Sign up</v-btn>
                </router-link>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: '',
    password: ''
  }),
  computed: {
    emailRules () {
      return v => (v === '') ? 'This field is required' : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    },
    passwordRules () {
      return v => (v === '') ? 'This field is required' : (v.length >= 1 && v.length < 6) ? 'Enter at least 6 symbol' : true
    }
  },
  methods: {}
}
</script>

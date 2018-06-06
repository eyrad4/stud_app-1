<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Sign up</h1>
      </v-flex>
    </v-layout>
    <v-layout row v-if="congratulations">
      <v-flex xs12 sm6 offset-sm3>
        <app-congratulations @dismissed="onDismissed" :title="congratulations.title" :text="congratulations.text"></app-congratulations>
      </v-flex>
    </v-layout>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row v-if="!congratulations">
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form ref="form" @submit.prevent="onSignUp" v-model="valid" lazy-validation>
                <v-text-field
                  label="Name"
                  name="name"
                  id="name"
                  v-model="name"
                  :rules="[requiredRules]"
                  required
                ></v-text-field>
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
                <v-text-field
                  label="Confirm password"
                  name="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  :rules="[comparePasswordRules]"
                ></v-text-field>
                <v-checkbox
                  label="Do you agree?"
                  name="agree"
                  v-model="agree"
                  :rules="[v => !!v || 'You must agree to continue!']"
                ></v-checkbox>
                <v-btn type="submit" :disabled="!valid">Sign up</v-btn>
                <router-link to="login">
                  <v-btn>Sign in</v-btn>
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
  data () {
    return {
      valid: true,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false
    }
  },
  computed: {
    requiredRules () {
      return v => !!v || 'This field is required'
    },
    comparePasswordRules () {
      return v => this.password !== v ? 'Password don\'t match' : true
    },
    emailRules () {
      return v => (v === '') ? 'This field is required' : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    },
    passwordRules () {
      return v => (v === '') ? 'This field is required' : (v.length >= 1 && v.length < 6) ? 'Enter at least 6 symbol' : true
    },
    error () {
      return this.$store.getters.error
    },
    congratulations () {
      return this.$store.getters.congratulations
    }
  },
  methods: {
    onSignUp () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signUp', {name: this.name, email: this.email, password: this.password})
      }
    },
    onDismissed () {
      this.$store.dispatch('clearError', {})
    }
  }
}
</script>

<style scoped>

</style>

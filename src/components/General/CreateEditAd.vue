<template>
  <v-card>
    <v-card-title primary-title  v-if="defaultValue">
      <div>
        <h3 class="headline mb-0">Edit Ad</h3>
      </div>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form ref="form" @submit.prevent="createAd" v-model="valid" lazy-validation>
          <v-text-field
            :rules="[requiredRules]"
            label="Title"
            name="name"
            v-model="name"
            required
          ></v-text-field>
          <v-text-field
            :rules="[requiredRules]"
            label="Full description of your ad"
            name="text"
            v-model="text"
            multi-line
            required
          ></v-text-field>
          <v-text-field
            :rules="[numberRules]"
            label="Price"
            name="price"
            v-model="price"
            required
          ></v-text-field>
          <div class="text-xs-left" v-if="!defaultValue">
            <input style="display:none" ref="photo" type="file" name="photo" @change="selectFile">
            <div>
              <img :src="photoPreviews" alt="" v-if="photoPreviews" width="100">
            </div>
            <v-btn
              color="primary"
              @click.stop="openFileExplorer()"
              :rules="[requiredRules]"
            >Choose file</v-btn>
          </div>
          <v-select
            :items="Object.values(dataConfig.cities)"
            :rules="[requiredRules]"
            v-model="cityId"
            label="Chouse your city"
            item-value="id"
            item-text="name"
            required
            single-line
          ></v-select>
          <v-select
            :items="Object.values(dataConfig.categories)"
            :rules="[requiredRules]"
            v-model="categodyId"
            label="Chose category"
            item-value="id"
            item-text="name"
            required
            single-line
          ></v-select>
          <v-select
            :items="Object.values(dataConfig.adTypes)"
            :rules="[requiredRules]"
            v-model="typeAdId"
            label="Chouse type AD"
            item-value="id"
            item-text="name"
            required
            single-line
          ></v-select>
          <v-btn type="submit" :disabled="!valid">Save</v-btn>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('clearAlert')
    this.$store.dispatch('clearSuccess')
    if (this.defaultValue) {
      this.id = this.defaultValue.id
      this.name = this.defaultValue.name
      this.text = this.defaultValue.text
      this.price = this.defaultValue.price
      this.categodyId = this.defaultValue.category_id
      this.cityId = this.defaultValue.city_id
      this.typeAdId = this.defaultValue.typead_id
    }
  },
  props: {
    dataConfig: {
      type: [Array, Object],
      required: true
    },
    defaultValue: [Array, Object]
  },
  data: () => ({
    valid: true,
    id: '',
    name: '',
    text: '',
    price: '',
    photo: '',
    photoPreviews: null,
    categodyId: '',
    cityId: '',
    typeAdId: ''
  }),
  computed: {
    requiredRules () {
      return v => !!v || 'This field is required'
    },
    numberRules () {
      return v => (v === '') ? 'This field is required' : /^[0-9]*$/.test(v) || 'Please enter only numbers'
    }
  },
  methods: {
    openFileExplorer () {
      this.$refs.photo.click()
    },
    selectFile (e) {
      const file = e.target.files[0]
      this.photoPreviews = URL.createObjectURL(file)
      this.photo = file
    },
    createAd () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('createAd', {
          id: this.id,
          name: this.name,
          text: this.text,
          price: this.price,
          photo: this.photo,
          categoryId: this.categodyId,
          cityId: this.cityId,
          typeAdId: this.typeAdId,
          user_id: this.$store.state.user.id
        })
      }
    },
    dismissed () {
      this.$store.dispatch('clearAlert')
      this.$store.dispatch('clearSuccess')
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md3 d-flex pb-4 pr-4
            v-for="item in adsList"
            :key="item.id"
    >
      <v-card
        :to="'/products/'+ item.category_id +'/' + item.id"
      >
        <v-card-media
          src="https://www.westernaustralia.com/SiteCollectionImages/things%20to%20do/sun%20and%20sea/Sun-Sea-Dirk-Hartog-Island-Beach-740px.jpg"
          height="200px"
        >
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <span class="grey--text">{{ item.date }}</span>
            <h3 class="headline mb-0">{{ item.name }}</h3>
            <div class="subheading teal--text">Price: <strong>{{ item.price }}</strong> usd</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  props: {
    adsList: {
      type: [Array, Object],
      required: true
    }
  }
}
</script>

<template>
  <v-container>
    <div v-if="loading" />

    <div v-else-if="city">
      <h1 class=" white--text display-2 mt-5 mb-10">
        <div style="display:flex;width:300px" >
          <v-list-item width=100 class="white--text"
            :to="{
              name: 'ShowCountry',
              params: { countryId: city.countryCode },
            }"
            >{{ city.country }}/</v-list-item
          >
          {{ city.name }}
        </div>
      </h1>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            Country:
            {{ city.country }}
          </v-list-item-content>
          <v-list-item-content>
            Region:
            {{ city.region }}
          </v-list-item-content>
          <v-list-item-content>
            Elevation Meters:
            {{ city.elevationMeters }}
          </v-list-item-content>
          <v-list-item-content>
            Population:
            {{ city.population }}
          </v-list-item-content>
          <v-list-item-content>
            Timezone:
            {{ city.timezone }}
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <my-map :element="city" />
    </div>

    <div v-else>Not found information about cities</div>
  </v-container>
</template>

<script>
import http from "../plugins/options";
import MyMap from "./MyMap.vue";

export default {
  components: { MyMap },
  data: () => ({
    loading: false,
    city: null,
  }),
  mounted() {
    this.loadCity();
  },
  computed: {
    cityId() {
      return this.$route.params.cityId;
    },
  },
  methods: {
    loadCity() {
      this.loading = true;
      http
        .get(`cities/${this.cityId}`)
        .then((response) => {
          this.city = response.data.data;
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>
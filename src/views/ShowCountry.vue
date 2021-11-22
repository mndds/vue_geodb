<template>
  <v-container>
    <div v-if="loading"></div>

    <div v-else-if="countryDetails">
      <h1 class="mt-5 mb-10 display-2">{{ countryDetails.name }}</h1>

      <v-card class="mx-auto" max-width="344">
        <v-img
          :src="countryDetails.flagImageUri"
          height="200px"
          style="border-bottom: 1px solid gray"
        ></v-img>

        <v-card-title> Number of regions </v-card-title>
        <v-card-subtitle> {{ countryDetails.numRegions }} </v-card-subtitle>
        <v-card-title> Currency Codes </v-card-title>
        <v-card-subtitle
          v-for="(item, index) of countryDetails.currencyCodes"
          :key="index"
        >
          {{ item }}
        </v-card-subtitle>
      </v-card>

      <region-list v-if="!loading" :countryId="countryId" />
    </div>

    <div v-else>Not found</div>
  </v-container>
</template>

<script>
import http from "../plugins/options";
import RegionList from "./RegionList.vue";
export default {
  components: { RegionList },
  data: () => ({
    loading: true,
    countryDetails: null,
  }),
  mounted() {
    this.loadCountryDetails();
  },
  computed: {
    countryId() {
      return this.$route.params.countryId;
    },
  },
  methods: {
    loadCountryDetails() {
      this.loading = true;
      http
        .get(`countries/${this.countryId}`)
        .then((response) => {
          this.countryDetails = response.data.data;
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
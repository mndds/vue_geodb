<template>
  <v-container>
    <div v-if="loading" />

    <div v-else-if="regionDetails">
      <h1 class="display-2 mt-5 mb-10">{{ regionDetails.name }}</h1>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            Country code
            {{ regionDetails.countryCode }}
          </v-list-item-content>
          <v-list-item-content>
            Fips Code
            {{ regionDetails.fipsCode }}
          </v-list-item-content>
          <v-list-item-content>
            ISO Code
            {{ regionDetails.isoCode }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

    <h1 class="mt-5 mb-10 display-2">Cities</h1>
    <div v-if="loading2" />
    <div v-else-if="regionCities && !loading2">
      <v-card>
        <v-list>
          <v-list-item
            :to="{
              name: 'ShowCity',
              params: { cityId: city.id },
            }"
            v-for="(city, index) in regionCities"
            :key="index"
          >
            <v-list-item-content>
              {{ city.city }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <v-pagination
        class="mt-5"
        :total-visible="10"
        v-model="page"
        circle
        :length="Math.ceil(regionCities.metadata.totalCount / 11)"
      />
    </div>

    <div v-else>Not found information about cities</div>
  </v-container>
</template>

<script>
import http from "../plugins/options";
export default {
  props: ["timeout"],
  data: () => ({
    loading: false,
    loading2: true,
    regionDetails: null,
    regionCities: null,
    page: 1,
  }),
  mounted() {
    this.loadRegionDetails();
    setTimeout(this.loadCity, this.timeout || 2000);
  },
  watch: {
    page() {
      this.loadCity();
    },
  },
  computed: {
    countryId() {
      return this.$route.params.countryId;
    },
    regionCode() {
      return this.$route.params.regionCode;
    },
  },
  methods: {
    loadRegionDetails() {
      this.loading = true;
      http
        .get(`countries/${this.countryId}/regions/${this.regionCode}`)
        .then((response) => {
          this.regionDetails = response.data.data;
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadCity() {
      this.loading2 = true;
      http
        .get(
          `countries/${this.countryId}/regions/${
            this.regionCode
          }/cities?offset=${(this.page - 1) * 10}&limit=10`
        )
        .then((response) => {
          this.regionCities = response.data.data;
          this.regionCities.metadata = response.data.metadata;
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(() => {
          this.loading2 = false;
        });
    },
  },
};
</script>

<style>
</style>
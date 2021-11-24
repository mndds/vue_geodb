<template>
  <v-container>
    <h1 class="white--text display-2 mt-5 mb-10">Countries</h1>

    <div v-if="loading" />

    <div v-else-if="countries">
      <div class="mb-5" style="display: flex; align-items: center; gap: 10px">
        <div>
          <v-text-field dark color="white" v-model="filter.name" label="Name"/>
        </div>
        <v-btn color="primary" @click="loadCountries">Filter</v-btn>
      </div>
      <v-card>
        <v-list>
          <v-list-item
            :to="{
              name: 'ShowCountry',
              params: { countryId: country.code },
            }"
            v-for="(country, index) in countries"
            :key="index"
          >
            <v-list-item-content>
              {{ country.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <v-pagination
        class="mt-5"
        :total-visible="10"
        v-model="page"
        circle
        :length="Math.ceil(info.totalCount / 10)"
      />
    </div>

    <div v-else>Not found information</div>
  </v-container>
</template>

<script>
import http from "../plugins/options";
export default {
  data: () => ({
    loading: false,
    countries: null,
    info: null,
    page: 1,
    filter: {
      name: '',         
    },
  }),
  mounted() {
    this.loadCountries();
  },
  watch: {
    page() {
      this.loadCountries();
    },
  },
  methods: {
    loadCountries() {
      this.loading = true;
      http
        .get(`countries`, {
          params: {
            namePrefix: this.filter.name,
            limit: 10,
            offset: (this.page - 1) * 10,
          },
        })
        .then((response) => {
          this.countries = response.data.data;
          this.info = response.data.metadata;
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
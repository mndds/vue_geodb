<template>
  <v-container>
    <h1 class="white--text display-2 mb-10">Cities</h1>

    <div v-if="loading" />

    <div v-else-if="cities">
      <div class="mb-5" style="display: flex; align-items: center; gap: 10px">
        <div>
          <v-text-field dark color="white" v-model="filter.name" label="Name"/>
        </div>
        <v-btn color="primary" @click="loadCities">Filter</v-btn>
      </div>
      <v-card >
        <v-list>
          <v-list-item
            :to="{
              name: 'ShowCity',
              params: { cityId: city.id },
            }"
            v-for="(city, index) in cities"
            :key="index"
          >
            <v-list-item-content>
              {{ city.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <v-pagination
        class="mt-5"
        :total-visible="7"
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
    cities: null,
    info: null,
    page: 1,
    filter: {
      name: '',         
    },
  }),
  mounted() {
    this.loadCities();
  },
  watch: {
    page() {
      this.loadCities();
    },
  },
  methods: {
    loadCities() {
      this.loading = true;
      http
        .get(`cities`, {
          params: {
            namePrefix: this.filter.name,
            limit: 10,
            offset: (this.page - 1) * 10,
          },
        })
        .then((response) => {
          this.cities = response.data.data;
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